import { type SupabaseClient } from "@supabase/supabase-js";
import { format } from "date-fns";
import _ from "lodash";
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
  imdbId: string,
) {
  const { data, error } = await client
    .from("ratings")
    .select("imdb_id, value, created_at, updated_at")
    .eq("imdb_id", imdbId)
    .maybeSingle();

  if (error !== null) throw new Error("Failed to get user rating");

  return data;
}

export async function setUserRating(
  client: SupabaseClient<Database>,
  imdbId: string,
  value: number,
) {
  await upsertMovie(imdbId);

  const { error } = await client
    .from("ratings")
    .upsert({ imdb_id: imdbId, value });

  if (error !== null) throw new Error("Failed to set rating");
}

export async function deleteUserRating(
  client: SupabaseClient<Database>,
  imdbId: string,
) {
  const { error } = await client.from("ratings").delete().eq("imdb_id", imdbId);

  if (error !== null) throw new Error("Failed to delete rating");
}

export async function getWatchDate(
  client: SupabaseClient<Database>,
  imdbId: string,
) {
  const { data, error } = await client
    .from("watched")
    .select("imdb_id, date")
    .eq("imdb_id", imdbId)
    .maybeSingle();

  if (error !== null) throw new Error("Failed to get watch date");

  return data;
}

export async function setWatchDate(
  client: SupabaseClient<Database>,
  imdbId: string,
  date: Date,
) {
  await upsertMovie(imdbId);

  const dateString = format(date, "yyyy-MM-dd");

  const { error } = await client
    .from("watched")
    .upsert({ imdb_id: imdbId, date: dateString });

  if (error !== null) throw new Error("Failed to set watch date");
}

export async function deleteWatchDate(
  client: SupabaseClient<Database>,
  imdbId: string,
) {
  const { error } = await client.from("watched").delete().eq("imdb_id", imdbId);

  if (error !== null) throw new Error("Failed to delete watch date");
}

export async function getMeanRating(
  client: SupabaseClient<Database>,
  imdbId: string,
) {
  const { data, error } = await client
    .from("movies_with_rating_and_popularity")
    .select()
    .eq("imdb_id", imdbId)
    .maybeSingle();

  if (error !== null) throw new Error("Failed to get mean rating");

  if (data === null || data.vote_mean === null) return null;

  return z
    .object({ imdbId: z.string(), mean: z.number(), count: z.number() })
    .parse({
      imdbId: data.imdb_id,
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
    .gt("vote_count", 0)
    .order("last_rated", { ascending: false, nullsFirst: false });

  if (error !== null) throw new Error("Failed to get recent movies");

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

export async function getRatingDistribution(client: SupabaseClient<Database>) {
  const { data: totalData, error: totalError } = await client.rpc(
    "get_rating_distribution",
  );
  if (totalError !== null)
    throw new Error("Failed to get total rating distribution");
  const { data: userData, error: userError } = await client.rpc(
    "get_user_rating_distribution",
  );
  if (userError !== null)
    throw new Error("Failed to get user rating distribution");

  const userTotal = userData.reduce((acc, e) => acc + e.count, 0);
  const totalTotal = totalData.reduce((acc, e) => acc + e.count, 0);

  const groups = _.uniq([...totalData, ...userData].map((e) => e.value));
  const data = _.chain(groups)
    .sortBy(Number)
    .map((value) => {
      const total = totalData.find((e) => e.value === value);
      const userRating = userData.find((e) => e.value === value);
      return {
        value,
        userCount: userRating?.count ?? 0,
        userPercentage: ((userRating?.count ?? 0) / userTotal) * 100,
        otherCount: (total?.count ?? 0) - (userRating?.count ?? 0),
        otherPercentage:
          (((total?.count ?? 0) - (userRating?.count ?? 0)) /
            (totalTotal - userTotal)) *
          100,
        totalCount: total?.count ?? 0,
        totalPercentage: ((total?.count ?? 0) / totalTotal) * 100,
      };
    })
    .value();

  return data;
}

export async function getRatingStatistics(client: SupabaseClient<Database>) {
  const { data, error } = await client
    .rpc("get_rating_statistics")
    .maybeSingle();

  if (error !== null || data === null)
    throw new Error("Failed to get rating statistics");

  return data;
}

export async function getUserRatingStatistics(
  client: SupabaseClient<Database>,
) {
  const { data, error } = await client
    .rpc("get_user_rating_statistics")
    .maybeSingle();

  if (error !== null || data === null)
    throw new Error("Failed to get user rating statistics");

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
