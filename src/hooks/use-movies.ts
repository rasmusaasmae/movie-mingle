import { useQuery } from "react-query";
import { useDebounce } from "usehooks-ts";
import getMovies from "@/libs/supabase/get-movies";

export default function useMovies(query: string, debounceMS: number = 500) {
  const debouncedQuery = useDebounce(query, debounceMS);
  return useQuery({
    queryKey: ["supabase-movies", debouncedQuery],
    queryFn: () => getMovies(debouncedQuery),
  });
}
