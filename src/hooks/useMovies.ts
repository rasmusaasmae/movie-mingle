import { useQuery } from "react-query";
import fetchMovies from "@/utils/fetchMovies";

export default function useMovies() {
  return useQuery({
    queryKey: ["movies"],
    queryFn: () => fetchMovies(),
  });
}
