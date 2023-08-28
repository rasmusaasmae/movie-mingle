import z from "zod";

export const ytsGenreSchema = z.enum([
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Film-Noir",
  "Game-Show",
  "History",
  "Horror",
  "Music",
  "Musical",
  "Mystery",
  "News",
  "Reality-TV",
  "Romance",
  "Sci-Fi",
  "Sport",
  "Talk-Show",
  "Thriller",
  "War",
  "Western",
]);

export const ytsMovieSchema = z.object({
  id: z.number(),
  url: z.string(),
  title: z.string(),
  slug: z.string(),
  year: z.number(),
  runtime: z.number(),
  imdb_code: z.string(),
  rating: z.number(),
  genres: z.array(ytsGenreSchema),
  description: z.string().optional(),
  language: z.string(),
  mpa_rating: z.string(),
  small_cover_image: z.string(),
  large_cover_image: z.string(),
});

export const ytsMoviesSchema = z.array(ytsMovieSchema);
