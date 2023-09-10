"use client";

import { HTMLAttributes, useState } from "react";
import { cn } from "@/libs/shadcn";
import useMovies from "@/hooks/use-movies";
import { Input } from "@/components/ui/input";
import SearchResult from "./search-result";
import SearchResultLoading from "./search-result-loading";

interface Props extends HTMLAttributes<HTMLDivElement> {}

export default function MovieSearch({ className, ...rest }: Props) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data: movies, isLoading } = useMovies(searchTerm, 200);

  function handleSearchChange(value: string) {
    setSearchTerm(value);
  }

  return (
    <div
      className={cn("w-full max-w-lg flex flex-col items-center", className)}
      {...rest}
    >
      <Input
        type="text"
        className="w-full px-3 py-2 mb-1"
        placeholder="Search..."
        onChange={(e) => handleSearchChange(e.target.value)}
        maxLength={50}
      />
      <ul className="w-full h-full px-6 overflow-auto space-y-2">
        {movies?.map((movie) => (
          <li key={movie.id} className="first:mt-4">
            <SearchResult movie={movie} />
          </li>
        ))}
        {isLoading && searchTerm !== "" && (
          <>
            <li className="first:mt-4">
              <SearchResultLoading />
            </li>
            <li className="first:mt-4">
              <SearchResultLoading />
            </li>
            <li className="first:mt-4">
              <SearchResultLoading />
            </li>
            <li className="first:mt-4">
              <SearchResultLoading />
            </li>
            <li className="first:mt-4">
              <SearchResultLoading />
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
