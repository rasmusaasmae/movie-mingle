import { YTS_BASE_URL } from "@/constants/yts";
import { ytsMovieListSchema } from "@/schemas/yts";

export default async function getMovieListYTS(
  queryTerm?: string,
  limit: number = 20,
  page: number = 1,
  minimumRating: number = 0,
  sortBy:
    | "title"
    | "year"
    | "rating"
    | "peers"
    | "seeds"
    | "download_count"
    | "like_count"
    | "date_added" = "rating",
  orderBy: "desc" | "asc" = "desc",
) {
  if (queryTerm === undefined || queryTerm === "") return [];
  const url =
    YTS_BASE_URL +
    `/list_movies?query_term=${queryTerm}&limit=${limit}&page=${page}&minimum_rating=${minimumRating}&sort_by=${sortBy}&order_by=${orderBy}`;

  const response = await fetch(url);
  if (!response.ok)
    throw new Error(
      `Failed to get movie list from YTS: ${response.statusText}`,
    );
  const body = await response.json();
  const result = ytsMovieListSchema.parse(body.data);
  return result;
}
