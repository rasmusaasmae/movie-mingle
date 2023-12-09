import Image from "next/image";
import Link from "next/link";

import { ImageIcon } from "lucide-react";
import { getMovieUrl, getPosterImageUrl } from "@/utils/url";

type PosterImageProps = {
  tmdb_id: number;
  title: string;
  poster_path: string | null;
};

export default function PosterImage(props: PosterImageProps) {
  const { tmdb_id, title, poster_path } = props;

  const alt = `Poster of ${title}`;
  const href = getMovieUrl(tmdb_id, title);
  const src = getPosterImageUrl(poster_path);

  return (
    <div className="relative aspect-[2/3] h-full">
      <Link href={href}>
        {poster_path !== null ? (
          <Image alt={alt} src={src} fill className="object-cover" />
        ) : (
          <div className="grid h-full w-full place-items-center">
            <ImageIcon className="h-8 w-8 opacity-50" />
          </div>
        )}
      </Link>
    </div>
  );
}
