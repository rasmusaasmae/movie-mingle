import { ratingSchema } from "@/schemas/rating";

export default async function getMovieRating(movieId: string) {
  const response = await fetch("/api/rating/" + movieId);
  if (!response.ok)
    throw new Error(`Failed to get rating: ${response.statusText}`);
  const body = await response.json();
  const rating = ratingSchema.parse(body);
  return rating;
}
