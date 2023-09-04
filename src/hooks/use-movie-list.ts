import { useQuery } from "react-query";
import { useDebounce } from "usehooks-ts";
import getMovieListYTS from "@/utils/yts/get-movie-list";

export default function useMovieList(query: string, debounceMS: number = 500) {
  const debouncedQuery = useDebounce(query, debounceMS);
  return useQuery({
    queryKey: ["movie-list", debouncedQuery],
    queryFn: () => getMovieListYTS(debouncedQuery),
  });
}
