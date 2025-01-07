import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type AverageRatingProps = {
  rating: {
    mean: number;
    count: number;
  } | null;
};

export function AverageRating(props: AverageRatingProps) {
  const { rating } = props;
  const rounded = rating !== null ? rating.mean.toFixed(1) : "-";
  const count = rating?.count ?? 0;

  return (
    <div className="flex flex-col items-center space-y-1">
      <h4 className="text-sm uppercase">average rating</h4>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="flex h-10 min-w-36 cursor-default flex-row items-center space-x-3"
            >
              <Star
                fill="currentColor"
                className="h-6 w-6 text-slate-500 dark:text-slate-300"
              />
              <div className="text-lg tracking-wider text-black dark:text-white">
                <span className="font-bold">{rounded}</span>
                /10
              </div>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{`${count} vote${count !== 1 ? "s" : ""}`}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export function AverageRatingCircle(props: AverageRatingProps) {
  const { rating } = props;
  const percentage = rating !== null ? (rating.mean * 10).toFixed(0) : "-";
  const count = rating?.count ?? 0;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`grid h-10 w-10 place-items-center rounded-full border border-slate-200 ${
              rating === null
                ? "bg-slate-700"
                : rating.mean >= 8
                  ? "bg-purple-500"
                  : rating.mean >= 6
                    ? "bg-green-500"
                    : rating.mean > 4
                      ? "bg-yellow-400"
                      : "bg-red-500"
            } dark:border-slate-800 dark:to-slate-700`}
          >
            <div className="grid h-8 w-8 place-items-center rounded-full bg-white dark:bg-slate-950">
              <span className="text-md font-bold tracking-wider">
                {percentage}
              </span>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{`${count} vote${count !== 1 ? "s" : ""}`}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
