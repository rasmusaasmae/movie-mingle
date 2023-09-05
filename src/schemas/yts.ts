import z from "zod";

const genreSchema = z.enum([
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

const torrentSchema = z.object({
  url: z.string(),
  hash: z.string(),
  quality: z.string(),
  type: z.string(),
  is_repack: z.string(),
  video_codec: z.string(),
  bit_depth: z.string(),
  audio_channels: z.string(),
  seeds: z.number(),
  peers: z.number(),
  size: z.string(),
  size_bytes: z.number(),
  date_uploaded: z.coerce.date(),
  date_uploaded_unix: z.number(),
});

const movieSchema = z.object({
  id: z.number(),
  url: z.string(),
  imdb_code: z.string(),
  title: z.string(),
  title_english: z.string(),
  title_long: z.string(),
  slug: z.string(),
  year: z.number(),
  rating: z.number(),
  runtime: z.number(),
  genres: z.array(genreSchema),
  download_count: z.number().optional(),
  like_count: z.number().optional(),
  description_intro: z.string().optional(),
  description_full: z.string().optional(),
  yt_trailer_code: z.string(),
  language: z.string(),
  mpa_rating: z.string(),
  background_image: z.string(),
  background_image_original: z.string(),
  small_cover_image: z.string(),
  medium_cover_image: z.string(),
  large_cover_image: z.string(),
  torrents: z.array(torrentSchema),
});

export const ytsMovieDetailsSchema = z.object({
  movie: movieSchema,
});

export const ytsMovieListSchema = z.object({
  movie_count: z.number(),
  limit: z.number(),
  page_number: z.number(),
  movies: z.array(movieSchema).optional(),
});

export type MovieYTS = z.infer<typeof movieSchema>;
