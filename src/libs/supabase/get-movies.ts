import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "./types";

export default async function getMovies(query: string) {
  if (query === "") return [];
  const supabase = createClientComponentClient<Database>();
  const movies = await supabase
    .from("movies")
    .select()
    .ilike("title", `%${query}%`)
    .order("imdb_rating", { ascending: false, nullsFirst: false })
    .order("year", { ascending: false, nullsFirst: false })
    .limit(20);
  return movies.data ?? [];
}
