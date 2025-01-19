import { type Metadata } from "next";

import RatingDistribution from "@/components/rating-distribution";
import { getUserRatedMovies } from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/server";

import MovieItem from "./_components/movie-item";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your Ratings - Movie Mingle",
  description:
    "Your Ratings is a list of all the movies you have rated on Movie Mingle.",
  keywords: ["Movies", "User Ratings", "Synopsis"],
};

export default async function Page() {
  const supabase = await createClient();
  const movies = await getUserRatedMovies(supabase);

  return (
    <main className="flex min-h-[calc(100vh-56px)] w-full flex-col items-center gap-6 px-8 pb-8">
      <section className="flex w-fit max-w-7xl flex-col items-center gap-4">
        <RatingDistribution />
      </section>
      <section className="flex w-fit max-w-xl flex-col items-center gap-4">
        {movies.map((m) => (
          <MovieItem key={m.imdb_id} movie={m} />
        ))}
      </section>
    </main>
  );
}
