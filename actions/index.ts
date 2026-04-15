'use server'

import * as db from '@/db/queries'
import type { MovieWithMeanRating, MovieWithUserRating, Rating, Skip, Watched } from '@/db/types'
import { getMovieByImdbId, getMovieDetails } from '@/lib/tmdb'
import type { MovieDetails } from '@/lib/tmdb'
import { auth } from '@/lib/auth'
import { getRecommendations } from '@/lib/recommender'
import { headers } from 'next/headers'
import { sum } from 'radash'
import { z } from 'zod'

const MovieDto = z.object({
  imdbId: z.string().regex(/^tt\d{7,}$/),
})

const RatingDto = MovieDto.extend({
  rating: z.number().min(0).max(10).multipleOf(0.5),
})

const WatchedDto = MovieDto.extend({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
})

/* AUTH */

const getUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (!session) {
    throw new Error('Unauthorized')
  }
  return session.user
}

/* MOVIES */

const ensureMovie = async (dto: z.input<typeof MovieDto>): Promise<void> => {
  await getUser()
  const { imdbId } = MovieDto.parse(dto)
  const movie = await getMovieByImdbId(imdbId)
  return db.upsertMovie(imdbId, movie)
}

export const getRecentMovies = async (): Promise<MovieWithMeanRating[]> => {
  return db.getRecentMovies()
}

export const getTopMovies = async (): Promise<MovieWithMeanRating[]> => {
  return db.getTopMovies()
}

/* RATINGS */

export const getRating = async (dto: z.input<typeof MovieDto>): Promise<Rating | null> => {
  const { id: userId } = await getUser()
  const { imdbId } = MovieDto.parse(dto)
  const rating = await db.getRating(userId, imdbId)
  return rating ?? null
}

export const setRating = async (dto: z.input<typeof RatingDto>): Promise<Rating> => {
  const { id: userId } = await getUser()
  const { imdbId, rating } = RatingDto.parse(dto)
  await ensureMovie({ imdbId })
  return db.setRating(userId, imdbId, rating)
}

export const deleteRating = async (dto: z.input<typeof MovieDto>): Promise<void> => {
  const { id: userId } = await getUser()
  const { imdbId } = MovieDto.parse(dto)
  await db.deleteRating(userId, imdbId)
}

export const getMeanRating = async (
  dto: z.input<typeof MovieDto>,
): Promise<{
  mean: number | null
  count: number
}> => {
  const { imdbId } = MovieDto.parse(dto)
  return db.getMeanRating(imdbId)
}

export const getUserRatings = async (): Promise<MovieWithUserRating[]> => {
  const { id: userId } = await getUser()
  return db.getUserRatedMovies(userId)
}

export const getRatingStats = async () => {
  const { id: userId } = await getUser()
  const distribution = await db.getRatingDistribution(userId)

  const totalCount = sum(distribution, (d) => d.totalCount)
  const userCount = sum(distribution, (d) => d.userCount)
  const otherCount = sum(distribution, (d) => d.otherCount)

  const totalMean =
    totalCount > 0 ? sum(distribution, (d) => d.value * d.totalCount) / totalCount : null
  const userMean =
    userCount > 0 ? sum(distribution, (d) => d.value * d.userCount) / userCount : null
  const otherMean =
    otherCount > 0 ? sum(distribution, (d) => d.value * d.otherCount) / otherCount : null

  const distributionWithPercentages = distribution.map((d) => ({
    ...d,
    totalPercentage: totalCount > 0 ? (d.totalCount / totalCount) * 100 : 0,
    userPercentage: userCount > 0 ? (d.userCount / userCount) * 100 : 0,
    otherPercentage: otherCount > 0 ? (d.otherCount / otherCount) * 100 : 0,
  }))

  return {
    distribution: distributionWithPercentages,
    stats: {
      total: { mean: totalMean, count: totalCount },
      user: { mean: userMean, count: userCount },
      other: { mean: otherMean, count: otherCount },
    },
  }
}

/* WATCHED */

export const getWatched = async (dto: z.input<typeof MovieDto>): Promise<Watched | null> => {
  const { id: userId } = await getUser()
  const { imdbId } = MovieDto.parse(dto)
  const watched = await db.getWatched(userId, imdbId)
  return watched ?? null
}

export const setWatched = async (dto: z.input<typeof WatchedDto>): Promise<Watched> => {
  const { id: userId } = await getUser()
  const { imdbId, date } = WatchedDto.parse(dto)
  await ensureMovie({ imdbId })
  return db.setWatched(userId, imdbId, date)
}

export const deleteWatched = async (dto: z.input<typeof MovieDto>): Promise<void> => {
  const { id: userId } = await getUser()
  const { imdbId } = MovieDto.parse(dto)
  await db.deleteWatched(userId, imdbId)
}

/* SKIPS */

export const getSkip = async (dto: z.input<typeof MovieDto>): Promise<Skip | null> => {
  const { id: userId } = await getUser()
  const { imdbId } = MovieDto.parse(dto)
  const skip = await db.getSkip(userId, imdbId)
  return skip ?? null
}

export const skipMovie = async (dto: z.input<typeof MovieDto>): Promise<void> => {
  const { id: userId } = await getUser()
  const { imdbId } = MovieDto.parse(dto)
  await ensureMovie({ imdbId })
  await db.addSkip(userId, imdbId)
}

export const undoSkip = async (dto: z.input<typeof MovieDto>): Promise<void> => {
  const { id: userId } = await getUser()
  const { imdbId } = MovieDto.parse(dto)
  await db.deleteSkip(userId, imdbId)
}

/* DISCOVER */

const DiscoverBatchDto = z.object({
  excludeTmdbIds: z.array(z.number()).optional(),
  batchSize: z.number().min(1).max(20).optional(),
})

export const getDiscoverBatch = async (
  dto: z.input<typeof DiscoverBatchDto> = {},
): Promise<MovieDetails[]> => {
  const { id: userId } = await getUser()
  const { excludeTmdbIds = [], batchSize = 10 } = DiscoverBatchDto.parse(dto)

  const candidates = await getRecommendations({
    userId,
    batchSize,
    additionalExcludeTmdbIds: excludeTmdbIds,
  })

  const details = await Promise.all(candidates.map((m) => getMovieDetails(m.id)))

  const withImdbId = details.filter((d) => d.imdb_id !== null)

  await Promise.all(
    withImdbId.map((d) =>
      db.upsertMovie(d.imdb_id as string, {
        ...d,
        genre_ids: d.genres.map((g) => g.id),
      }),
    ),
  )

  return withImdbId
}
