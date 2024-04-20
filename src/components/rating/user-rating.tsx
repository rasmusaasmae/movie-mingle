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
import { useAuth } from "@/contexts/auth";
import { useUserRating } from "@/hooks/use-rating";
import { cn } from "@/lib/utils";

type UserRatingProps = {
  imdbId: string;
  movieTitle: string;
};

export default function UserRating({ imdbId, movieTitle }: UserRatingProps) {
  const { query, mutation } = useUserRating(imdbId);
  const { session } = useAuth();

  if (session === null) return null;

  if (query.isLoading || query.isError || session === undefined)
    return (
      <div className="flex flex-col items-center space-y-1">
        <h4 className="text-sm uppercase">your rating</h4>
        <Skeleton className="h-10 w-32" />
      </div>
    );

  const userRating = mutation.isPending
    ? mutation.variables?.value ?? null
    : query.data?.value ?? null;

  function setRating(value: number) {
    mutation.mutate({
      imdb_id: imdbId,
      value,
      created_at: query.data?.created_at ?? "",
      updated_at: query.data?.updated_at ?? "",
    });
  }

  function deleteRating() {
    mutation.mutate(null);
  }

  return (
    <div className="flex flex-col items-center space-y-1">
      <h4 className="text-sm uppercase">your rating</h4>
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
                  onClick={setRating}
                />
                <LeftHalfStar
                  key={v - 0.5}
                  value={v - 0.5}
                  rating={userRating}
                  onClick={setRating}
                />
              </>
            ))}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" onClick={deleteRating}>
                Clear rating
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
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
