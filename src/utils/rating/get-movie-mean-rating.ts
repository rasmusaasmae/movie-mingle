import { meanRatingSchema } from "@/schemas/rating";

export default async function getMovieMeanRating(movieId: string) {
  const response = await fetch("/api/mean-rating/" + movieId);
  if (!response.ok)
    throw new Error(`Failed to fetch mean rating: ${response.statusText}`);
  const body = await response.json();
  const rating = meanRatingSchema.parse(body);
  return rating;
}
