import Image from "next/image";
import Link from "next/link";

import { type TmdbMovieDetails } from "@/lib/tmdb/schemas";
import { getBackdropImageUrl, getCollectionUrl } from "@/utils/url";

type Props = {
  collection: TmdbMovieDetails["belongs_to_collection"];
};

export default async function Collection({ collection }: Props) {
  if (collection === null) return null;

  const src = getBackdropImageUrl(collection.backdrop_path);
  const href = getCollectionUrl(collection.id, collection.name);

  return (
    <section className="flex w-full max-w-7xl flex-col">
      <h2 className="mb-4 text-2xl font-semibold">Collection</h2>
      <Link href={href}>
        <div className="relative h-48 w-full max-w-7xl overflow-hidden rounded-md bg-slate-950 p-8">
          <Image
            alt={`Backdrop of ${collection.name}`}
            src={src}
            fill
            className="pointer-events-none aspect-video h-full object-cover object-[50%_20%] opacity-30 dark:opacity-20"
          />
          <p className="text-xl">
            Part of the{" "}
            <span className="text-2xl text-black dark:text-white">
              {collection.name}
            </span>
          </p>
        </div>
      </Link>
    </section>
  );
}
