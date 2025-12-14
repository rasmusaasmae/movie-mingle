import {
  tmdbCollectionSchema,
  tmdbMovieDetailsSchema,
  tmdbSearchExternalSchema,
  tmdbSearchMovieSchema,
} from './schemas'
import { TMDB_BASE_URL } from './constants'

export async function fetchMovie(tmdb_id: string | number) {
  const url = `${TMDB_BASE_URL}/movie/${tmdb_id}?append_to_response=recommendations`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    },
  }

  const tmdbMovie = await fetch(url, options)
    .then((response) => {
      if (response.ok) return response.json()
      throw new Error(`Status ${response.status}: ${response.statusText}`)
    })
    .then(tmdbMovieDetailsSchema.parse)

  return tmdbMovie
}

export async function fetchCollection(tmdb_id: string | number) {
  const url = `${TMDB_BASE_URL}/collection/${tmdb_id}`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    },
  }

  const tmdbCollection = await fetch(url, options)
    .then((response) => {
      if (response.ok) return response.json()
      throw new Error(`Status ${response.status}: ${response.statusText}`)
    })
    .then(tmdbCollectionSchema.parse)

  return tmdbCollection
}

export async function searchMovies(query: string, page: number = 1) {
  if (query === '') return { page: 1, results: [], total_pages: 1 }

  const url = `${TMDB_BASE_URL}/search/movie?query=${query}?&page=${page}`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    },
  }

  const searchResults = await fetch(url, options)
    .then((response) => {
      if (response.ok) return response.json()
      throw new Error(`Status ${response.status}: ${response.statusText}`)
    })
    .then(tmdbSearchMovieSchema.parse)

  return searchResults
}

export async function fetchMovieImdb(imdbId: string) {
  const url = `${TMDB_BASE_URL}/find/${imdbId}?external_source=imdb_id`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    },
  }
  const external = await fetch(url, options)
    .then((response) => {
      if (response.ok) return response.json()
      throw new Error(`Status ${response.status}: ${response.statusText}`)
    })
    .then(tmdbSearchExternalSchema.parse)

  if (external.movie_results.length === 0) throw new Error('Movie not found')
  if (external.movie_results.length > 1) throw new Error('Multiple movies found')

  return external.movie_results[0]
}
