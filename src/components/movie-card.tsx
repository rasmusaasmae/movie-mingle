import { TmdbMovie } from "@/lib/tmdb/schemas";
import { getMovieUrl } from "@/utils/url";
import PosterImage from "./poster-image";
import { cn } from "@/utils/shadcn";
import Link from "next/link";

type MovieCardProps = React.HTMLProps<HTMLDivElement> & {
  movie: TmdbMovie;
};

export default function MovieCard(props: MovieCardProps) {
  const { movie, className } = props;
  const { id, title, poster_path } = movie;

  const release_date = new Date(movie.release_date);
  const year = release_date.getFullYear();
  const href = getMovieUrl(id, title);

  return (
    <Link href={href}>
      <div className={cn("relative h-72", className)}>
        <PosterImage
          title={title}
          poster_path={poster_path}
          className="h-full"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white to-transparent p-1 pt-10 dark:from-slate-950 dark:via-slate-900">
          <h3 className="line-clamp-2 text-lg font-semibold">{title}</h3>
          <p> {year}</p>
        </div>
      </div>
    </Link>
  );
}
