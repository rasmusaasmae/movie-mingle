import { Database } from "@/lib/supabase/types";
import Image from "next/image";
import Link from "next/link";

type Movie =
  Database["public"]["Functions"]["search_movies"]["Returns"][number];
interface Props {
  movie: Movie;
}

export default function SearchResult({ movie }: Props) {
  return (
    <div className="grid grid-cols-4 grid-rows-1 w-full rounded-md overflow-hidden hover:bg-black/5 dark:hover:bg-white/5 border border-slate-300 dark:border-slate-600">
      <div className="relative h-full aspect-[2/3]">
        <Link href={`/movies/${movie.slug}`}>
          <Image
            fill
            src={movie.poster}
            alt={movie.title}
            className="object-cover border-r border-slate-300 dark:border-slate-600"
          />
        </Link>
      </div>
      <div className="col-span-3 h-full p-3">
        <Link href={`/movies/${movie.slug}`}>
          <h3 className="truncate font-semibold text-lg">{movie.title}</h3>
        </Link>
        <p className="dark:text-slate-300"> {movie.year}</p>
        <section className="flex flex-row space-x-6">
          <div className="flex flex-row space-x-2 items-center">
            <Link
              href={`https://www.imdb.com/title/${movie.imdb_code}`}
              target="_blank"
            >
              <Image src="/imdb.svg" alt="IMDb Rating" height={18} width={41} />
            </Link>
            <span className="font-medium">{movie.imdb_rating}</span>
          </div>
        </section>
        <p className="line-clamp-1 sm:line-clamp-2 line-cl">
          {movie.description}
        </p>
      </div>
    </div>
  );
}
