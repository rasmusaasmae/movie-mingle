#!/usr/bin/env bun
/**
 * Incremental daily sync from TMDB's changes API.
 *
 * Fetches all movie IDs that changed in a given date window, then
 * batch-fetches full details and upserts into the DB.
 * Movies without an IMDb ID or below the popularity threshold are skipped.
 *
 * Usage:
 *   bun run tmdb:sync
 *   POPULARITY_THRESHOLD=5 bun run tmdb:sync
 *
 * Required env vars:
 *   TMDB_API_KEY
 *   DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_PORT, DATABASE_NAME
 *
 * Optional env vars:
 *   POPULARITY_THRESHOLD  Minimum TMDB popularity score (default: 2)
 *   SYNC_START_DATE       ISO date string for the start of the change window
 *                         (default: yesterday)
 *   SYNC_END_DATE         ISO date string for the end of the change window
 *                         (default: today)
 */

import { closeDb, fetchChangedTmdbIds, processTmdbIds } from './tmdb-helpers'

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const POPULARITY_THRESHOLD = parseFloat(process.env.POPULARITY_THRESHOLD ?? '2')

function isoDate(d: Date): string {
  return d.toISOString().split('T')[0]
}

function getDateRange(): { startDate: string; endDate: string } {
  if (process.env.SYNC_START_DATE && process.env.SYNC_END_DATE) {
    return {
      startDate: process.env.SYNC_START_DATE,
      endDate: process.env.SYNC_END_DATE,
    }
  }

  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)

  return {
    startDate: isoDate(yesterday),
    endDate: isoDate(today),
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const { startDate, endDate } = getDateRange()

  console.log('TMDB incremental sync')
  console.log(`  Date range:           ${startDate} → ${endDate}`)
  console.log(`  Popularity threshold: ${POPULARITY_THRESHOLD}`)
  console.log()

  // Step 1: Collect changed IDs from the changes API
  console.log('Fetching changed movie IDs...')
  const changedIds = await fetchChangedTmdbIds(startDate, endDate)
  console.log(`  Found ${changedIds.length.toLocaleString()} changed movie IDs`)
  console.log()

  if (changedIds.length === 0) {
    console.log('Nothing to sync.')
    return
  }

  // Step 2: Fetch details and upsert
  console.log('Fetching movie details and upserting...')
  const { processed, skipped, failed } = await processTmdbIds(changedIds, {
    label: 'Sync',
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
