import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { type TmdbMovie } from "@/lib/tmdb/schemas";
import {
  TMDB_IMAGE_BASE_URL,
  TMDB_IMAGE_SIZE_POSTER_SMALL,
} from "@/lib/tmdb/constants";

type Props = {
  movie: TmdbMovie;
};

export default function SearchResult({ movie }: Props) {
  const release_date = new Date(movie.release_date);
  const year = release_date.getFullYear();

  return (
    <div className="w-full h-24 flex flex-row rounded-md overflow-hidden">
      <div className="relative h-full aspect-[2/3]">
        {movie.poster_path ? (
          <Image
            alt={`Poster of ${movie.title}`}
            src={`${TMDB_IMAGE_BASE_URL}/${TMDB_IMAGE_SIZE_POSTER_SMALL}/${movie.poster_path}`}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full grid place-items-center">
            <ImageIcon className="w-8 h-8 opacity-50" />
          </div>
        )}
      </div>
      <div className="w-full h-full px-2 py-2">
        <h3 className="truncate font-semibold text-lg">{movie.title}</h3>
        <p className="dark:text-slate-300"> {year}</p>
      </div>
    </div>
  );
}
