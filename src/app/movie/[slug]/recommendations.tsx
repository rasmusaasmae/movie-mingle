import { getImageFullPath } from "@/lib/tmdb";
import { type TmdbMovieDetails } from "@/lib/tmdb/schemas";
import slugify from "@/utils/slugify";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  movie: TmdbMovieDetails;
};

export default async function Recommendations({ movie }: Props) {
  const recommendations = movie.recommendations?.results;

  if (recommendations === undefined)
    return (
      <section className="w-full max-w-7xl flex flex-col">
        <h2 className="text-2xl font-semibold mb-4">Similar movies</h2>
        <p>
          We don&apos;t have enough data to suggest movies based on{" "}
          {movie.title}.
        </p>
      </section>
    );
  return (
    <section className="w-full max-w-7xl flex flex-col">
      <h2 className="text-2xl font-semibold mb-4">Similar movies</h2>
      <div className="w-full h-48 pb-4 flex flex-row gap-3 overflow-x-auto">
        {recommendations.map((m) => (
          <div key={m.id} className="relative h-full aspect-[2/3]">
            <Link key={m.id} href={`/movie/${m.id}-${slugify(m.title)}`}>
              {m.poster_path ? (
                <Image
                  alt={`Poster of ${m.title}`}
                  src={getImageFullPath(m.poster_path)}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full grid place-items-center">
                  <ImageIcon className="w-8 h-8 opacity-50" />
                </div>
              )}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
