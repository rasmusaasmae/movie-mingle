import { useQuery } from "react-query";
import { useDebounce } from "usehooks-ts";
import fetchYTS from "@/utils/fetchYTS";

export default function useYTS(query: string, debounceMS: number = 0) {
  const debouncedQuery = useDebounce(query, debounceMS);
  return useQuery({
    queryKey: ["yts", debouncedQuery],
    queryFn: () => fetchYTS(debouncedQuery),
  });
}
