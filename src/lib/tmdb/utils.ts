import {
  TMDB_IMAGE_BASE_URL,
  TMDB_IMAGE_SIZE_BACKDROP_ORIGINAL,
  TMDB_IMAGE_SIZE_POSTER_MEDIUM,
} from './constants'

export const getMovieUrl = (tmdbId: number) => `https://www.themoviedb.org/movie/${tmdbId}`

export const getPosterImageUrl = (posterPath: string) =>
  `${TMDB_IMAGE_BASE_URL}/${TMDB_IMAGE_SIZE_POSTER_MEDIUM}${posterPath}`

export const getBackdropImageUrl = (backdropPath: string) =>
  `${TMDB_IMAGE_BASE_URL}/${TMDB_IMAGE_SIZE_BACKDROP_ORIGINAL}${backdropPath}`

export const getYear = (date: string) => new Date(date).getFullYear()

export const parseRuntime = (runtime: number) => {
  const hours = Math.floor(runtime / 60)
  const minutes = runtime - 60 * hours
  return { hours, minutes }
}
