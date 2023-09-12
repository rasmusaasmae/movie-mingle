import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "../types";

export async function getRating(movieId: string) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase
    .from("ratings")
    .select()
    .eq("movie_id", movieId)
    .maybeSingle();

  if (error !== null) throw new Error("Failed to fetch rating");
  return data;
}
