import { searchMovies } from "@/lib/supabase/movies/client";
import { useQuery } from "react-query";
import { useDebounce } from "usehooks-ts";

export default function useSearchMovies(
  query: string,
  debounceMS: number = 200,
) {
  const debouncedQuery = useDebounce(query, debounceMS);
  return useQuery({
    queryKey: ["movies", "search", debouncedQuery],
    queryFn: () => searchMovies(debouncedQuery),
  });
}
