import { Star } from "lucide-react";
import { getAverageRating } from "@/lib/supabase/ratings/server";
import RatingWrapper from "./rating-wrapper";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  imdbId: string;
};

export default async function AverageRating({ imdbId }: Props) {
  const averageRating = await getAverageRating(imdbId);
  const title = "average rating";

  return (
    <RatingWrapper title={title}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="outline"
              className="flex h-10 w-32 cursor-default flex-row space-x-3"
            >
              <Star
                fill="currentColor"
                className="h-6 w-6 self-center text-gray-500 dark:text-gray-300"
              />
              <div className="self-center text-lg tracking-wider  text-black dark:text-white">
                <span className="font-bold">
                  {averageRating?.average_rating?.toFixed(1) ?? "-"}
                </span>
                /10
              </div>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{averageRating?.rating_count} votes</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </RatingWrapper>
  );
}
