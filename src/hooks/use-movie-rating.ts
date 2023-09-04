import { useQuery } from "react-query";
import getMovieRating from "@/utils/rating/get-movie-rating";

export default function useMovieRating(movieId: string) {
  return useQuery({
    queryKey: ["movie-rating", movieId],
    queryFn: () => getMovieRating(movieId),
  });
}
