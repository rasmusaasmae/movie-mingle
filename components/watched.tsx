'use client'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { deleteWatched, getWatched, setWatched } from '@/actions'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Calendar } from '@/components/ui/calendar'
import { CalendarIcon } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/tailwind'
import { format } from 'date-fns'
import { useSession } from '@/lib/auth-client'
import { useState } from 'react'

export const Watched = ({ imdbId }: { imdbId: string }) => {
  const [open, setOpen] = useState(false)
  const session = useSession()
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['watched', imdbId],
    queryFn: () => getWatched({ imdbId }),
    enabled: !!session.data,
  })

  const mutation = useMutation({
    mutationFn: async ({ date }: { date?: Date }) => {
      if (date === undefined) return deleteWatched({ imdbId })
      return setWatched({ imdbId, date })
    },
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: ['watched', imdbId],
      })
    },
  })

  const isLoading = session.isPending || query.isLoading
  const isAuthenticated = !!session.data

  const date = mutation.isPending
    ? mutation.variables.date
    : query.data?.date
      ? new Date(query.data.date)
      : undefined

  const buttonContent = (() => {
    if (isLoading) return <div className="w-23" />
    if (!isAuthenticated) return <span>Not signed in</span>
    if (query.isError) return <span>Error occurred</span>
    return (
      <div className="flex min-w-23 justify-end">
        <span className="font-bold">{date ? format(date, 'dd / MM / yyyy') : 'Pick a date'}</span>
      </div>
    )
  })()

  return (
    <div className="flex flex-col items-center space-y-1">
      <Label className="text-sm text-muted-foreground uppercase">watched</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          disabled={!isAuthenticated}
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'mb-0 flex h-10 min-w-40 gap-4',
            isLoading && 'animate-pulse',
          )}
        >
          <CalendarIcon className="size-5" />
          {buttonContent}
        </PopoverTrigger>
        <PopoverContent>
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
