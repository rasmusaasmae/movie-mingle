"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Separator } from "../ui/separator";
import { useState } from "react";
import useSearchMovies from "@/hooks/use-search-movies";
import SearchResult from "./search-result";
import Link from "next/link";
import { getMovieUrl } from "@/utils/url";

type Props = {};

export default function SearchDialog(props: Props) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data, isLoading, isError, isSuccess } = useSearchMovies(
    searchTerm,
    1,
    0,
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
              className="flex w-full bg-white px-3 py-1 text-sm outline-none placeholder:text-slate-500  dark:bg-slate-950 dark:placeholder:text-slate-400"
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
