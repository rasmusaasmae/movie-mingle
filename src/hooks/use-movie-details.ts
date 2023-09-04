import { useQuery } from "react-query";
import getMovieDetailsYTS from "@/utils/yts/get-movie-details";

export default function useMovieDetails(movieId: string) {
  return useQuery({
    queryKey: ["movie-details", movieId],
    queryFn: () => getMovieDetailsYTS(movieId),
  });
}
