/**
 * Shared helpers for TMDB sync scripts.
 * Imported by tmdb-import.ts and tmdb-sync.ts.
 */

import * as schema from '@/db/schema'
import type { MovieDetails } from '@/lib/tmdb/schemas'
import { Pool } from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'
import { movieDetailsSchema } from '@/lib/tmdb/schemas'
import { sql } from 'drizzle-orm'

// ---------------------------------------------------------------------------
// Database
// ---------------------------------------------------------------------------

const pool = new Pool({
  connectionString: `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
})

export const db = drizzle(pool, { schema, casing: 'snake_case' })

export async function closeDb(): Promise<void> {
  await pool.end()
}

// ---------------------------------------------------------------------------
// TMDB fetch with rate limiting and back-off
// ---------------------------------------------------------------------------

const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3'
const BATCH_SIZE = 35 // stay under the ~40 req/s ceiling

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function tmdbGet(path: string, retries = 6): Promise<unknown | null> {
  const url = `${TMDB_API_BASE_URL}${path}`
  for (let attempt = 0; attempt < retries; attempt++) {
    const res = await fetch(url, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
    })

    if (res.status === 429) {
      const retryAfter = res.headers.get('retry-after')
      const delay = retryAfter ? parseInt(retryAfter, 10) * 1000 : Math.pow(2, attempt) * 1000
      console.warn(`  429 rate-limited — waiting ${delay}ms (attempt ${attempt + 1})`)
      await sleep(delay)
      continue
    }

    if (!res.ok) {
      console.warn(`  TMDB ${res.status} for ${path}`)
      return null
    }

    return res.json()
  }

  console.error(`  Gave up after ${retries} retries for ${path}`)
  return null
}

// ---------------------------------------------------------------------------
// Fetch a single movie's details from TMDB
// ---------------------------------------------------------------------------

export async function fetchMovieDetails(tmdbId: number): Promise<MovieDetails | null> {
  const raw = await tmdbGet(`/movie/${tmdbId}`)
  if (raw === null) return null

  const parsed = movieDetailsSchema.safeParse(raw)
  if (!parsed.success) {
    console.warn(`  Invalid schema for tmdb:${tmdbId} — ${parsed.error.issues[0]?.message}`)
    return null
  }

  return parsed.data
}

// ---------------------------------------------------------------------------
// Upsert a movie into our DB (skips movies without an imdb_id)
// ---------------------------------------------------------------------------

export async function upsertMovieDetails(movie: MovieDetails): Promise<boolean> {
  if (!movie.imdb_id) return false

  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : null
  const collection = movie.belongs_to_collection

  await db
    .insert(schema.movies)
    .values({
      imdbId: movie.imdb_id,
      tmdbId: movie.id,
      title: movie.title,
      originalTitle: movie.original_title,
      year: Number.isNaN(year) ? null : year,
      overview: movie.overview,
      tagline: movie.tagline || null,
      runtime: movie.runtime || null,
      originalLanguage: movie.original_language,
      popularity: movie.popularity,
      adult: movie.adult,
      posterPath: movie.poster_path,
      backdropPath: movie.backdrop_path,
      genreIds: movie.genres.map((g) => g.id),
      belongsToCollectionId: collection?.id ?? null,
      belongsToCollectionName: collection?.name ?? null,
      belongsToCollectionPosterPath: collection?.poster_path ?? null,
      belongsToCollectionBackdropPath: collection?.backdrop_path ?? null,
      tmdbVoteCount: movie.vote_count,
      tmdbVoteMean: movie.vote_average,
    })
    .onConflictDoUpdate({
      target: schema.movies.imdbId,
      set: {
        title: movie.title,
        originalTitle: movie.original_title,
        year: Number.isNaN(year) ? null : year,
        overview: movie.overview,
        tagline: movie.tagline || null,
        runtime: movie.runtime || null,
        originalLanguage: movie.original_language,
        popularity: movie.popularity,
        adult: movie.adult,
        posterPath: movie.poster_path,
        backdropPath: movie.backdrop_path,
        genreIds: movie.genres.map((g) => g.id),
        belongsToCollectionId: collection?.id ?? null,
        belongsToCollectionName: collection?.name ?? null,
        belongsToCollectionPosterPath: collection?.poster_path ?? null,
        belongsToCollectionBackdropPath: collection?.backdrop_path ?? null,
        tmdbVoteCount: movie.vote_count,
        tmdbVoteMean: movie.vote_average,
        updatedAt: sql`now()`,
      },
    })

  return true
}

// ---------------------------------------------------------------------------
// Process a list of TMDB IDs: fetch details + upsert, rate-limited
// ---------------------------------------------------------------------------

export async function processTmdbIds(
  tmdbIds: number[],
  { label, popularityThreshold }: { label: string; popularityThreshold: number },
): Promise<{ processed: number; skipped: number; failed: number }> {
  let processed = 0
  let skipped = 0
  let failed = 0
  const total = tmdbIds.length

  for (let i = 0; i < tmdbIds.length; i += BATCH_SIZE) {
    const batch = tmdbIds.slice(i, i + BATCH_SIZE)
    const batchStart = Date.now()

    await Promise.all(
      batch.map(async (id) => {
        const details = await fetchMovieDetails(id)

        if (!details) {
          failed++
          return
        }

        if (details.adult || details.video) {
          skipped++
          return
        }

        if (details.popularity < popularityThreshold) {
          skipped++
          return
        }

        const saved = await upsertMovieDetails(details)
        if (saved) {
          processed++
        } else {
          skipped++ // no imdb_id
        }
      }),
    )

    const elapsed = Date.now() - batchStart
    if (elapsed < 1000 && i + BATCH_SIZE < tmdbIds.length) {
      await sleep(1000 - elapsed)
    }

    const done = Math.min(i + BATCH_SIZE, total)
    process.stdout.write(
      `\r${label}: ${done}/${total} (${processed} saved, ${skipped} skipped, ${failed} failed)`,
    )
  }

  process.stdout.write('\n')
  return { processed, skipped, failed }
}

// ---------------------------------------------------------------------------
// Fetch all pages of the TMDB changes list for a date range
// ---------------------------------------------------------------------------

const changesSchema = {
  parse: (raw: unknown): { results: { id: number; adult: boolean }[]; total_pages: number } => {
    const r = raw as { results: { id: number; adult: boolean }[]; total_pages: number }
    return r
  },
}

export async function fetchChangedTmdbIds(startDate: string, endDate: string): Promise<number[]> {
  const ids: number[] = []
  let page = 1
  let totalPages = 1

  while (page <= totalPages) {
    const raw = await tmdbGet(
      `/movie/changes?start_date=${startDate}&end_date=${endDate}&page=${page}`,
    )
    if (!raw) break

    const data = changesSchema.parse(raw)
    totalPages = data.total_pages

    for (const entry of data.results) {
      if (!entry.adult) ids.push(entry.id)
    }

    page++
    if (page <= totalPages) await sleep(100)
  }

  return ids
}
