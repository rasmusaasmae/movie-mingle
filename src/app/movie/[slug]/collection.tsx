import Image from "next/image";
import Link from "next/link";

import { type TmdbMovieDetails } from "@/lib/tmdb/schemas";
import { getCollectionBackdropImageUrl, getCollectionUrl } from "@/utils/url";

type Props = {
  collection: TmdbMovieDetails["belongs_to_collection"];
};

export default async function Collection({ collection }: Props) {
  if (collection === null) return null;

  const src = getCollectionBackdropImageUrl(collection.backdrop_path);
  const href = getCollectionUrl(collection.id, collection.name);

  return (
    <section className="w-full max-w-7xl flex flex-col">
      <h2 className="text-2xl font-semibold mb-4">Collection</h2>
      <div className="relative w-full h-48 max-w-7xl rounded-md overflow-hidden p-8">
        <Image
          alt={`Backdrop of ${collection.name}`}
          src={src}
          fill
          className="h-full object-cover aspect-video opacity-30 dark:opacity-20 pointer-events-none object-[50%_20%]"
        />
        <p className="text-xl">
          Part of the{" "}
          <span className="text-2xl text-black dark:text-white">
            {collection.name}
          </span>
        </p>
        <Link href={href}>View the collection</Link>
      </div>
    </section>
  );
}
