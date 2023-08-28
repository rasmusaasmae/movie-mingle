import { moviesSchema } from "@/schemas/movie";

export default async function fetchYTS(query: string) {
  const response = await fetch(
    `/api/yts/list_movies?query_term=${query}&sort_by=rating`
  );
  const body = await response.json();
  const movies = moviesSchema.parse(body);
  return movies;
}
