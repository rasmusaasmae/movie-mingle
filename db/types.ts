import { movies, ratings, watched } from './schema'

export type Movie = typeof movies.$inferSelect
export type Watched = typeof watched.$inferSelect
export type Rating = typeof ratings.$inferSelect

export type MovieWithMeanRating = Movie & {
  voteMean: number
  voteCount: number
  lastRated: Date
}

export type MovieWithUserRating = Movie & {
  userRating: number
}

export type RatingDistribution = {
  value: number
  count: number
}

export type RatingStats = {
  mean: number | null
  count: number
}
