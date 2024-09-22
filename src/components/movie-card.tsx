import Link from "next/link";

import PosterImage from "@/components/poster-image";
import { AverageRatingCircle } from "@/components/rating/average-rating";
import { cn } from "@/lib/utils";
import { type Database } from "@/utils/supabase/types";
import { TmdbMovie } from "@/utils/tmdb/schemas";
import { getMovieUrl } from "@/utils/url";

type MovieCardProps = React.HTMLProps<HTMLDivElement> & {
  movie: Database["public"]["Views"]["movies_with_rating_and_popularity"]["Row"];
};

export function MovieCard(props: MovieCardProps) {
  const { movie, className, ...rest } = props;
  const { imdb_id, tmdb_id, title, year, poster_path, vote_mean, vote_count } =
    movie;

  const rating =
    vote_mean !== null && vote_count !== null
      ? { mean: vote_mean, count: vote_count }
      : null;
  const href = getMovieUrl(tmdb_id!, title);

  return (
    <Link href={href}>
      <div
        className={cn(
          "group relative aspect-[2/3] h-72 overflow-hidden rounded-md bg-slate-50 text-lg dark:bg-slate-950",
          className,
        )}
        {...rest}
      >
        <PosterImage
          title={title ?? imdb_id ?? tmdb_id!.toString()}
          poster_path={poster_path}
          className="h-full transition-opacity group-hover:opacity-30 dark:group-hover:opacity-20"
        />

        <div className="absolute left-0 right-0 top-1/2 m-1 grid -translate-y-1/2 place-items-center opacity-0 transition-opacity group-hover:opacity-100">
          <h3 className="line-clamp-3 text-center font-bold">{title}</h3>
          <p className="font-semibold">{year}</p>
        </div>
        {rating !== null && (
          <div className="absolute right-0 top-0 z-20 grid place-items-end p-1">
            {<AverageRatingCircle rating={rating} />}
          </div>
        )}
      </div>
    </Link>
  );
}

type MovieCardTmdbProps = React.HTMLProps<HTMLDivElement> & {
  movie: TmdbMovie;
};

export async function MovieCardTmdb(props: MovieCardTmdbProps) {
  const { movie, ...rest } = props;
  const {
    id: tmdb_id,
    title,
    release_date,
    overview,
    genre_ids,
    poster_path,
    backdrop_path,
    vote_count: tmdb_vote_count,
    vote_average: tmdb_vote_mean,
  } = movie;

  const year = new Date(release_date).getFullYear();

  return (
    <MovieCard
      movie={{
        imdb_id: null,
        tmdb_id,
        title,
        year,
        overview,
        genre_ids,
        poster_path,
        backdrop_path,
        imdb_vote_count: null,
        imdb_vote_mean: null,
        tmdb_vote_count,
        tmdb_vote_mean,
        vote_mean: null,
        vote_count: null,
        popularity: null,
        last_rated: null,
      }}
      {...rest}
    />
  );
}
