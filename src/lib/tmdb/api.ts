import {
  Collection,
  Movie,
  MovieDetails,
  SearchMoviesResponse,
  collectionSchema,
  movieDetailsSchema,
  searchMovieExternalResponseSchema,
  searchMoviesResponseSchema,
} from './schemas'
import { TMDB_BASE_URL } from './constants'
import { z } from 'zod'

const tmdbFetch = async <T>(path: string, schema: z.ZodSchema<T>): Promise<T> => {
  const res = await fetch(`${TMDB_BASE_URL}${path}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    },
  })

  if (!res.ok) {
    throw new Error(`TMDB ${res.status}: ${res.statusText}`)
  }

  return schema.parse(await res.json())
}

export const getMovieDetails = async (tmdbId: string | number): Promise<MovieDetails> => {
  return tmdbFetch(`/movie/${tmdbId}?append_to_response=recommendations`, movieDetailsSchema)
}

export const getCollection = async (tmdbId: string | number): Promise<Collection> => {
  return tmdbFetch(`/collection/${tmdbId}`, collectionSchema)
}

export const searchMovies = async (
  query: string,
  page: number = 1,
): Promise<SearchMoviesResponse> => {
  if (query === '') {
    return { page: 1, results: [], total_pages: 1, total_results: 0 }
  }

  return tmdbFetch(`/search/movie?query=${query}&page=${page}`, searchMoviesResponseSchema)
}

export const getMovieByImdbId = async (imdbId: string): Promise<Movie> => {
  const external = await tmdbFetch(
    `/find/${imdbId}?external_source=imdb_id`,
    searchMovieExternalResponseSchema,
  )

  if (external.movie_results.length === 0) {
    throw new Error('Movie not found')
  }

  if (external.movie_results.length > 1) {
    throw new Error('Multiple movies found')
  }

  return external.movie_results[0]
}
