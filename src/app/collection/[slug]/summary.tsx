import Image from "next/image";

import {
  TMDB_IMAGE_BASE_URL,
  TMDB_IMAGE_SIZE_BACKDROP_ORIGINAL,
  TMDB_IMAGE_SIZE_POSTER_ORIGINAL,
} from "@/lib/tmdb/constants";
import { type TmdbCollection } from "@/lib/tmdb/schemas";

type Props = {
  collection: TmdbCollection;
};

export default async function Summary({ collection }: Props) {
  const { id, name, overview, backdrop_path, poster_path } = collection;
  return (
    <section className="relative flex w-full flex-col items-center overflow-hidden bg-slate-950 p-6 text-white">
      <Image
        alt={`Backdrop of ${name}`}
        src={`${TMDB_IMAGE_BASE_URL}/${TMDB_IMAGE_SIZE_BACKDROP_ORIGINAL}/${backdrop_path}`}
        fill
        className="pointer-events-none aspect-video h-full object-cover object-[50%_20%] opacity-25"
      />
      <div className="z-10 flex w-full max-w-7xl flex-col items-center gap-10 sm:flex-row sm:items-start">
        <div className="relative aspect-[2/3] w-full max-w-[18rem] overflow-hidden rounded-md">
          <Image
            src={`${TMDB_IMAGE_BASE_URL}/${TMDB_IMAGE_SIZE_POSTER_ORIGINAL}/${poster_path}`}
            alt={`Poster of ${name}`}
            fill
            className="object-contain"
          />
        </div>
        <section className="flex w-full flex-col gap-2 pt-10">
          <div className="flex flex-row items-center gap-4">
            <h1 className="text-3xl font-bold">{name}</h1>
          </div>
          <section className="space-y-1">
            <h2 className="text-lg font-semibold">Overview</h2>
            <p className="text-sm">{overview}</p>
          </section>
        </section>
      </div>
    </section>
  );
}
