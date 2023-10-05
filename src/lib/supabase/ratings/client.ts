import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { type Database } from "@/lib/supabase/types";

export async function getUserRating(movieId: string) {
  const supabase = createClientComponentClient<Database>();
  const { data, error } = await supabase
    .from("ratings")
    .select()
    .eq("movie_id", movieId)
    .maybeSingle();

  if (error !== null) throw new Error("Failed to get user rating");
  return data;
}

export async function setUserRating({
  movieId,
  rating,
}: {
  movieId: string;
  rating: number | null;
}) {
  const supabase = createClientComponentClient<Database>();
  if (rating === null) {
    const { error } = await supabase
      .from("ratings")
      .delete()
      .eq("movie_id", movieId);
    if (error !== null) throw new Error("Failed to delete rating");
  } else {
    const { error } = await supabase
      .from("ratings")
      .upsert({ movie_id: movieId, rating });

    if (error !== null) throw new Error("Failed to set rating");
  }
}

export async function getAverageRating(movieId: string) {
  const supabase = createClientComponentClient<Database>();
  const { data, error } = await supabase
    .from("average_ratings")
    .select()
    .eq("movie_id", movieId)
    .maybeSingle();

  if (error !== null) throw new Error("Failed to get average rating");
  return data;
}
