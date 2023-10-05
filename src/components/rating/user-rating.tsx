"use client";

import { cn } from "@/lib/shadcn";
import { useUserRating } from "@/hooks/use-rating";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import RatingWrapper from "./rating-wrapper";

type UserRatingProps = {
  movieId: string;
  movieTitle: string;
};

export default function UserRating({ movieId, movieTitle }: UserRatingProps) {
  const { query, mutation } = useUserRating(movieId);
  const title = "your rating";

  if (query.isLoading || query.data === undefined)
    return (
      <RatingWrapper title={title}>
        <Skeleton className="w-28 h-10" />
      </RatingWrapper>
    );

  if (query.data === null) return null;

  const rating = query.data?.rating ?? null;

  function handleRatingUpdate(rating: number | null) {
    mutation.mutate({ movieId, rating });
  }

  return (
    <RatingWrapper title={title}>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-28 h-10 flex flex-row space-x-3"
          >
            <Star
              fill="currentColor"
              className="w-6 h-6 self-center text-blue-300"
            />
            <div className="text-lg self-center">
              <span className="font-bold">{rating ?? "-"}</span>/10
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{movieTitle}</DialogTitle>
          </DialogHeader>
          <div className="group flex flex-row-reverse justify-center">
            <RateButton
              value={10}
              rating={rating}
              onClick={handleRatingUpdate}
            />
            <RateButton
              value={9}
              rating={rating}
              onClick={handleRatingUpdate}
            />
            <RateButton
              value={8}
              rating={rating}
              onClick={handleRatingUpdate}
            />
            <RateButton
              value={7}
              rating={rating}
              onClick={handleRatingUpdate}
            />
            <RateButton
              value={6}
              rating={rating}
              onClick={handleRatingUpdate}
            />
            <RateButton
              value={5}
              rating={rating}
              onClick={handleRatingUpdate}
            />
            <RateButton
              value={4}
              rating={rating}
              onClick={handleRatingUpdate}
            />
            <RateButton
              value={3}
              rating={rating}
              onClick={handleRatingUpdate}
            />
            <RateButton
              value={2}
              rating={rating}
              onClick={handleRatingUpdate}
            />
            <RateButton
              value={1}
              rating={rating}
              onClick={handleRatingUpdate}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" onClick={() => handleRatingUpdate(null)}>
                Clear rating
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </RatingWrapper>
  );
}

type RateButtonProps = {
  value: number;
  rating: number | null;
  onClick: (value: number) => void;
};

function RateButton({ value, rating, onClick }: RateButtonProps) {
  return (
    <DialogClose asChild>
      <button
        className={cn(
          "px-1 py-2 transition-all",
          `${(rating ?? 0) >= value ? "text-blue-400" : ""}`,
          "hover:text-blue-600 [&:hover~*]:text-blue-600",
        )}
        onClick={() => onClick(value)}
        type="submit"
      >
        <Star
          fill="currentColor"
          className="w-6 h-6 self-center text-inherit"
        />
      </button>
    </DialogClose>
  );
}
