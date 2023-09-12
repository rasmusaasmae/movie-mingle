"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { z } from "zod";
import type { Database } from "../types";

export async function deleteRating(movieId: string) {
  const id = z.string().parse(movieId);
  const supabase = createServerActionClient<Database>({ cookies });

  const { error } = await supabase.from("ratings").delete().eq("movie_id", id);

  revalidatePath("/movie/[slug]");
  if (error) throw new Error(error.message);
}

export async function setRating(movieId: string, newRating: number) {
  const id = z.string().parse(movieId);
  const rating = z.number().parse(newRating);
  const supabase = createServerActionClient<Database>({ cookies });

  const { error } = await supabase
    .from("ratings")
    .upsert({ movie_id: id, rating });

  revalidatePath("/movie/[slug]");
  if (error) throw new Error(error.message);
}
