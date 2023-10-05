"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "../ui/input";
import { useState } from "react";
import { Movie } from "@/lib/supabase/movies/types";

export function getColumns(
  isLoading: boolean = false,
  query: string | undefined,
  setQuery: (query: string | undefined) => void,
) {
  const columns: ColumnDef<Movie>[] = [
    {
      accessorKey: "title",
      header: () => {
        return <Search query={query} setQuery={setQuery} />;
      },
      cell: (props) => {
        if (isLoading) return <Skeleton className="w-96 h-5" />;
        const title = props.getValue() as string;
        return <h5 className="w-96 truncate">{title}</h5>;
      },
    },
    {
      accessorKey: "year",
      enableSorting: true,
      header: ({ column }) => {
        const isSorted = column.getIsSorted();
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(isSorted !== "desc")}
          >
            Year
            {isSorted === false ? null : isSorted === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : (
              <ArrowDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
      cell: (props) => {
        if (isLoading) return <Skeleton className="w-16 h-5" />;
        const year = props.getValue() as number;
        return <span className="w-16 inline-block truncate">{year}</span>;
      },
    },
    {
      accessorKey: "runtime",
      enableSorting: true,
      header: ({ column }) => {
        const isSorted = column.getIsSorted();
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(isSorted !== "desc")}
          >
            Runtime
            {isSorted === false ? null : isSorted === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : (
              <ArrowDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
      cell: (props) => {
        if (isLoading) return <Skeleton className="w-16 h-5" />;
        const runtime = props.getValue() as number;
        const hours = Math.floor(runtime / 60);
        const minutes = runtime - 60 * hours;
        return (
          <span className="w-16 inline-block truncate">{`${hours}h ${minutes}m`}</span>
        );
      },
    },
    {
      accessorKey: "average_rating",
      enableSorting: true,
      header: ({ column }) => {
        const isSorted = column.getIsSorted();
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(isSorted !== "desc")}
          >
            Avg Rating
            {isSorted === false ? null : isSorted === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : (
              <ArrowDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
    },
    {
      accessorKey: "imdb_rating",
      enableSorting: true,
      header: ({ column }) => {
        const isSorted = column.getIsSorted();
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(isSorted !== "desc")}
          >
            IMDb Rating
            {isSorted === false ? null : isSorted === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : (
              <ArrowDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
    },
    {
      accessorKey: "user_rating",
      enableSorting: true,
      header: ({ column }) => {
        const isSorted = column.getIsSorted();
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(isSorted !== "desc")}
          >
            Your Rating
            {isSorted === false ? null : isSorted === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : (
              <ArrowDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
    },
  ];
  return columns;
}

function Search({
  query,
  setQuery,
}: {
  query: string | undefined;
  setQuery: (query: string | undefined) => void;
}) {
  const [searchValue, setSearchValue] = useState<string | undefined>(query);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setQuery(searchValue);
      }}
    >
      <Input
        name="query"
        type="search"
        placeholder="Search movie title"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        autoFocus
      />
    </form>
  );
}
