"use client";

import useMovies from "@/hooks/use-movies";
import { getColumns } from "./columns";
import { DataTable } from "./data-table";
import { type SortingState } from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  type Order,
  type SortBy,
  createSearchParams,
} from "@/app/movies/utils";

type MovieTableProps = {
  query: string | undefined;
  page: number;
  sortBy: SortBy;
  order: Order;
};

export default function MovieTable({
  query,
  page,
  sortBy,
  order,
}: MovieTableProps) {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const {
    data: movies,
    isLoading,
    error,
  } = useMovies(query, 0, page, sortBy, order);

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: sortBy,
      desc: order === "desc",
    },
  ]);

  useEffect(() => {
    if (sorting.length >= 1) {
      const order = sorting[0].desc ? "desc" : "asc";
      const sortBy = sorting[0].id as SortBy;
      const params = createSearchParams(
        searchParams,
        query,
        page,
        sortBy,
        order,
      );
      router.push(pathName + "?" + params.toString());
    }
  }, [page, pathName, query, router, searchParams, sorting]);

  const columns = useMemo(
    () =>
      getColumns(isLoading, query, (query: string | undefined) => {
        const params = createSearchParams(searchParams, query);
        router.replace(pathName + "?" + params.toString());
      }),
    [isLoading, pathName, query, router, searchParams],
  );

  const data = useMemo(
    () => (isLoading ? Array(7).fill({}) : movies!),
    [isLoading, movies],
  );

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={data}
        sorting={sorting}
        setSorting={setSorting}
      />
    </div>
  );
}
