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
      <div className={cn("group relative h-72 bg-slate-950", className)}>
        <PosterImage
          title={title}
          poster_path={poster_path}
          className="h-full transition-opacity group-hover:opacity-20"
        />
        <div className="absolute inset-0 grid place-content-center place-items-center opacity-0 transition-opacity group-hover:opacity-100">
          <h3 className="line-clamp-2 text-center text-lg font-semibold">
            {title}
          </h3>
          <p>{year}</p>
        </div>
      </div>
    </Link>
  );
}
