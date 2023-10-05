import { type Metadata } from "next";
import MovieTable from "@/components/movie-table";
import { parseSearchParams } from "./utils";

export const metadata: Metadata = {
  title: "Movie Mingle",
  description: "Movies",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { query, page, sortBy, order } = parseSearchParams(searchParams);
  return (
    <main className="w-full h-full flex flex-col items-center">
      <div className="flex flex-col w-full max-w-7xl px-1 sm:px-4 mx-auto space-y-4">
        <MovieTable query={query} page={page} sortBy={sortBy} order={order} />
      </div>
    </main>
  );
}
