import { getSession } from "@/lib/supabase/auth/server";
import { getRating } from "@/lib/supabase/ratings/server";
import UserRatingForm from "./user-rating-dialog";

type UserRatingProps = {
  movieId: string;
  movieTitle: string;
};

export default async function UserRating({
  movieId,
  movieTitle,
}: UserRatingProps) {
  const session = await getSession();
  if (!session) return null;
  const rating = await getRating(movieId);

  return (
    <UserRatingForm
      movieId={movieId}
      movieTitle={movieTitle}
      rating={rating?.rating ?? null}
    />
  );
}
