import { RedirectType, redirect } from "next/navigation";

import { fetchMovie } from "@/lib/tmdb";
import { getMovieUrl } from "@/utils/url";
import { slugifyUrl } from "@/utils/slugify";
import { Separator } from "@/components/ui/separator";

import Summary from "./summary";
import Collection from "./collection";
import Recommendations from "./recommendations";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const tmdb_id = params.slug.split("-")[0];
  const movie = await fetchMovie(tmdb_id);
  const year = movie.release_date.split("-")[0];
  return {
    title: `${movie.title} (${year}) - Movie Mingle`,
    description: `${movie.overview.slice(0, 150)}`,
    keywords: ["Movie Mingle", movie.title, year],
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const tmdb_id = params.slug.split("-")[0];
  const movie = await fetchMovie(tmdb_id);

  // Self-heal URL
  const correctSlug = `${movie.id}-${slugifyUrl(movie.title)}`;
  if (correctSlug !== params.slug) {
    const redirectUrl = getMovieUrl(movie.id, movie.title);
    redirect(redirectUrl, RedirectType.replace);
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
