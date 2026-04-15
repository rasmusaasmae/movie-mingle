export const TMDB_BASE_URL = 'https://www.themoviedb.org' as const
export const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3' as const
export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p' as const
export const TMDB_IMAGE_SIZE_POSTER_SMALL = 'w154' as const
export const TMDB_IMAGE_SIZE_POSTER_MEDIUM = 'w342' as const
export const TMDB_IMAGE_SIZE_POSTER_ORIGINAL = 'original' as const
export const TMDB_IMAGE_SIZE_BACKDROP_ORIGINAL = 'original' as const

export const TMDB_GENRE_MAP: Record<number, string> = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
}
