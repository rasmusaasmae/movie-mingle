import { fetchMovie } from "@/lib/tmdb";
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

  return (
    <main className="w-screen min-h-screen pb-8 flex flex-col items-center gap-6">
      <Summary movie={movie} />
      <div className="w-full px-6 gap-4 flex flex-col items-center">
        <Collection movie={movie} />
        <Separator />
        <Recommendations movie={movie} />
      </div>
    </main>
  );
}