import 'server-only'
import { and, avg, count, desc, eq, sql } from 'drizzle-orm'
import { movies, ratings, skips, watched } from './schema'
import { Movie } from '../lib/tmdb'
import { db } from '.'
import { union } from 'drizzle-orm/pg-core'

/* MOVIES */

export const upsertMovie = async (imdbId: string, movie: Movie) => {
  const year = new Date(movie.release_date).getFullYear()

  await db
    .insert(movies)
    .values({
      imdbId,
      tmdbId: movie.id,
      title: movie.title,
      year,
      overview: movie.overview,
      posterPath: movie.poster_path,
      backdropPath: movie.backdrop_path,
      genreIds: movie.genre_ids,
      tmdbVoteCount: movie.vote_count,
      tmdbVoteMean: movie.vote_average,
    })
    .onConflictDoUpdate({
      target: movies.imdbId,
      set: {
        title: movie.title,
        tmdbVoteCount: movie.vote_count,
        tmdbVoteMean: movie.vote_average,
      },
    })
}

export const getRecentMovies = async () => {
  const result = await db
    .select({
      movie: movies,
      voteCount: count(ratings.value),
      voteMean: avg(ratings.value).mapWith(Number),
      lastRated: sql<Date>`max(${ratings.updatedAt})`.as('last_rated'),
    })
    .from(movies)
    .innerJoin(ratings, eq(movies.imdbId, ratings.imdbId))
    .groupBy(movies.imdbId)
    .orderBy(desc(sql`max(${ratings.updatedAt})`))

  return result.map((r) => ({
    ...r.movie,
    voteCount: r.voteCount,
    voteMean: r.voteMean,
    lastRated: r.lastRated,
  }))
}

export const getTopMovies = async () => {
  const result = await db
    .select({
      movie: movies,
      voteMean: avg(ratings.value).mapWith(Number),
      voteCount: count(ratings.value),
      lastRated: sql<Date>`max(${ratings.updatedAt})`.as('last_rated'),
    })
    .from(movies)
    .innerJoin(ratings, eq(movies.imdbId, ratings.imdbId))
    .groupBy(movies.imdbId)
    .orderBy(desc(avg(ratings.value)))

  return result.map((r) => ({
    ...r.movie,
    voteMean: r.voteMean,
    voteCount: r.voteCount,
    lastRated: r.lastRated,
  }))
}

export const getUserRatedMovies = async (userId: string) => {
  const ratingStats = db
    .select({
      imdbId: ratings.imdbId,
      voteMean: avg(ratings.value).mapWith(Number).as('vote_mean'),
      voteCount: count(ratings.value).as('vote_count'),
    })
    .from(ratings)
    .groupBy(ratings.imdbId)
    .as('rating_stats')

  const result = await db
    .select({
      movie: movies,
      rating: ratings.value,
      updatedAt: ratings.updatedAt,
      voteMean: ratingStats.voteMean,
      voteCount: ratingStats.voteCount,
    })
    .from(ratings)
    .innerJoin(movies, eq(ratings.imdbId, movies.imdbId))
    .innerJoin(ratingStats, eq(ratings.imdbId, ratingStats.imdbId))
    .where(eq(ratings.userId, userId))
    .orderBy(desc(ratings.value), desc(ratings.updatedAt))

  return result.map((r) => ({
    ...r.movie,
    userRating: r.rating,
    ratedAt: r.updatedAt,
    voteMean: r.voteMean,
    voteCount: r.voteCount,
  }))
}

/* RATINGS */

export const getRating = async (userId: string, imdbId: string) => {
  return db.query.ratings.findFirst({
    where: and(eq(ratings.userId, userId), eq(ratings.imdbId, imdbId)),
  })
}

export const setRating = async (userId: string, imdbId: string, value: number) => {
  const [result] = await db
    .insert(ratings)
    .values({
      userId,
      imdbId,
      value,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: [ratings.userId, ratings.imdbId],
      set: {
        value,
        updatedAt: new Date(),
      },
    })
    .returning()
  return result
}

export const deleteRating = async (userId: string, imdbId: string) => {
  return db.delete(ratings).where(and(eq(ratings.userId, userId), eq(ratings.imdbId, imdbId)))
}

