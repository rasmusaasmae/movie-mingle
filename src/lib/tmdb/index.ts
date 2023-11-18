import { TMDB_BASE_URL, TMDB_IMAGE_BASE_URL } from "./constants";
import { tmdbMovieDetailsSchema, tmdbSearchMovieSchema } from "./schemas";

export async function fetchMovie(tmdb_id: string | number) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    },
  };
  const tmdbMovie = await fetch(
    `${TMDB_BASE_URL}/movie/${tmdb_id}?append_to_response=recommendations`,
    options,
  )
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error(`Status ${response.status}: ${response.statusText}`);
    })
    .then(tmdbMovieDetailsSchema.parse);
  return tmdbMovie;
}

export async function searchMovies(query: string, page: number = 1) {
  if (query === "") return { page: 1, results: [], total_pages: 1 };
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    },
  };
  const searchResult = await fetch(
    `${TMDB_BASE_URL}/search/movie?query=${query}?&page=${page}`,
    options,
  )
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error(`Status ${response.status}: ${response.statusText}`);
    })
    .then(tmdbSearchMovieSchema.parse);
  return searchResult;
}
