import Image from "next/image";
import Link from "next/link";
import { type TmdbMovieDetails } from "@/lib/tmdb/schemas";
import { TMDB_IMAGE_BASE_URL } from "@/lib/tmdb/constants";

type Props = {
  movie: TmdbMovieDetails;
};

export default async function Collection({ movie }: Props) {
  if (movie.belongs_to_collection === null)
    return (
      <section className="w-full max-w-7xl flex flex-col">
        <h2 className="text-2xl font-semibold mb-4">Collection</h2>
        <p>{movie.title} doesn&apos;t seem to be a part of any collections.</p>
      </section>
    );
  return (
    <section className="w-full max-w-7xl flex flex-col">
      <h2 className="text-2xl font-semibold mb-4">Collection</h2>
      <div className="relative w-full h-48 max-w-7xl rounded-md overflow-hidden p-8">
        <Image
          alt={`Backdrop of ${movie.title}`}
          src={`${TMDB_IMAGE_BASE_URL}/${movie.belongs_to_collection.backdrop_path}`}
          fill
          className="h-full object-cover aspect-video opacity-30 dark:opacity-20 pointer-events-none"
        />
        <p className="text-xl">
          Part of the{" "}
          <span className="text-2xl text-black dark:text-white">
            {movie.belongs_to_collection.name}
          </span>
        </p>
        <Link href={`/collection/${movie.belongs_to_collection.id}`}>
          View the collection
        </Link>
      </div>
    </section>
  );
}
