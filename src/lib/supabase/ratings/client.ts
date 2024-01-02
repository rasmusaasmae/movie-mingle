import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { type Database } from "@/lib/supabase/types";

export async function getUserRating(imdb_id: string) {
  const supabase = createClientComponentClient<Database>();
  const { data, error } = await supabase
    .from("ratings")
    .select()
    .eq("imdb_id", imdb_id)
    .maybeSingle();

  if (error !== null) throw new Error("Failed to get user rating");
  return data;
}

export async function setUserRating({
  imdbId,
  value,
}: {
  imdbId: string;
  value: number | null;
}) {
  const supabase = createClientComponentClient<Database>();
  if (value === null) {
    const { error } = await supabase
      .from("ratings")
      .delete()
      .eq("imdb_id", imdbId);
    if (error !== null) throw new Error("Failed to delete rating");
  } else {
    const { error } = await supabase
      .from("ratings")
      .upsert({ imdb_id: imdbId, value });

    if (error !== null) throw new Error("Failed to set rating");
  }
}
