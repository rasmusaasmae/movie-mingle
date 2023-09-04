import { YTS_BASE_URL } from "@/constants/yts";
import { ytsMovieDetailsSchema } from "@/schemas/yts";

export default async function getMovieDetailsYTS(movieId: string) {
  const response = await fetch(
    YTS_BASE_URL + `/movie_details.json?movie_id=${movieId}`,
  );
  if (!response.ok)
    throw new Error(
      `Failed to get movie details from YTS: ${response.statusText}`,
    );
  const body = await response.json();
  const movie = ytsMovieDetailsSchema.parse(body.data);
  return movie.movie;
}
