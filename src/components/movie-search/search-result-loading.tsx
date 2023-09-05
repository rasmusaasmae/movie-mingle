import { Skeleton } from "@/components/ui/skeleton";

interface Props {}

export default function SearchResultLoading({}: Props) {
  return (
    <div className="grid grid-cols-4 grid-rows-1 w-full rounded-md overflow-hidden hover:bg-black/5 dark:hover:bg-white/5 border border-slate-300 dark:border-slate-600">
      <Skeleton className="h-full aspect-[2/3] rounded-none border-r border-slate-300 dark:border-slate-600" />
      <div className="col-span-3 h-full p-3 space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="w-12 h-4" />
        <div className="flex flex-row space-x-2 items-center">
          <Skeleton className="w-12 h-6" />
          <Skeleton className="w-6 h-5" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}
