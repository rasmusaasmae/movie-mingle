import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { type Database } from "@/lib/supabase/types";

export async function getAverageRating(imdb_id: string) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase
    .rpc("get_average_rating", { imdb_id })
    .maybeSingle();

  if (error !== null) console.log(error.message);
  if (error !== null) throw new Error("Failed to get average rating");
  return data;
}
