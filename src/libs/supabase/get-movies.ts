import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "./types";

export default async function getMovies(query: string) {
  const supabase = createClientComponentClient<Database>();
  const movies = await supabase
    .from("movies")
    .select()
    .ilike("title", `%${query}%`)
    .order("imdb_rating", { ascending: false, nullsFirst: false });
  return movies.data ?? [];
}
