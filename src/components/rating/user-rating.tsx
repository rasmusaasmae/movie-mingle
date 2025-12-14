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
import { Button } from '@/components/ui/button'
import { Fragment } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/auth'
import { useUserRating } from '@/hooks/use-rating'

type UserRatingProps = {
  imdbId: string
  movieTitle: string
}

export default function UserRating({ imdbId, movieTitle }: UserRatingProps) {
  const { query, mutation } = useUserRating(imdbId)
  const { session } = useAuth()

  if (query.isLoading || query.isError || session === undefined)
    return (
      <div className="flex flex-col items-center space-y-1">
        <h4 className="text-sm uppercase">your rating</h4>
        <Skeleton className="h-10 w-40" />
      </div>
    )

  const userRating = mutation.isPending ? mutation.variables.value : (query.data?.value ?? null)

  function setRating(value: number) {
    mutation.mutate({ value })
  }

  function deleteRating() {
    mutation.mutate({ value: null })
  }

  return (
    <div className="flex flex-col items-center space-y-1">
      <h4 className="text-sm uppercase">your rating</h4>
      <Dialog>
        <DialogTrigger asChild disabled={!session}>
          <Button variant="outline" className="flex h-10 min-w-40 flex-row items-center space-x-3">
            <Star fill="currentColor" className="h-6 w-6 text-blue-400 dark:text-blue-300" />
            {!session ? (
              <span>Not signed in</span>
            ) : (
              <div className="text-lg tracking-wider text-black dark:text-white">
                <span className="font-bold">{userRating?.toFixed(1) ?? '-'}</span>
                /10
              </div>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{movieTitle}</DialogTitle>
          </DialogHeader>
          <div className="group flex flex-row-reverse justify-center">
            {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((v) => (
              <Fragment key={`rating_group_${v}`}>
                <RightHalfStar
                  key={`rating_value_${v}`}
                  value={v}
                  rating={userRating}
                  onClick={setRating}
                />
                <LeftHalfStar
                  key={`rating_value_${v - 0.5}`}
                  value={v - 0.5}
                  rating={userRating}
                  onClick={setRating}
                />
              </Fragment>
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
  )
}

type RateButtonProps = {
  value: number
  rating: number | null
  onClick: (value: number) => void
}

function RightHalfStar({ value, rating, onClick }: RateButtonProps) {
  return (
    <DialogClose asChild>
      <button
        className={cn(
          'relative my-2 mr-[1px] h-6 w-3 overflow-hidden transition-all',
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
          'relative my-2 ml-[1px] h-6 w-3 overflow-hidden transition-all',
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
