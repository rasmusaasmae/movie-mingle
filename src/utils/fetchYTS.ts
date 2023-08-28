import { moviesSchema } from "@/schemas/movie";

export default async function fetchYTS(query: string) {
  const response = await fetch(`/api/yts/list_movies?query=${query}`);
  const body = await response.json();
  const movie = moviesSchema.parse(body);
  return movie;
}
