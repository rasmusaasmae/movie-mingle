import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "./types";

export default async function getMovies(query: string) {
  if (query === "") return [];
  const supabase = createClientComponentClient<Database>();
  const movies = await supabase
    .rpc("search_movies", { title_query: query })
    .limit(20);
  return movies.data ?? [];
}
