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
import slugify from "@/utils/slugify";

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
          <span className="opacity-50 group-hover:dark:opacity-80 transition-opacity">
            Search for movies...
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md gap-2">
        <DialogHeader>
          <div className="flex flex-row items-center px-3">
            <Search className="w-4 h-4 shrink-0 opacity-50" />
            <input
              type="text"
              placeholder="Start typing to search for movies..."
              onChange={(e) => handleSearchChange(e.target.value)}
              maxLength={50}
              className="flex w-full px-3 py-1 text-sm bg-white dark:bg-slate-950 placeholder:text-slate-500  dark:placeholder:text-slate-400 outline-none"
            />
          </div>
        </DialogHeader>
        <Separator />
        <div className="flex flex-col w-full h-60 overflow-y-auto overflow-x-hidden gap-1">
          {data?.results.map((movie) => (
            <DialogClose key={movie.id} asChild>
              <Link
                href={`/movie/${movie.id}-${slugify(movie.title)}`}
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
