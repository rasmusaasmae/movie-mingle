import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getAverageRating } from "@/lib/supabase/ratings/server";

type AverageRatingProps = {
  variant?: "small" | "large";
  rating?: {
    mean: number | null;
    count: number;
  };
};

export function AverageRating({
  variant = "large",
  rating,
}: AverageRatingProps) {
  if (rating === undefined) return null;
  if (variant === "small") return <SmallVariant rating={rating} />;
  return <LargeVariant rating={rating} />;
}

type AverageRatingImdbProps = {
  variant?: "small" | "large";
  imdbId: string;
};

export async function AverageRatingImdb({
  variant,
  imdbId,
}: AverageRatingImdbProps) {
  const rating = await getAverageRating(imdbId);
  return <AverageRating variant={variant} rating={rating} />;
}

type SmallVariantProps = {
  rating: {
    mean: number | null;
    count: number;
  };
};
function SmallVariant(props: SmallVariantProps) {
  const { rating } = props;
  const percentage = rating.mean !== null ? (rating.mean * 10).toFixed(0) : "-";
  const count = rating?.count ?? 0;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`grid h-10 w-10 place-items-center rounded-full border border-slate-200 ${
              rating.mean === null
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

type LargeVariantProps = {
  rating: {
    mean: number | null;
    count: number;
  };
};

function LargeVariant(props: LargeVariantProps) {
  const { rating } = props;
  const rounded = rating.mean !== null ? rating.mean.toFixed(1) : "-";
  const count = rating?.count ?? 0;

  return (
    <div className="flex flex-col items-center space-y-1">
      <h4 className="text-sm uppercase">average rating</h4>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="flex h-10 w-32 cursor-default flex-row items-center space-x-3"
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
