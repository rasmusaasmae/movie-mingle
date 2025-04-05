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
import { useGetWatchDate, useSetWatchDate } from "@/hooks/use-watch-date";

type WatchDateProps = {
  imdbId: string;
};

export default function WatchDate(props: WatchDateProps) {
  const { imdbId } = props;
  const query = useGetWatchDate(imdbId);
  const mutation = useSetWatchDate();

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

  return (
    <div className="flex flex-col items-center space-y-1">
      <h4 className="text-sm uppercase">watched</h4>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            disabled={!session || query.isLoading}
            className="flex h-10 min-w-40 cursor-pointer flex-row items-center space-x-3"
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
            selected={date}
            onSelect={(date) => mutation.mutate({ imdbId, date })}
            mode="single"
            weekStartsOn={1}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
