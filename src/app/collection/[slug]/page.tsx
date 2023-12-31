import { redirect, RedirectType } from "next/navigation";

import { fetchCollection } from "@/lib/tmdb";
import { getCollectionUrl } from "@/utils/url";
import { slugifyUrl } from "@/utils/slugify";

import Summary from "./summary";
import MovieCard from "@/components/movie-card";

import _ from "lodash";

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
    _.sample(["asc", "desc"]),
  );

  // Self-heal URL
  const correctSlug = `${id}-${slugifyUrl(name)}`;
  if (correctSlug !== params.slug) {
    const redirectUrl = getCollectionUrl(id, name);
    redirect(redirectUrl, RedirectType.replace);
  }

  return (
    <main className="flex min-h-[calc(100vh-56px)] w-full flex-col items-center gap-6 pb-8">
      <Summary collection={collection} />
      <div className="w-full max-w-7xl">
        <div className="relative mb-4 w-full">
          <div className="flex w-full flex-row space-x-4 overflow-x-auto">
            {sorted_parts.map((part) => (
              <MovieCard key={part.id} movie={part} />
            ))}
          </div>
          <div className="absolute bottom-0 right-0 top-0 w-24 bg-gradient-to-l from-transparent to-transparent dark:from-slate-950" />
        </div>
      </div>
    </main>
  );
}
