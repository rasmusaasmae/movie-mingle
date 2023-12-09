import { getPopularMovies } from "@/lib/supabase/ratings/server";
import { fetchMovieImdb } from "@/lib/tmdb";
import MovieCard from "@/components/movie-card";

export const dynamic = "force-dynamic";

export default async function Home() {
  const popularMovies = await Promise.all(
    (await getPopularMovies()).map((m) => fetchMovieImdb(m.imdb_id)),
  );

  return (
    <main className="mt-10 flex w-screen flex-col items-center gap-6">
      <div className="relative h-fit w-full max-w-7xl">
        <h2 className="mb-4 text-2xl font-semibold">Popular movies</h2>
        <div className="flex w-full flex-row space-x-4 overflow-x-auto pb-4">
          {popularMovies.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
        <div className="absolute bottom-0 right-0 top-0 h-full w-24 bg-gradient-to-r from-transparent to-slate-950" />
      </div>
    </main>
  );
}
