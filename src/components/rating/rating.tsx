'use client'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { deleteRating, getRating, setRating } from '@/actions'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Fragment } from 'react'
import { RatingWrapper } from './rating-wrapper'
import { Skeleton } from '@/components/ui/skeleton'
import { Star } from 'lucide-react'
import { cn } from '@/lib/tailwind'
import { useSession } from '@/auth/client'

type RatingProps = {
  imdbId: string
  title: string
}

export const Rating = ({ imdbId, title }: RatingProps) => {
  const { data: session } = useSession()

  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['rating', imdbId],
    queryFn: () => getRating({ imdbId }),
    enabled: !!session,
  })

  const mutation = useMutation({
    mutationFn: async ({ rating }: { rating?: number }) => {
      if (!rating) return deleteRating({ imdbId })
      return setRating({ imdbId, rating })
    },
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: ['rating', imdbId],
      })
    },
  })

  const rating = mutation.isPending ? mutation.variables.rating : query.data?.value

  const buttonContent = (() => {
    if (!session) return <span>Not signed in</span>
    if (query.isLoading) return <Skeleton className="h-5 w-16" />
    if (query.isError) return <span>Error occurred</span>
    return (
      <div className="text-lg tracking-wider text-black dark:text-white">
        <span className="font-bold">{rating?.toFixed(1) ?? '-'}</span>/10
      </div>
    )
  })()

  return (
    <RatingWrapper title="your rating">
      <Dialog>
        <DialogTrigger asChild disabled={!session}>
          <Button
            variant="outline"
            className="flex h-10 min-w-40 cursor-pointer flex-row items-center space-x-3"
          >
            <Star fill="currentColor" className="h-6 w-6 text-blue-400 dark:text-blue-300" />
            {buttonContent}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className="group flex flex-row-reverse justify-center">
            {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((value) => (
              <Fragment key={`rating_group_${value}`}>
                <RightHalfStar
                  key={`rating_value_${value}`}
                  value={value}
                  rating={rating}
                  onClick={(value) => mutation.mutate({ rating: value })}
                />
                <LeftHalfStar
                  key={`rating_value_${value - 0.5}`}
                  value={value - 0.5}
                  rating={rating}
                  onClick={(value) => mutation.mutate({ rating: value })}
                />
              </Fragment>
            ))}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" onClick={() => mutation.mutate({ rating: undefined })}>
                Clear rating
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </RatingWrapper>
  )
}

type RateButtonProps = {
  value: number
  rating?: number
  onClick: (value: number) => void
}

function RightHalfStar({ value, rating, onClick }: RateButtonProps) {
  return (
    <DialogClose asChild>
      <button
        className={cn(
          'relative my-2 mr-px h-6 w-3 overflow-hidden transition-all',
          `${(rating ?? 0) >= value ? 'text-blue-400' : ''}`,
          'hover:text-blue-600 [&:hover~*]:text-blue-600',
        )}
        onClick={() => onClick(value)}
        type="submit"
      >
        <Star fill="currentColor" className="absolute top-0 right-0 h-6 w-6 text-inherit" />
      </button>
    </DialogClose>
  )
}
function LeftHalfStar({ value, rating, onClick }: RateButtonProps) {
  return (
    <DialogClose asChild>
      <button
        className={cn(
          'relative my-2 ml-px h-6 w-3 overflow-hidden transition-all',
          `${(rating ?? 0) >= value ? 'text-blue-400' : ''}`,
          'hover:text-blue-600 [&:hover~*]:text-blue-600',
        )}
        onClick={() => onClick(value)}
        type="submit"
      >
        <Star fill="currentColor" className="absolute top-0 left-0 h-6 w-6 text-inherit" />
      </button>
    </DialogClose>
  )
}
