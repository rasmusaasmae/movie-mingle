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
              className="w-32 h-10 flex flex-row space-x-3 cursor-default"
            >
              <Star
                fill="currentColor"
                className="w-6 h-6 self-center text-slate-500 dark:text-slate-300"
              />
              <div className="text-lg tracking-wider self-center  text-black dark:text-white">
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
