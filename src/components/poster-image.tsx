import Image from "next/image";
import Link from "next/link";

import { ImageIcon } from "lucide-react";

import {
  TMDB_IMAGE_BASE_URL,
  TMDB_IMAGE_SIZE_POSTER_MEDIUM,
} from "@/lib/tmdb/constants";
import { getMovieUrl } from "@/utils/url";

type PosterImageProps = {
  tmdb_id: number;
  title: string;
  poster_path: string | null;
};

export default function PosterImage(props: PosterImageProps) {
  const { tmdb_id, title, poster_path } = props;

  const href = getMovieUrl(tmdb_id, title);
  const alt = `Poster of ${title}`;
  const src = `${TMDB_IMAGE_BASE_URL}/${TMDB_IMAGE_SIZE_POSTER_MEDIUM}/${poster_path}`;

  return (
    <div className="relative h-full aspect-[2/3]">
      <Link href={href}>
        {poster_path === null ? (
          <InvalidPoster />
        ) : (
          <Image alt={alt} src={src} fill className="object-cover" />
        )}
      </Link>
    </div>
  );
}

type InvalidPosterProps = {};

function InvalidPoster(props: InvalidPosterProps) {
  return (
    <div className="w-full h-full grid place-items-center">
      <ImageIcon className="w-8 h-8 opacity-50" />
    </div>
  );
}
