"use client";

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
import { useUserRating } from "@/hooks/use-rating";
import { useAuth } from "@/providers/auth";
import { cn } from "@/utils/shadcn";

type UserRatingProps = {
  imdbId: string;
  movieTitle: string;
};

export default function UserRating({ imdbId, movieTitle }: UserRatingProps) {
  const { query, mutation } = useUserRating(imdbId);
  const { session } = useAuth();

  if (session === null) return null;

  if (query.isLoading || query.isError || session === undefined)
    return <Skeleton className="h-10 w-32" />;

  const userRating = mutation.isPending
    ? mutation.variables.value
    : query.data?.value ?? null;

  function handleRatingUpdate(rating: number | null) {
    mutation.mutate({ imdbId, value: rating });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex h-10 w-32 flex-row items-center space-x-3"
        >
          <Star
            fill="currentColor"
            className="h-6 w-6 text-blue-400 dark:text-blue-300"
          />
          <div className="text-lg tracking-wider text-black dark:text-white">
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
          {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((v) => (
            <>
              <RightHalfStar
                key={v}
                value={v}
                rating={userRating}
                onClick={handleRatingUpdate}
              />
              <LeftHalfStar
                key={v - 0.5}
                value={v - 0.5}
                rating={userRating}
                onClick={handleRatingUpdate}
              />
            </>
          ))}
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
  );
}

type RateButtonProps = {
  value: number;
  rating: number | null;
  onClick: (value: number) => void;
};

function RightHalfStar({ value, rating, onClick }: RateButtonProps) {
  return (
    <DialogClose asChild>
      <button
        className={cn(
          "relative my-2 mr-[1px] h-6 w-3 overflow-hidden transition-all",
          `${(rating ?? 0) >= value ? "text-blue-400" : ""}`,
          "hover:text-blue-600 [&:hover~*]:text-blue-600",
        )}
        onClick={() => onClick(value)}
        type="submit"
      >
        <Star
          fill="currentColor"
          className="absolute right-0 top-0 h-6 w-6 text-inherit"
        />
      </button>
    </DialogClose>
  );
}
function LeftHalfStar({ value, rating, onClick }: RateButtonProps) {
  return (
    <DialogClose asChild>
      <button
        className={cn(
          "relative my-2 ml-[1px] h-6 w-3 overflow-hidden transition-all",
          `${(rating ?? 0) >= value ? "text-blue-400" : ""}`,
          "hover:text-blue-600 [&:hover~*]:text-blue-600",
        )}
        onClick={() => onClick(value)}
        type="submit"
      >
        <Star
          fill="currentColor"
          className="absolute left-0 top-0 h-6 w-6 text-inherit"
        />
      </button>
    </DialogClose>
  );
}
