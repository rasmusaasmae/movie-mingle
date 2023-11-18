import { searchMovies } from "@/lib/tmdb";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "usehooks-ts";

export default function useSearchMovies(
  query: string,
  page: number = 1,
  debounceMS: number = 0,
) {
  const debouncedQuery = useDebounce(query, debounceMS);
  return useQuery({
    queryKey: ["tmdb-search-movies", { query: debouncedQuery, page }],
    queryFn: () => searchMovies(debouncedQuery, page),
  });
}
