import { searchMovies } from "@/lib/tmdb";
import { useQuery } from "@tanstack/react-query";

export default function useSearchMovies(query: string, page: number = 1) {
  return useQuery({
    queryKey: ["tmdb-search-movies", { query, page }],
    queryFn: () => searchMovies(query, page),
  });
}
