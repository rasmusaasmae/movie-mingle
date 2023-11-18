import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import RatingWrapper from "./rating-wrapper";
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
    <RatingWrapper title="TMDB rating">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              asChild
              variant="outline"
              className="w-32 h-10 flex flex-row space-x-3"
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
                <div className="text-lg tracking-wider self-center text-black dark:text-white">
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
    </RatingWrapper>
  );
}
