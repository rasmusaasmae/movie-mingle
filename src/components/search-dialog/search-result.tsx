import { type TmdbMovie } from "@/lib/tmdb/schemas";
import PosterImage from "@/components/poster-image";

type Props = {
  movie: TmdbMovie;
};

export default function SearchResult({ movie }: Props) {
  const release_date = new Date(movie.release_date);
  const year = release_date.getFullYear();

  return (
    <div className="w-full h-24 flex flex-row rounded-md overflow-hidden">
      <PosterImage
        tmdb_id={movie.id}
        title={movie.title}
        poster_path={movie.poster_path}
      />
      <div className="w-full h-full px-2 py-2">
        <h3 className="truncate font-semibold text-lg">{movie.title}</h3>
        <p className="dark:text-slate-300"> {year}</p>
      </div>
    </div>
  );
}
