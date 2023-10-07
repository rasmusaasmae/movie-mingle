import Image from "next/image";

import { getMovie } from "@/lib/supabase/movies/server";

import AverageRating from "@/components/rating/average-rating";
import IMDbRating from "@/components/rating/imdb-rating";
import UserRating from "@/components/rating/user-rating";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const movie = await getMovie(params.slug);
  return {
    title: `${movie.title_long} - Movie Mingle`,
    description: `${movie.description_intro?.slice(0, 150)}`,
    keywords: ["Movie Mingle", movie.title_long],
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const movie = await getMovie(params.slug);

  const runtimeHours = Math.floor(movie.runtime! / 60);
  const runtimeMinutes = movie.runtime! - 60 * runtimeHours;

  return (
    <main className="w-full h-full flex flex-col items-center">
      <div className="flex flex-col w-full max-w-7xl px-1 sm:px-4 mx-auto space-y-4">
        <section className="flex flex-row justify-between">
          <section className="space-y-1">
            <h1 className="text-4xl">{movie.title}</h1>
            <div className="space-x-3 text-slate-700 dark:text-slate-400">
              <span>{movie.year}</span>
              <span>{movie.mpa_rating}</span>
              <span>
                {runtimeHours !== 0 ? `${runtimeHours}h` : null}{" "}
                {runtimeMinutes}m
              </span>
            </div>
          </section>
          <section className="flex flex-row space-x-1 sm:space-x-3">
            <UserRating movieId={movie.id!} movieTitle={movie.title_long!} />
            <AverageRating movieId={movie.id!} />
            <IMDbRating
              imdb_code={movie.imdb_code!}
              rating={movie.imdb_rating}
            />
          </section>
        </section>
        <section className="self-center">
          <Image
            src={movie.large_cover_image ?? ""}
            alt={`Picture of ${movie.title}`}
            height={300}
            width={300}
          />
        </section>
      </div>
    </main>
  );
}
