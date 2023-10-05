"use client";

import { useAverageRating } from "@/hooks/use-rating";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";
import RatingWrapper from "./rating-wrapper";

type AverageRatingProps = {
  movieId: string;
};

export default function AverageRating({ movieId }: AverageRatingProps) {
  const { query } = useAverageRating(movieId);
  const title = "average rating";

  if (query.isLoading || query.data === undefined)
    return (
      <RatingWrapper title={title}>
        <Skeleton className="w-32 h-10" />
      </RatingWrapper>
    );

  const rating = query.data?.average_rating?.toFixed(1) ?? null;
  return (
    <RatingWrapper title={title}>
      <Button
        variant="outline"
        className="w-32 h-10 flex flex-row space-x-3 cursor-default"
      >
        <Star
          fill="currentColor"
          className="w-6 h-6 self-center text-slate-300"
        />
        <div className="text-lg self-center">
          <span className="font-bold">{rating ?? "-"}</span>/10
        </div>
      </Button>
    </RatingWrapper>
  );
}
