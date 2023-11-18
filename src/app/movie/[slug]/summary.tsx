import Image from "next/image";
import { type TmdbMovieDetails } from "@/lib/tmdb/schemas";
import { TMDB_IMAGE_BASE_URL } from "@/lib/tmdb/constants";
import IMDbRating from "@/components/rating/imdb-rating";
import TMDBRating from "@/components/rating/tmdb-rating";
import AverageRating from "@/components/rating/average-rating";
import UserRating from "@/components/rating/user-rating";
import Torrents from "@/components/torrents";

type Props = {
  movie: TmdbMovieDetails;
};

export default async function Summary({ movie }: Props) {
  const release_date = new Date(movie.release_date);
  const year = release_date.getFullYear();

  const runtimeHours = Math.floor(movie.runtime / 60);
  const runtimeMinutes = movie.runtime - 60 * runtimeHours;

  return (
    <section className="relative w-full p-6 flex flex-col items-center overflow-hidden bg-slate-950 text-white">
      <Image
        alt={`Backdrop of ${movie.title}`}
        src={`${TMDB_IMAGE_BASE_URL}/${movie.backdrop_path}`}
        fill
        className="h-full object-cover aspect-video opacity-25 pointer-events-none"
      />
      <div className="w-full max-w-7xl gap-10 flex flex-col sm:flex-row items-center sm:items-start z-10">
        <div className="relative w-full max-w-[18rem] aspect-[2/3] rounded-md overflow-hidden">
          <Image
            src={`${TMDB_IMAGE_BASE_URL}/${movie.poster_path}`}
            alt={`Poster of ${movie.title}`}
            fill
            className="object-contain"
          />
        </div>
        <section className="w-full pt-10 flex flex-col gap-2">
          <div className="flex flex-row items-center gap-4">
            <h1 className="text-3xl font-bold">
              {movie.title}{" "}
              <span className="opacity-70 font-normal">({year})</span>
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
            <AverageRating imdbId={movie.imdb_id} />
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
