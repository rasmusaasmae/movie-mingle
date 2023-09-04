import { ratingSchema } from "@/schemas/rating";

export default async function setMovieRating(movieId: string, rating: number) {
  const response = await fetch("/api/rating/" + movieId, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rating }),
  });
  if (!response.ok)
    throw new Error(`Failed to set movie: ${response.statusText}`);
  const body = await response.json();
  const newRating = ratingSchema.parse(body);
  return newRating;
}
