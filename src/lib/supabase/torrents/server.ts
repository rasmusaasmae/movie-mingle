import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { type Database } from "@/lib/supabase/types";

export async function getTorrents(imdbId: string) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase
    .from("torrents")
    .select()
    .eq("imdb_id", imdbId);

  if (error !== null) throw new Error("Failed to get torrents");
  return data;
}