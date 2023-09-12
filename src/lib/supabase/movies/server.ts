import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "../types";

export async function getMovies(query: string) {
  if (query === "") return [];
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase
    .rpc("search_movies", { title_query: query })
    .limit(20);
  if (error !== null) throw new Error("Failed to fetch movies");
  return data;
}

export async function getMovie(slug: string) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase
    .from("movies")
    .select()
    .eq("slug", slug)
    .maybeSingle();
  if (error !== null) throw new Error("Failed to fetch movie");
  if (data === null) throw new Error("Movie not found");
  return data;
}
