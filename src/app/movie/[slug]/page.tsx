import { RedirectType, redirect } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { fetchMovie } from "@/utils/tmdb";
import { getMovieUrl } from "@/utils/url";

import Collection from "./_components/collection";
import Recommendations from "./_components/recommendations";
import Summary from "./_components/summary";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tmdb_id = slug.split("-")[0];
  const movie = await fetchMovie(tmdb_id);
  const year = movie.release_date.split("-")[0];
  return {
    title: `${movie.title} (${year}) - Movie Mingle`,
    description: `${movie.overview.slice(0, 150)}`,
    keywords: ["Movie Mingle", movie.title, year],
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const tmdb_id = slug.split("-")[0];
  const movie = await fetchMovie(tmdb_id);

  // Self-heal URL
  const correctUrl = getMovieUrl(movie.id, movie.title);
  if (slug !== correctUrl.split("/").pop()) {
    redirect(correctUrl, RedirectType.replace);
  }

  return (
    <main className="flex min-h-[calc(100vh-56px)] w-full flex-col items-center gap-6 pb-8">
      <Summary movie={movie} />
      <div className="flex w-full flex-col items-center gap-4 px-6">
        <Collection collection={movie.belongs_to_collection} />
        {!!movie.belongs_to_collection && <Separator />}
        <Recommendations movie={movie} />
      </div>
    </main>
  );
}
