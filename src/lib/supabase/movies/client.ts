import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { type Database } from "@/lib/supabase/types";

export async function searchMovies(query: string) {
  if (query === "") return [];
  const supabase = createClientComponentClient<Database>();
  const { data, error } = await supabase
    .rpc("search_movies", { title_query: query })
    .limit(50);
  if (error !== null) throw new Error("Failed to search movies");
  return data;
}

export type Order =
  | "average_rating"
  | "user_rating"
  | "imdb_rating"
  | "runtime"
  | "year";

export async function getMovies(
  page: number = 1,
  query: string = "",
  order: Order = "average_rating",
  ascending: boolean = false,
) {
  const startIndex = (page - 1) * 20;
  const endIndex = page * 20 - 1;
  const supabase = createClientComponentClient<Database>();
  const { data, error } = await supabase
    .from("movies")
    .select()
    .ilike("title", `%${query}%`)
    .order(order, { ascending, nullsFirst: false })
    .range(startIndex, endIndex);
  if (error !== null) throw new Error("Failed to get movies");
  return data;
}
