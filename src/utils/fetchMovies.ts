import { moviesSchema } from "@/schemas/movie";

export default async function fetchMovies() {
  const response = await fetch(`/api/movies`);
  const body = await response.json();
  const movie = moviesSchema.parse(body);
  return movie;
}
