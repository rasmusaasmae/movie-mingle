import { IMDB_BASE_URL } from './constants'

export const getImdbMovieUrl = (imdbId: string) => `${IMDB_BASE_URL}/title/${imdbId}`
