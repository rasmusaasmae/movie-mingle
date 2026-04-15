import 'server-only'
import type { Movie } from '@/lib/tmdb'
import { getPopularMovies } from '@/lib/tmdb'
import { getUserExclusions } from '@/db/queries'

const PAGES_TO_FETCH = 5

export type RecommendationStrategy = (params: {
  userId: string
  batchSize: number
  additionalExcludeTmdbIds?: number[]
}) => Promise<Movie[]>

/**
 * Simple strategy: filter TMDB popular movies by exclusions.
 *
 * Hard exclusions (rated/watched) are never shown.
 * Recent skips are deprioritised — they go to the back of the candidate pool
 * so un-skipped movies appear first, but skipped movies can resurface if
 * the pool runs dry.
 */
const popularMoviesStrategy: RecommendationStrategy = async ({
  userId,
  batchSize,
  additionalExcludeTmdbIds = [],
}) => {
  const exclusions = await getUserExclusions(userId)

  const hardExcluded = new Set([...exclusions.hard, ...additionalExcludeTmdbIds])
  const softExcluded = new Set(exclusions.recentlySkipped)

  const pages = await Promise.all(
    Array.from({ length: PAGES_TO_FETCH }, (_, i) => getPopularMovies(i + 1)),
  )

  const preferred: Movie[] = []
  const deprioritised: Movie[] = []

  for (const page of pages) {
    for (const movie of page.results) {
      if (hardExcluded.has(movie.id)) continue
      if (softExcluded.has(movie.id)) {
        deprioritised.push(movie)
      } else {
        preferred.push(movie)
      }
    }
  }

  // Fill from preferred first, then fall back to deprioritised
  return [...preferred, ...deprioritised].slice(0, batchSize)
}

export const getRecommendations = popularMoviesStrategy
