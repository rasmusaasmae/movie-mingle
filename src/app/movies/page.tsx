"use client";

import useMovies from "@/hooks/useMovies";

export default function Movies() {
  const { isLoading, isError, data: movies } = useMovies();

  if (isLoading) return <main>Loading</main>;
  if (isError) return <main>Error</main>;
  if (movies === undefined) return <main>No data</main>;

  return (
    <main>
      <div className="flex justify-center">
        <p>Number of movies in database: {movies.length}</p>
        {movies.map((movie) => (
          <div key={movie.id}>
            {movie.id} {movie.avgRating}
          </div>
        ))}
      </div>
    </main>
  );
}
