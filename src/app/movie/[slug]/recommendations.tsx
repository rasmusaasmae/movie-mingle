import {
  TMDB_IMAGE_BASE_URL,
  TMDB_IMAGE_SIZE_POSTER_MEDIUM,
} from "@/lib/tmdb/constants";
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
  if (recommendations === undefined || recommendations.length === 0)
    return (
      <section className="w-full max-w-7xl flex flex-col">
        <h2 className="text-2xl font-semibold mb-4">Similar movies</h2>
        <p>
          We don&apos;t have enough data to suggest movies based on{" "}
          <span className="font-semibold">{movie.title}</span>.
        </p>
      </section>
    );
  return (
    <section className="w-full max-w-7xl flex flex-col">
      <h2 className="text-2xl font-semibold mb-4">Similar movies</h2>
      <div className="w-full h-48 pb-4 flex flex-row gap-3 overflow-x-auto">
        {recommendations.map((m) => (
          <div key={m.id} className="relative group h-full aspect-[2/3]">
            <Link key={m.id} href={`/movie/${m.id}-${slugify(m.title)}`}>
              {m.poster_path ? (
                <Image
                  alt={`Poster of ${m.title}`}
                  src={`${TMDB_IMAGE_BASE_URL}/${TMDB_IMAGE_SIZE_POSTER_MEDIUM}/${m.poster_path}`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full grid place-items-center">
                  <ImageIcon className="w-8 h-8 opacity-50" />
                </div>
              )}
            </Link>
            <h4 className="absolute bottom-2">{m.title}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}
