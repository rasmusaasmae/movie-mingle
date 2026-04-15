#!/usr/bin/env bun
/**
 * Bulk-imports movies from TMDB's daily ID export file.
 *
 * Downloads today's movie_ids_MM_DD_YYYY.json.gz from files.tmdb.org,
 * filters by adult/video flags and a popularity threshold, then
 * batch-fetches full details from the TMDB API and upserts into the DB.
 * Movies without an IMDb ID are skipped.
 *
 * Usage:
 *   bun run tmdb:import
 *   POPULARITY_THRESHOLD=5 bun run tmdb:import
 *
 * Required env vars:
 *   TMDB_API_KEY
 *   DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_PORT, DATABASE_NAME
 *
 * Optional env vars:
 *   POPULARITY_THRESHOLD  Minimum TMDB popularity score (default: 2)
 *   EXPORT_DATE           Date of the export file to use, MM_DD_YYYY format
 *                         (default: yesterday, since today's file may not be ready yet)
 */

import { closeDb, processTmdbIds } from './tmdb-helpers'

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const POPULARITY_THRESHOLD = parseFloat(process.env.POPULARITY_THRESHOLD ?? '2')

function getExportDate(): string {
  const date = process.env.EXPORT_DATE
    ? new Date(process.env.EXPORT_DATE)
    : (() => {
        // Default to yesterday: today's file is published at ~8 AM UTC and
        // may not be available yet depending on when this script runs.
        const d = new Date()
        d.setDate(d.getDate() - 1)
        return d
      })()

  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  const yyyy = date.getFullYear()
  return `${mm}_${dd}_${yyyy}`
}

// ---------------------------------------------------------------------------
// Streaming line-delimited JSON parser from a gzipped HTTP response
// ---------------------------------------------------------------------------

type ExportEntry = {
  id: number
  adult: boolean
  video: boolean
  popularity: number
}

async function* streamExportLines(url: string): AsyncGenerator<ExportEntry> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to download export: ${response.status} ${response.statusText}`)
  }

  const stream = response.body!.pipeThrough(new DecompressionStream('gzip'))
  const reader = stream.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })

    const lines = buffer.split('\n')
    // Keep the last (potentially incomplete) line in the buffer
    buffer = lines.pop() ?? ''

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed) continue
      yield JSON.parse(trimmed) as ExportEntry
    }
  }

  // Flush any remaining content
  buffer += decoder.decode()
  if (buffer.trim()) {
    yield JSON.parse(buffer.trim()) as ExportEntry
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const dateStr = getExportDate()
  const exportUrl = `https://files.tmdb.org/p/exports/movie_ids_${dateStr}.json.gz`

  console.log(`TMDB bulk import`)
  console.log(`  Export date:          ${dateStr}`)
  console.log(`  Popularity threshold: ${POPULARITY_THRESHOLD}`)
  console.log(`  Source:               ${exportUrl}`)
  console.log()

  // Step 1: Download and filter the export
  console.log('Downloading and filtering export...')
  const candidateIds: number[] = []
  let totalLines = 0

  for await (const entry of streamExportLines(exportUrl)) {
    totalLines++
    if (!entry.adult && !entry.video && entry.popularity >= POPULARITY_THRESHOLD) {
      candidateIds.push(entry.id)
    }
    if (totalLines % 100_000 === 0) {
      process.stdout.write(
        `\r  Scanned ${totalLines.toLocaleString()} lines, ${candidateIds.length.toLocaleString()} candidates...`,
      )
    }
  }

  process.stdout.write('\n')
  console.log(
    `  Total entries: ${totalLines.toLocaleString()}, candidates after filter: ${candidateIds.length.toLocaleString()}`,
  )
  console.log()

  if (candidateIds.length === 0) {
    console.log('No candidates to process.')
    return
  }

  // Step 2: Fetch details and upsert
  console.log('Fetching movie details and upserting...')
  const { processed, skipped, failed } = await processTmdbIds(candidateIds, {
    label: 'Import',
    popularityThreshold: POPULARITY_THRESHOLD,
  })

  console.log()
  console.log('Done.')
  console.log(`  Saved:   ${processed.toLocaleString()}`)
  console.log(
    `  Skipped: ${skipped.toLocaleString()} (no IMDb ID, adult, video, or below threshold)`,
  )
  console.log(`  Failed:  ${failed.toLocaleString()}`)
}

main()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(() => closeDb())
