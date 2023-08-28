import { movieSchema } from "@/schemas/movie";

export default async function fetchMovie(id: string) {
  const response = await fetch(`/api/movie/${id}`);
  const body = await response.json();
  const movie = movieSchema.parse(body);
  return movie;
}
