import Link from "next/link";

import PosterImage from "@/components/poster-image";
import { AverageRating } from "@/components/rating/average-rating";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchMovieImdb } from "@/lib/tmdb";
import { TmdbMovie } from "@/lib/tmdb/schemas";
import { cn } from "@/utils/shadcn";
import { getMovieUrl } from "@/utils/url";

type MovieCardProps = React.HTMLProps<HTMLDivElement> & {
  movie: TmdbMovie;
  rating?: { mean: number | null; count: number };
};

export function MovieCard(props: MovieCardProps) {
  const { movie, rating, className, ...rest } = props;
  const { id, title, poster_path } = movie;

  const release_date = new Date(movie.release_date);
  const year = release_date.getFullYear();
  const href = getMovieUrl(id, title);

  return (
    <Link href={href}>
      <div
        className={cn(
          "group relative aspect-[2/3] h-72 overflow-hidden rounded-md bg-slate-50 dark:bg-slate-950",
          className,
        )}
        {...rest}
      >
        <PosterImage
          title={title}
          poster_path={poster_path}
          className="h-full transition-opacity group-hover:opacity-30 dark:group-hover:opacity-20"
        />

        <div className="absolute left-0 right-0 top-1/2 m-1 grid -translate-y-1/2 place-items-center opacity-0 transition-opacity group-hover:opacity-100">
          <h3 className="line-clamp-3 text-center text-lg font-bold">
            {title}
          </h3>
          <p className="font-semibold">{year}</p>
        </div>
        <div className="absolute right-0 top-0 z-20 grid place-items-end p-1">
          <AverageRating rating={rating} variant="small" />
        </div>
      </div>
    </Link>
  );
}

type MovieCardImdbProps = React.HTMLProps<HTMLDivElement> & {
  imdbId: string;
  rating?: { mean: number; count: number };
};

export async function MovieCardImdb(props: MovieCardImdbProps) {
  const { imdbId, ...rest } = props;
  const movie = await fetchMovieImdb(imdbId);
  return <MovieCard movie={movie} {...rest} />;
}

type MovieCardFallbackProps = React.HTMLProps<HTMLDivElement> & {};

export function MovieCardFallback(props: MovieCardFallbackProps) {
  const { className, ...rest } = props;
  return <Skeleton className={cn("aspect-[2/3] h-72", className)} {...rest} />;
}
