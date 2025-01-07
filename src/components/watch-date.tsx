"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/auth";
import { useWatchDate } from "@/hooks/use-watch-date";
import { cn } from "@/lib/utils";

type WatchDateProps = {
  imdbId: string;
};

export default function WatchDate(props: WatchDateProps) {
  const { imdbId } = props;
  const { query, mutation } = useWatchDate(imdbId);

  const { session } = useAuth();

  if (query.isLoading || query.isError || session === undefined)
    return (
      <div className="flex flex-col items-center space-y-1">
        <h4 className="text-sm uppercase">watched</h4>
        <Skeleton className="h-10 w-40" />
      </div>
    );

  const date = mutation.isPending
    ? mutation.variables.date
    : query.data?.date
      ? new Date(query.data.date)
      : undefined;

  function setDate(date?: Date) {
    mutation.mutate({ date });
  }

  return (
    <div className="flex flex-col items-center space-y-1">
      <h4 className="text-sm uppercase">watched</h4>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            disabled={!session || query.isLoading}
            className={cn(
              "h-10 min-w-40 justify-center text-left font-normal",
              (!session || !date) && "text-muted-foreground",
            )}
          >
            <CalendarIcon />
            {!session ? (
              <span>Not signed in </span>
            ) : date ? (
              format(date, "dd / MM / yyyy")
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            weekStartsOn={1}
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
