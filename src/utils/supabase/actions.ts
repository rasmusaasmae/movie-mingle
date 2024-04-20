"use server";

import { createClient } from "@supabase/supabase-js";

import { fetchMovieImdb } from "@/utils/tmdb";

import { Database } from "./types";

export async function upsertMovie(imdb_id: string) {
  const {
    id: tmdb_id,
    title,
    release_date,
    overview,
    poster_path,
    backdrop_path,
    genre_ids,
    vote_count: tmdb_vote_count,
    vote_average: tmdb_vote_mean,
  } = await fetchMovieImdb(imdb_id);
  const year = new Date(release_date).getFullYear();

  const client = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
  await client.from("movies").upsert({
    imdb_id,
    tmdb_id,
    title,
    year,
    overview,
    poster_path,
    backdrop_path,
    genre_ids,
    tmdb_vote_count,
    tmdb_vote_mean,
  });
}
