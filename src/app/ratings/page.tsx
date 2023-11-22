import { type Metadata } from "next";
import { getUserRatings } from "@/lib/supabase/ratings/server";
import MovieItem from "./movie-item";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your Ratings - Movie Mingle",
  description:
    "Your Ratings is a list of all the movies you have rated on Movie Mingle.",
  keywords: ["Movies", "User Ratings", "Synopsis"],
};

export default async function Page() {
  const userRatings = await getUserRatings();

  return (
    <main className="w-screen min-h-screen pb-8 px-8 flex flex-col items-center gap-6">
      <section className="flex flex-col items-center gap-4 w-fit max-w-xl">
        {userRatings.map((rating) => (
          <MovieItem key={rating.imdb_id} imdbId={rating.imdb_id} />
        ))}
      </section>
    </main>
  );
}
