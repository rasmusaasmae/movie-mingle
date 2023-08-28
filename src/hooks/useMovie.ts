import fetchMovie from "@/utils/fetchMovie";
import { useQuery } from "react-query";

export default function useMovie(id: string) {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: () => fetchMovie(id),
  });
}
