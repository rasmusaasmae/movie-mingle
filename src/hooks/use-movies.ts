import { type Order, getMovies } from "@/lib/supabase/movies/client";
import { useQuery } from "react-query";
import { useDebounce } from "usehooks-ts";

export default function useMovies(
  query: string = "",
  debounceMS: number = 500,
  page: number = 1,
  sortBy: Order = "average_rating",
  direction: "asc" | "desc" = "desc",
) {
  const debouncedQuery = useDebounce(query, debounceMS);
  return useQuery({
    queryKey: [
      "movies",
      "table",
      { query: debouncedQuery, page, sortBy, direction },
    ],
    queryFn: () => getMovies(page, debouncedQuery, sortBy, direction === "asc"),
  });
}
