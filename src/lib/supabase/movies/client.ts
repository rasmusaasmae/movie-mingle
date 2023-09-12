import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "../types";

export async function getMovies(query: string) {
  if (query === "") return [];
  const supabase = createClientComponentClient<Database>();
  const { data, error } = await supabase
    .rpc("search_movies", { title_query: query })
    .limit(20);
  if (error !== null) throw new Error("Failed to fetch movies");
  return data;
}
