"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { type TmdbMovie } from "@/lib/tmdb/schemas";
import { getMovieUrl } from "@/utils/url";
import useSearchMovies from "@/hooks/use-search-movies";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import PosterImage from "@/components/poster-image";

type Props = {};

export default function SearchDialog(props: Props) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data, isLoading, isError, isSuccess } = useSearchMovies(
    searchTerm,
    1,
  );

  function handleSearchChange(value: string) {
    setSearchTerm(value);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="group">
          <span className="opacity-50 transition-opacity group-hover:dark:opacity-80">
            Search for movies...
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="gap-2 sm:max-w-md">
        <DialogHeader>
          <div className="flex flex-row items-center px-3">
            <Search className="h-4 w-4 shrink-0 opacity-50" />
            <input
              type="text"
              placeholder="Start typing to search for movies..."
              onChange={(e) => handleSearchChange(e.target.value)}
              maxLength={50}
              className="flex w-full bg-white px-3 py-1 text-sm outline-none placeholder:text-gray-500  dark:bg-gray-950 dark:placeholder:text-gray-400"
            />
          </div>
        </DialogHeader>
        <Separator />
        <div className="flex h-60 w-full flex-col gap-1 overflow-y-auto overflow-x-hidden">
          {data?.results.map((movie) => (
            <DialogClose key={movie.id} asChild>
              <Link
                href={getMovieUrl(movie.id, movie.title)}
                className="hover:bg-black/5 dark:hover:bg-white/5"
              >
                <SearchResult key={movie.id} movie={movie} />
              </Link>
            </DialogClose>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

type SearchResultProps = {
  movie: TmdbMovie;
};
function SearchResult(props: SearchResultProps) {
  const { movie } = props;

  const release_date = new Date(movie.release_date);
  const year = release_date.getFullYear();

  return (
    <div className="flex h-24 w-full flex-row overflow-hidden rounded-md">
      <PosterImage
        title={movie.title}
        poster_path={movie.poster_path}
        className="h-full"
      />
      <div className="h-full w-full px-2 py-2">
        <h3 className="truncate text-lg font-semibold">{movie.title}</h3>
        <p className="dark:text-gray-300"> {year}</p>
      </div>
    </div>
  );
}
