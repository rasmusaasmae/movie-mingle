import { getMovieUrl } from "@/utils/url";
import {
  TMDB_IMAGE_BASE_URL,
  TMDB_IMAGE_SIZE_POSTER_MEDIUM,
} from "@/lib/tmdb/constants";
import Link from "next/link";
import Image from "next/image";
import { ImageIcon } from "lucide-react";

type MovieCardProps = {
  tmdb_id: number;
  title: string;
  poster_path: string | null;
};

export default function MovieCard(props: MovieCardProps) {
  const { tmdb_id, title, poster_path } = props;

  const href = getMovieUrl(tmdb_id, title);
  const alt = `Poster of ${title}`;
  const src = `${TMDB_IMAGE_BASE_URL}/${TMDB_IMAGE_SIZE_POSTER_MEDIUM}/${poster_path}`;

  return (
    <div className="relative aspect-[2/3] h-full">
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
    <div className="grid h-full w-full place-items-center">
      <ImageIcon className="h-8 w-8 opacity-50" />
    </div>
  );
}
