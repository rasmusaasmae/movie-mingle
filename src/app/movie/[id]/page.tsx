"use client";

import Image from "next/image";
import useMovie from "./../../../hooks/useMovie";

export default function Movie({ params }: { params: { id: string } }) {
  const { data: movie, isLoading, isError, error } = useMovie(params.id);
  console.log(movie);
  if (movie === undefined) {
    return "loading...";
  }
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between p-24">
      <div
        className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        {movie.title} ({movie.year})
      </div>
      <Image
        src={movie.mediumCoverImage}
        alt={`Picture of ${movie.title}`}
        height={200}
        width={200}
      />
      <div>{movie.genres.join(", ")}</div>
    </main>
  );
}
