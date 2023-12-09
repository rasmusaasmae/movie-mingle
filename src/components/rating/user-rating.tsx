"use client";

import { cn } from "@/utils/shadcn";
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
import { useAuth } from "@/providers/auth";

type UserRatingProps = {
  imdbId: string;
  movieTitle: string;
};

export default function UserRating({ imdbId, movieTitle }: UserRatingProps) {
  const { query, mutation } = useUserRating(imdbId);
  const { session } = useAuth();
  const title = "your rating";

  if (session === null) return null;

  if (query.isLoading || query.isError || session === undefined)
    return (
      <RatingWrapper title={title}>
        <Skeleton className="h-10 w-32" />
      </RatingWrapper>
    );

  const userRating = mutation.isPending
    ? mutation.variables.value
    : query.data?.value ?? null;

  function handleRatingUpdate(rating: number | null) {
    mutation.mutate({ imdbId, value: rating });
  }

  return (
    <RatingWrapper title={title}>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="flex h-10 w-32 flex-row space-x-3"
          >
            <Star
              fill="currentColor"
              className="h-6 w-6 self-center text-blue-400 dark:text-blue-300"
            />
            <div className="self-center text-lg tracking-wider text-black dark:text-white">
              <span className="font-bold">{userRating?.toFixed(1) ?? "-"}</span>
              /10
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
              rating={userRating}
              onClick={handleRatingUpdate}
            />
            <RateButton
              value={9}
              rating={userRating}
              onClick={handleRatingUpdate}
            />
            <RateButton
              value={8}
              rating={userRating}
              onClick={handleRatingUpdate}
            />
            <RateButton
              value={7}
              rating={userRating}
              onClick={handleRatingUpdate}
            />
            <RateButton
              value={6}
              rating={userRating}
              onClick={handleRatingUpdate}
            />
            <RateButton
              value={5}
              rating={userRating}
              onClick={handleRatingUpdate}
            />
            <RateButton
              value={4}
              rating={userRating}
              onClick={handleRatingUpdate}
            />
            <RateButton
              value={3}
              rating={userRating}
              onClick={handleRatingUpdate}
            />
            <RateButton
              value={2}
              rating={userRating}
              onClick={handleRatingUpdate}
            />
            <RateButton
              value={1}
              rating={userRating}
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
          className="h-6 w-6 self-center text-inherit"
        />
      </button>
    </DialogClose>
  );
}
