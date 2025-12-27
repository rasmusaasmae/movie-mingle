'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { deleteRating, getRating, setRating } from '@/actions'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { RatingWrapper } from './rating-wrapper'
import { Slider } from '@/components/ui/slider'
import { StarIcon } from 'lucide-react'
import { cn } from '@/lib/tailwind'
import { useSession } from '@/lib/auth-client'
import { useState } from 'react'

type RatingProps = {
  imdbId: string
}

const getRatingDescription = (rating?: number) => {
  if (rating === undefined) return 'Not rated'
  else if (rating < 1) return 'Dumpster fire'
  else if (rating < 2) return "Wouldn't rewatch even if paid"
  else if (rating < 3) return 'Garbage'
  else if (rating < 4) return 'Bad'
  else if (rating < 5) return 'Meh'
  else if (rating < 6) return 'Alright'
  else if (rating < 7) return 'Good'
  else if (rating < 8) return 'Great'
  else if (rating < 9) return 'Goddamn'
  else if (rating < 10) return 'One of the best'
  else if (rating === 10) return 'A masterpiece'
  else return 'Unknown'
}

export const Rating = ({ imdbId }: RatingProps) => {
  const [open, setOpen] = useState(false)
  const session = useSession()
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['rating', imdbId],
    queryFn: () => getRating({ imdbId }),
    enabled: !!session.data,
  })

  const mutation = useMutation({
    mutationFn: async ({ rating }: { rating?: number }) => {
      if (rating === undefined) return deleteRating({ imdbId })
      return setRating({ imdbId, rating })
    },
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: ['rating', imdbId],
      })
    },
  })

  const isLoading = session.isPending || query.isLoading
  const isAuthenticated = !!session.data

  const currentRating = mutation.isPending ? mutation.variables.rating : query.data?.value
  const rounded = currentRating?.toFixed(1) ?? '-'

  const buttonContent = (() => {
    if (isLoading) return <div className="w-16" />
    if (!isAuthenticated) return <span>Not signed in</span>
    if (query.isError) return <span>Error occurred</span>
    return (
      <div className="flex w-16 justify-end text-lg tracking-wider">
        <span className="font-bold">{rounded}</span>/10
      </div>
    )
  })()

  return (
    <RatingWrapper title="your rating">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          disabled={!isAuthenticated}
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'mb-0 flex h-10 min-w-40 gap-4',
            isLoading && 'animate-pulse',
          )}
        >
          <StarIcon fill="currentColor" className="size-5 text-primary" />
          {buttonContent}
        </PopoverTrigger>
        <PopoverContent className="pt-6">
          <span>{getRatingDescription(currentRating)}</span>
          <Slider
            value={currentRating ?? 0}
            onValueChange={(value) => mutation.mutate({ rating: value as number })}
            min={0}
            max={10}
            step={0.5}
          />
          <div className="flex justify-start">
            <Button
              variant="destructive"
              onClick={() => {
                mutation.mutate({ rating: undefined })
                setOpen(false)
              }}
            >
              Clear rating
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </RatingWrapper>
  )
}
