import { useQuery } from "react-query";
import getMovieMeanRating from "@/utils/rating/get-movie-mean-rating";

export default function useMovieMeanRating(movieId: string) {
  return useQuery({
    queryKey: ["movie-mean-rating", movieId],
    queryFn: () => getMovieMeanRating(movieId),
  });
}
