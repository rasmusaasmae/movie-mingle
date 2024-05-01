import { type SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";

import { upsertMovie } from "./actions";
import { type Database } from "./types";

export async function getUser(client: SupabaseClient<Database>) {
  const { data, error } = await client.auth.getUser();

  if (error !== null) throw new Error("Failed to get user");

  return data.user;
}

export async function getUserRating(
  client: SupabaseClient<Database>,
  imdb_id: string,
) {
  const { data, error } = await client
    .from("ratings")
    .select("imdb_id, value, created_at, updated_at")
    .eq("imdb_id", imdb_id)
    .maybeSingle();

  if (error !== null) throw new Error("Failed to get user rating");

  return data;
}

export async function setUserRating(
  client: SupabaseClient<Database>,
  imdb_id: string,
  value: number,
) {
  await upsertMovie(imdb_id);
  const { error } = await client.from("ratings").upsert({ imdb_id, value });

  if (error !== null) throw new Error("Failed to set rating");
}

export async function deleteUserRating(
  client: SupabaseClient<Database>,
  imdb_id: string,
) {
  const { error } = await client
    .from("ratings")
    .delete()
    .eq("imdb_id", imdb_id);

  if (error !== null) throw new Error("Failed to delete rating");
}

export async function getMeanRating(
  client: SupabaseClient<Database>,
  imdb_id: string,
) {
  const { data, error } = await client
    .from("movies_with_rating_and_popularity")
    .select()
    .eq("imdb_id", imdb_id)
    .maybeSingle();

  if (error !== null) throw new Error("Failed to get mean rating");

  if (data === null) return null;
  return z
    .object({ imdb_id: z.string(), mean: z.number(), count: z.number() })
    .parse({
      imdb_id: data.imdb_id,
      mean: data.vote_mean,
      count: data.vote_count,
    });
}

export async function getPopularMovies(client: SupabaseClient<Database>) {
  const { data, error } = await client
    .from("movies_with_rating_and_popularity")
    .select("*")
    .order("popularity", { ascending: false });

  if (error !== null) throw new Error("Failed to get popular movies");

  return data;
}

export async function getRecentMovies(client: SupabaseClient<Database>) {
  const { data, error } = await client
    .from("movies_with_rating_and_popularity")
    .select("*")
    .order("last_rated", { ascending: false });

  if (error !== null) throw new Error("Failed to get top movies");

  return data;
}

export async function getTopMovies(client: SupabaseClient<Database>) {
  const { data, error } = await client
    .from("movies_with_rating_and_popularity")
    .select("*")
    .gt("vote_count", 1)
    .order("vote_mean", { ascending: false });

  if (error !== null) throw new Error("Failed to get top movies");

  return data;
}

export async function getUserRatedMovies(client: SupabaseClient<Database>) {
  const { data, error } = await client
    .from("ratings")
    .select("imdb_id, value, updated_at, movies_with_rating_and_popularity (*)")
    .order("value", { ascending: false })
    .order("updated_at", { ascending: false });

  if (error !== null) throw new Error("Failed to get user ratings");

  const movies = data.map((row) => ({
    ...row.movies_with_rating_and_popularity!,
  }));

  return movies;
}
