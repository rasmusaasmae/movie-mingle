import { Suspense } from "react";

import { MovieCardFallback, MovieCardImdb } from "@/components/movie-card";
import { getPopularMovies, getTopMovies } from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = createClient();
  const popularMovies = await getPopularMovies(supabase);
  const topMovies = await getTopMovies(supabase);

  return (
    <main className="flex min-h-[calc(100vh-56px)] w-full flex-col items-center gap-6 px-2 pt-10 md:px-4">
      <div className="w-full max-w-7xl">
        <h2 className="mb-4 text-2xl font-semibold">Popular movies</h2>
        <div className="relative mb-4 w-full">
          <ul className="flex w-full flex-row space-x-4 overflow-x-auto pb-5">
            {popularMovies.map((m) => (
              <li key={`popular_${m.imdb_id}`}>
                <MovieCardImdb
                  imdbId={m.imdb_id}
                  rating={{ mean: m.mean, count: m.count }}
                />
              </li>
            ))}
          </ul>
          <div className="pointer-events-none absolute bottom-5 right-0 top-0 w-24 bg-gradient-to-l from-transparent to-transparent dark:from-slate-950" />
        </div>
      </div>
      <div className="w-full max-w-7xl">
        <h2 className="mb-4 text-2xl font-semibold">Top movies</h2>
        <div className="relative mb-4 w-full">
          <ul className="flex w-full flex-row space-x-4 overflow-x-auto pb-5">
            {topMovies.map((m) => (
              <li key={`top_${m.imdb_id}`}>
                <MovieCardImdb
                  imdbId={m.imdb_id}
                  rating={{ mean: m.mean, count: m.count }}
                />
              </li>
            ))}
          </ul>
          <div className="pointer-events-none absolute bottom-5 right-0 top-0 w-24 bg-gradient-to-l from-transparent to-transparent dark:from-slate-950" />
        </div>
      </div>
    </main>
  );
}