export const getMeanRating = async (imdbId: string) => {
  const [result] = await db
    .select({
      mean: avg(ratings.value).mapWith(Number),
      count: count(ratings.value),
    })
    .from(ratings)
    .where(eq(ratings.imdbId, imdbId))

  return {
    mean: Number.isNaN(result.mean) ? null : result.mean,
    count: result.count,
  }
}

export const getRatingDistribution = async (userId: string) => {
  const result = await db
    .select({
      value: ratings.value,
      totalCount: count(),
      userCount:
        sql<number>`sum(case when ${ratings.userId} = ${userId} then 1 else 0 end)`.mapWith(Number),
    })
    .from(ratings)
    .groupBy(ratings.value)
    .orderBy(ratings.value)

  return result.map((r) => ({
    otherCount: r.totalCount - r.userCount,
    ...r,
  }))
}

export const getMovieRatingDistribution = async (imdbId: string) => {
  return db
    .select({
      value: ratings.value,
      count: count(),
    })
    .from(ratings)
    .where(eq(ratings.imdbId, imdbId))
    .groupBy(ratings.value)
    .orderBy(ratings.value)
}

/* WATCHED */

export const getWatched = async (userId: string, imdbId: string) => {
  return db.query.watched.findFirst({
    where: and(eq(watched.userId, userId), eq(watched.imdbId, imdbId)),
  })
}

export const setWatched = async (userId: string, imdbId: string, date: string) => {
  const dateString = date

  const [result] = await db
    .insert(watched)
    .values({
      userId,
      imdbId,
      date: dateString,
    })
    .onConflictDoUpdate({
      target: [watched.userId, watched.imdbId],
      set: { date: dateString },
    })
    .returning()
  return result
}

export const deleteWatched = async (userId: string, imdbId: string) => {
  return db.delete(watched).where(and(eq(watched.userId, userId), eq(watched.imdbId, imdbId)))
}

/* SKIPS */

export const getSkip = async (userId: string, imdbId: string) => {
  return db.query.skips.findFirst({
    where: and(eq(skips.userId, userId), eq(skips.imdbId, imdbId)),
  })
}

export const addSkip = async (userId: string, imdbId: string) => {
  const [result] = await db
    .insert(skips)
    .values({ userId, imdbId })
    .onConflictDoNothing()
    .returning()
  return result
}

export const deleteSkip = async (userId: string, imdbId: string) => {
  return db.delete(skips).where(and(eq(skips.userId, userId), eq(skips.imdbId, imdbId)))
}

/* DISCOVER */

export type UserExclusions = {
  /** tmdbIds of movies the user has rated or watched — never show again */
  hard: number[]
  /** tmdbIds of movies the user has skipped recently — suppress for now */
  recentlySkipped: number[]
}

export const getUserExclusions = async (
  userId: string,
  skipCooldownDays: number = 30,
): Promise<UserExclusions> => {
  const ratedImdbIds = db
    .select({ imdbId: ratings.imdbId })
    .from(ratings)
    .where(eq(ratings.userId, userId))

  const watchedImdbIds = db
    .select({ imdbId: watched.imdbId })
    .from(watched)
    .where(eq(watched.userId, userId))

  const hardExcludedImdbIds = union(ratedImdbIds, watchedImdbIds).as('hard_excluded_imdb_ids')

  const hardResult = await db
    .select({ tmdbId: movies.tmdbId })
    .from(movies)
    .innerJoin(hardExcludedImdbIds, eq(movies.imdbId, hardExcludedImdbIds.imdbId))

  const cooldownCutoff = new Date()
  cooldownCutoff.setDate(cooldownCutoff.getDate() - skipCooldownDays)

  const recentSkipsResult = await db
    .select({ tmdbId: movies.tmdbId })
    .from(skips)
    .innerJoin(movies, eq(skips.imdbId, movies.imdbId))
    .where(and(eq(skips.userId, userId), sql`${skips.createdAt} > ${cooldownCutoff.toISOString()}`))

  return {
    hard: hardResult.map((r) => r.tmdbId),
    recentlySkipped: recentSkipsResult.map((r) => r.tmdbId),
  }
}
