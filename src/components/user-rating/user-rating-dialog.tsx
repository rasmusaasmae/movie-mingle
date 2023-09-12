"use client";
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
import { cn } from "@/lib/shadcn";
import { deleteRating, setRating } from "@/lib/supabase/ratings/action";
import { Star } from "lucide-react";
import { experimental_useOptimistic as useOptimistic } from "react";

type UserRatingProps = {
  rating: number | null;
  movieId: string;
  movieTitle: string;
};

export default function UserRatingDialog({
  rating,
  movieId,
  movieTitle,
}: UserRatingProps) {
  const [optimisticRating, setOptimisticRating] = useOptimistic<number | null>(
    rating,
  );

  async function action(value: number | null) {
    setOptimisticRating(value);
    if (value !== null) await setRating(movieId, value);
    else await deleteRating(movieId);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex flex-row space-x-3">
          <Star
            fill="currentColor"
            className="w-6 h-6 self-center text-blue-300"
          />
          <div className="text-lg self-center">
            <span className="font-bold">{optimisticRating ?? "-"}</span>/10
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{movieTitle}</DialogTitle>
        </DialogHeader>
        <div className="group flex flex-row-reverse justify-center">
          <RateButton value={10} rating={optimisticRating} action={action} />
          <RateButton value={9} rating={optimisticRating} action={action} />
          <RateButton value={8} rating={optimisticRating} action={action} />
          <RateButton value={7} rating={optimisticRating} action={action} />
          <RateButton value={6} rating={optimisticRating} action={action} />
          <RateButton value={5} rating={optimisticRating} action={action} />
          <RateButton value={4} rating={optimisticRating} action={action} />
          <RateButton value={3} rating={optimisticRating} action={action} />
          <RateButton value={2} rating={optimisticRating} action={action} />
          <RateButton value={1} rating={optimisticRating} action={action} />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" onClick={() => action(null)}>
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
  action: (value: number) => void;
};

function RateButton({ value, rating, action }: RateButtonProps) {
  return (
    <DialogClose asChild>
      <button
        className={cn(
          "px-1 py-2 transition-all",
          `${(rating ?? 0) >= value ? "text-blue-400" : ""}`,
          "hover:text-blue-600 [&:hover~*]:text-blue-600",
        )}
        onClick={() => action(value)}
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
