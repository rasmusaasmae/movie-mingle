import Image from "next/image";
import Link from "next/link";
import { type MovieYTS } from "@/schemas/yts";

interface Props {
  movie: MovieYTS;
}

export default function SearchResult({ movie }: Props) {
  return (
    <div className="grid grid-cols-4 grid-rows-1 w-full rounded-md overflow-hidden hover:bg-black/5 dark:hover:bg-white/5 border border-slate-300 dark:border-slate-600">
      <div className="relative h-full aspect-[2/3]">
        <Link href={`/movie/${movie.id}`}>
          <Image
            fill
            src={movie.medium_cover_image}
            alt={movie.title_long}
            className="object-cover border-r border-slate-300 dark:border-slate-600"
          />
        </Link>
      </div>
      <div className="col-span-3 h-full p-3">
        <Link href={`/movie/${movie.id}`}>
          <h3 className="truncate font-semibold text-lg">{movie.title}</h3>
        </Link>
        <p className="dark:text-slate-300"> {movie.year}</p>
        <div className="flex flex-row space-x-2 items-center">
          <Link
            href={`https://www.imdb.com/title/${movie.imdb_code}`}
            target="_blank"
          >
            <Image src="/imdb.svg" alt="IMDb Rating" height={18} width={41} />
          </Link>
          <span className="font-medium">{movie.rating}</span>
        </div>
        <p className="line-clamp-1 sm:line-clamp-2 line-cl">
          {movie.description_intro ?? movie.description_full}
        </p>
      </div>
    </div>
  );
}
