import { ImageIcon } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { getPosterImageUrl } from "@/utils/url";

type PosterImageProps = React.HTMLProps<HTMLDivElement> & {
  title: string;
  poster_path: string | null;
};

export default function PosterImage(props: PosterImageProps) {
  const { title, poster_path, className, ...rest } = props;

  const alt = `Poster of ${title}`;
  const src = getPosterImageUrl(poster_path);

  return (
    <div className={cn("relative aspect-[2/3] h-64", className)} {...rest}>
      {poster_path !== null ? (
        <Image alt={alt} src={src} fill className="object-cover" />
      ) : (
        <div className="grid h-full w-full place-items-center">
          <ImageIcon className="h-8 w-8 opacity-50" />
        </div>
      )}
    </div>
  );
}
