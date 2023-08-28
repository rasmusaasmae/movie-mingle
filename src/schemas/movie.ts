import z from "zod";

export const genreSchema = z.enum([
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
  "FilmNoir",
  "GameShow",
  "History",
  "Horror",
  "Music",
  "Musical",
  "Mystery",
  "News",
  "RealityTV",
  "Romance",
  "SciFi",
  "Sport",
  "TalkShow",
  "Thriller",
  "War",
  "Western",
]);

export const movieSchema = z.object({
  id: z.string(),
  url: z.string(),
  title: z.string(),
  slug: z.string(),
  year: z.number(),
  runtime: z.number(),
  imdbCode: z.string(),
  imdbRating: z.number(),
  genres: z.array(genreSchema),
  description: z.string().optional(),
  language: z.string(),
  mpaRating: z.string(),
  smallCoverImage: z.string(),
  largeCoverImage: z.string(),
  avgRating: z.number().optional(),
  userRating: z
    .object({
      rating: z.number(),
      updatedAt: z.date(),
    })
    .optional(),
});

export const moviesSchema = z.array(movieSchema);

export type Movie = z.infer<typeof movieSchema>;
export type Movies = z.infer<typeof moviesSchema>;
