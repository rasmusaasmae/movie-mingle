import { searchMovies } from '@/utils/tmdb'
import { useQuery } from '@tanstack/react-query'

function useSearchMovies(query: string, page: number = 1) {
  return useQuery({
    queryKey: ['tmdb', 'search-movies', { query, page }],
    queryFn: async () => await searchMovies(query, page),
  })
}

export { useSearchMovies }
