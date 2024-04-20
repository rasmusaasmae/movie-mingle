import _ from "lodash";
import { RedirectType, redirect } from "next/navigation";

import { MovieCard } from "@/components/movie-card";
import { fetchCollection } from "@/utils/tmdb";
import { getCollectionUrl } from "@/utils/url";

import Summary from "./_components/summary";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const tmdb_id = params.slug.split("-")[0];
  const collection = await fetchCollection(tmdb_id);
  return {
    title: `${collection.name.trim()} - Movie Mingle`,
    description: `${collection.overview.slice(0, 150).trim()}`,
    keywords: ["Movie Mingle", collection.name.trim()],
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const tmdb_id = params.slug.split("-")[0];
  const collection = await fetchCollection(tmdb_id);
  const { id, name, parts } = collection;
  const sorted_parts = _.orderBy(
    parts,
    function (t) {
      let date = new Date(t.release_date).getTime();
      return date;
    },
    ["asc"],
  );

  // Self-heal URL
  const correctUrl = getCollectionUrl(id, name);
  if (params.slug !== correctUrl.split("/").pop()) {
    redirect(correctUrl, RedirectType.replace);
  }

  return (
    <main className="flex min-h-[calc(100vh-56px)] w-full flex-col items-center gap-6 pb-8">
      <Summary collection={collection} />
      <div className="w-full max-w-7xl">
        <div className="relative mb-4 w-full">
          <div className="flex w-full flex-row space-x-4 overflow-x-auto pb-5">
            {sorted_parts.map((part) => (
              <MovieCard key={part.id} movie={part} />
            ))}
          </div>
          <div className="absolute bottom-5 right-0 top-0 w-24 bg-gradient-to-l from-transparent to-transparent dark:from-slate-950" />
        </div>
      </div>
    </main>
  );
}
