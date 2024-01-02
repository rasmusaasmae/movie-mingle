import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { type Database } from "@/lib/supabase/types";

export async function getAverageRating(imdb_id: string) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase
    .rpc("get_average_rating", { imdb_id })
    .maybeSingle();

  if (error !== null || data === null)
    throw new Error("Failed to get average rating");

  return {
    mean: data.mean === null ? null : data.mean,
    count: data.count,
  };
}

export async function getUserRatings() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase
    .from("ratings")
    .select("imdb_id, value, created_at, updated_at")
    .order("value", { ascending: false })
    .order("updated_at", { ascending: false });

  if (error !== null) throw new Error("Failed to get user ratings");

  return data;
}

export async function getPopularMovies() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase.rpc("get_popular_movies", {});

  if (error !== null) throw new Error("Failed to get popular movies");

  return data;
}

export async function getTopMovies() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase.rpc("get_top_movies", {});

  if (error !== null) throw new Error("Failed to get top movies");

  return data;
}
