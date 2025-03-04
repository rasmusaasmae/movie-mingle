import { useQuery } from "@tanstack/react-query";

import { searchMovies } from "@/utils/tmdb";

export default function useSearchMovies(query: string, page: number = 1) {
  return useQuery({
    queryKey: ["tmdb", "search-movies", { query, page }],
    queryFn: async () => await searchMovies(query, page),
  });
}
