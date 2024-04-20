"use server";

import { createClient } from "@supabase/supabase-js";

import { fetchMovieImdb } from "@/utils/tmdb";

import { Database } from "./types";

export async function upsertMovie(imdb_id: string) {
  const { title, release_date } = await fetchMovieImdb(imdb_id);
  const year = new Date(release_date).getFullYear();

  const client = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
  await client.from("movies").upsert({ imdb_id, title, year });
}
