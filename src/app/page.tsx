import { getPopularMovies } from "@/lib/supabase/ratings/server";
import { fetchMovieImdb } from "@/lib/tmdb";
import MovieCard from "@/components/movie-card";

export const dynamic = "force-dynamic";

export default async function Home() {
  const popularMovies = await Promise.all(
    (await getPopularMovies()).map((m) => fetchMovieImdb(m.imdb_id)),
  );

  return (
    <main className="mt-10 flex w-full flex-col items-center gap-6 px-2 md:px-4">
      <div className="w-full max-w-7xl">
        <h2 className="mb-4 text-2xl font-semibold">Popular movies</h2>
        <div className="relative mb-4 w-full">
          <div className="flex w-full flex-row space-x-4 overflow-x-auto">
            {popularMovies.map((m) => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>
          <div className="absolute bottom-0 right-0 top-0 w-24 bg-gradient-to-l from-transparent to-transparent dark:from-slate-950" />
        </div>
      </div>
    </main>
  );
}
