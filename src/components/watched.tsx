'use client'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { deleteWatched, getWatched, setWatched } from '@/actions'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { CalendarIcon } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { format } from 'date-fns'
import { useSession } from '@/auth/client'

export const Watched = ({ imdbId }: { imdbId: string }) => {
  const { data: session } = useSession()

  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['watched', imdbId],
    queryFn: () => getWatched({ imdbId }),
    enabled: !!session,
  })

  const mutation = useMutation({
    mutationFn: async ({ date }: { date?: Date }) => {
      if (!date) return deleteWatched({ imdbId })
      return setWatched({ imdbId, date })
    },
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: ['watched', imdbId],
      })
    },
  })

  if (query.isLoading)
    return (
      <div className="flex flex-col items-center space-y-1">
        <h4 className="text-sm uppercase">watched</h4>
        <Skeleton className="h-10 w-40" />
      </div>
    )

  const date = mutation.isPending
    ? mutation.variables.date
    : query.isSuccess && query.data?.date
      ? new Date(query.data.date)
      : undefined

  return (
    <div className="flex flex-col items-center gap-1">
      <Label htmlFor="watched" className="text-sm text-muted-foreground uppercase">
        watched
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="watched"
            variant="outline"
            disabled={!session || query.isLoading}
            className="h-10 min-w-40 cursor-pointer flex-row items-center justify-around font-normal"
          >
            <CalendarIcon />
            {!session
              ? 'Not signed in '
              : query.isError
                ? 'Error occurred'
                : date
                  ? format(date, 'dd / MM / yyyy')
                  : 'Pick a date'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => mutation.mutate({ date })}
            captionLayout="dropdown"
            weekStartsOn={1}
            autoFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
