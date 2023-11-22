import { z } from "zod";

const tmdbMovie = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),
  genre_ids: z.array(z.number()),
  id: z.number(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullable(),
  release_date: z.string(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
  media_type: z.enum(["movie"]).optional(),
});

const recommendations = z.object({
  page: z.number(),
  results: z.array(tmdbMovie),
  total_pages: z.number(),
  total_results: z.number(),
});

export const tmdbMovieDetailsSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),
  belongs_to_collection: z
    .object({
      id: z.number(),
      name: z.string(),
      poster_path: z.string(),
      backdrop_path: z.string(),
    })
    .nullable(),
  budget: z.number(),
  genres: z.array(z.object({ id: z.number(), name: z.string() })),
  homepage: z.string(),
  id: z.number(),
  imdb_id: z.string(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string(),
  production_companies: z.array(
    z.object({
      id: z.number(),
      logo_path: z.string().nullable(),
      name: z.string(),
      origin_country: z.string(),
    }),
  ),
  production_countries: z.array(
    z.object({
      iso_3166_1: z.string(),
      name: z.string(),
    }),
  ),
  release_date: z.string(),
  revenue: z.number(),
  runtime: z.number(),
  spoken_languages: z.array(
    z.object({
      english_name: z.string(),
      iso_639_1: z.string(),
      name: z.string(),
    }),
  ),
  status: z.enum(["Released"]),
  tagline: z.string(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
  recommendations: recommendations.optional(),
});

export const tmdbSearchMovieSchema = z.object({
  page: z.number(),
  results: z.array(tmdbMovie),
  total_pages: z.number(),
  total_results: z.number(),
});

export const tmdbSearchExternalSchema = z.object({
  movie_results: z.array(tmdbMovie),
});

export type TmdbMovie = z.infer<typeof tmdbMovie>;
export type TmdbMovieDetails = z.infer<typeof tmdbMovieDetailsSchema>;
