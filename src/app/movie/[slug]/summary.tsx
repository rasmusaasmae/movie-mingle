import Image from "next/image";

import Torrents from "@/app/movie/[slug]/torrents";
import { AverageRatingImdb } from "@/components/rating/average-rating";
import TMDBRating from "@/components/rating/tmdb-rating";
import UserRating from "@/components/rating/user-rating";
import {
  TMDB_IMAGE_BASE_URL,
  TMDB_IMAGE_SIZE_BACKDROP_ORIGINAL,
  TMDB_IMAGE_SIZE_POSTER_ORIGINAL,
} from "@/lib/tmdb/constants";
import { type TmdbMovieDetails } from "@/lib/tmdb/schemas";

type Props = {
  movie: TmdbMovieDetails;
};

export default async function Summary({ movie }: Props) {
  const release_date = new Date(movie.release_date);
  const year = release_date.getFullYear();

  const runtimeHours = Math.floor(movie.runtime / 60);
  const runtimeMinutes = movie.runtime - 60 * runtimeHours;

  return (
    <section className="relative flex w-full flex-col items-center overflow-hidden bg-slate-950 p-6 text-white">
      <Image
        alt={`Backdrop of ${movie.title}`}
        src={`${TMDB_IMAGE_BASE_URL}/${TMDB_IMAGE_SIZE_BACKDROP_ORIGINAL}/${movie.backdrop_path}`}
        fill
        className="pointer-events-none aspect-video h-full object-cover object-[50%_20%] opacity-25"
      />
      <div className="z-10 flex w-full max-w-7xl flex-col items-center gap-10 sm:flex-row sm:items-start">
        <div className="relative aspect-[2/3] w-full max-w-[18rem] overflow-hidden rounded-md">
          <Image
            src={`${TMDB_IMAGE_BASE_URL}/${TMDB_IMAGE_SIZE_POSTER_ORIGINAL}/${movie.poster_path}`}
            alt={`Poster of ${movie.title}`}
            fill
            className="object-contain"
          />
        </div>
        <section className="flex w-full flex-col gap-2 pt-10">
          <div className="flex flex-row items-center gap-4">
            <h1 className="text-3xl font-bold">
              {movie.title}{" "}
              <span className="font-normal opacity-70">({year})</span>
            </h1>
            <Torrents imdbId={movie.imdb_id} />
          </div>
          <div className="space-x-3 text-slate-300">
            <span>{movie.genres.map((g) => g.name).join(", ")}</span>
            <span>•</span>
            <span>{`${runtimeHours}h ${runtimeMinutes}m`}</span>
          </div>
          <section className="my-2 flex flex-row gap-2">
            <UserRating imdbId={movie.imdb_id} movieTitle={movie.title} />
            <AverageRatingImdb imdbId={movie.imdb_id} />
            <TMDBRating
              tmdbId={movie.id}
              voteAverage={movie.vote_average}
              voteCount={movie.vote_count}
            />
          </section>
          <h3 className="italic text-slate-300">{movie.tagline}</h3>
          <section className="space-y-1">
            <h2 className="text-lg font-semibold">Overview</h2>
            <p className="text-sm">{movie.overview}</p>
          </section>
        </section>
      </div>
    </section>
  );
}
