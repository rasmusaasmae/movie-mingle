import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type TMDBRatingProps = {
  tmdbId: number;
  voteAverage: number;
  voteCount: number;
};

export default async function TMDBRating({
  tmdbId,
  voteAverage,
  voteCount,
}: TMDBRatingProps) {
  return (
    <div className="flex flex-col items-center space-y-1">
      <h4 className="text-sm uppercase">tmdb rating</h4>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              asChild
              variant="outline"
              className="flex h-10 w-32 flex-row space-x-3"
            >
              <Link
                href={`https://www.themoviedb.org/movie/${tmdbId}`}
                target="_blank"
              >
                <Image
                  src="/tmdb.svg"
                  alt="TMDB Rating"
                  height={18}
                  width={41}
                />
                <div className="self-center text-lg tracking-wider text-black dark:text-white">
                  <span className="font-bold">{voteAverage.toFixed(1)}</span>
                  /10
                </div>
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{voteCount} votes</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
