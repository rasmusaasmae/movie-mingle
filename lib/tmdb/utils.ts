import {
  TMDB_BASE_URL,
  TMDB_IMAGE_BASE_URL,
  TMDB_IMAGE_SIZE_BACKDROP_ORIGINAL,
  TMDB_IMAGE_SIZE_POSTER_MEDIUM,
  TMDB_IMAGE_SIZE_POSTER_ORIGINAL,
  TMDB_IMAGE_SIZE_POSTER_SMALL,
} from './constants'

export const getTmdbMovieUrl = (tmdbId: number) => `${TMDB_BASE_URL}/movie/${tmdbId}`

export const getPosterImageUrl = (
  posterPath: string,
  size: 'small' | 'medium' | 'original' = 'medium',
) => {
  switch (size) {
    case 'small':
      return `${TMDB_IMAGE_BASE_URL}/${TMDB_IMAGE_SIZE_POSTER_SMALL}${posterPath}`
    case 'medium':
      return `${TMDB_IMAGE_BASE_URL}/${TMDB_IMAGE_SIZE_POSTER_MEDIUM}${posterPath}`
    case 'original':
      return `${TMDB_IMAGE_BASE_URL}/${TMDB_IMAGE_SIZE_POSTER_ORIGINAL}${posterPath}`
  }
}

export const getBackdropImageUrl = (backdropPath: string, size: 'original' = 'original') => {
  switch (size) {
    case 'original':
      return `${TMDB_IMAGE_BASE_URL}/${TMDB_IMAGE_SIZE_BACKDROP_ORIGINAL}${backdropPath}`
  }
}

export const getYear = (date: string) => new Date(date).getFullYear()

export const formatRuntime = (runtimeMinutes: number) => {
  const hours = Math.floor(runtimeMinutes / 60)
  const minutes = runtimeMinutes - 60 * hours
  return `${hours}h ${minutes}m`
}
