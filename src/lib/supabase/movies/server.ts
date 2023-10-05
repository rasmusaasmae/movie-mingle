import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { type Database } from "@/lib/supabase/types";

export async function getMovie(slug: string) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase
    .from("movies")
    .select()
    .eq("slug", slug)
    .maybeSingle();
  if (error !== null) throw new Error("Failed to get movie");
  if (data === null) throw new Error("Movie not found");
  return data;
}
