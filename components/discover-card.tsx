'use client'

import { Button, buttonVariants } from './ui/button'
import { CalendarIcon, StarIcon } from 'lucide-react'
import {
  type MovieDetails,
  formatRuntime,
  getBackdropImageUrl,
  getPosterImageUrl,
  getYear,
} from '@/lib/tmdb'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { setRating, setWatched, skipMovie } from '@/actions'
import { Calendar } from './ui/calendar'
import Image from 'next/image'
import Link from 'next/link'
import { PosterImage } from './poster-image'
import { Slider } from './ui/slider'
import { cn } from '@/lib/tailwind'
import { format } from 'date-fns'
import { getMovieUrl } from '@/lib/url'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

const getRatingDescription = (rating: number) => {
  if (rating < 1) return 'Dumpster fire'
  if (rating < 2) return "Wouldn't rewatch even if paid"
  if (rating < 3) return 'Garbage'
  if (rating < 4) return 'Bad'
  if (rating < 5) return 'Meh'
  if (rating < 6) return 'Alright'
  if (rating < 7) return 'Good'
  if (rating < 8) return 'Great'
  if (rating < 9) return 'Goddamn'
  if (rating < 10) return 'One of the best'
  return 'A masterpiece'
}

type Props = {
  movie: MovieDetails
  onAdvance: () => void
}

export const DiscoverCard = ({ movie, onAdvance }: Props) => {
  const [ratingValue, setRatingValue] = useState<number>(5)
  const [watchDate, setWatchDate] = useState<Date | undefined>(undefined)
  const [calendarOpen, setCalendarOpen] = useState(false)

  const imdbId = movie.imdb_id!
  const backdropUrl = movie.backdrop_path ? getBackdropImageUrl(movie.backdrop_path) : null
  const posterUrl = movie.poster_path ? getPosterImageUrl(movie.poster_path, 'original') : null
  const year = getYear(movie.release_date)
  const genres = movie.genres.map((g) => g.name).join(', ')
  const runtime = movie.runtime > 0 ? formatRuntime(movie.runtime) : null

  const rateMutation = useMutation({
    mutationFn: async () => {
      await setRating({ imdbId, rating: ratingValue })
      if (watchDate) {
        await setWatched({ imdbId, date: format(watchDate, 'yyyy-MM-dd') })
      }
    },
    onSuccess: onAdvance,
  })

  const skipMutation = useMutation({
    mutationFn: () => skipMovie({ imdbId }),
    onSuccess: onAdvance,
  })

  const isPending = rateMutation.isPending || skipMutation.isPending

  return (
    <div className="relative w-full max-w-3xl overflow-hidden rounded-xl bg-card shadow-lg">
      {backdropUrl && (
        <Image
          src={backdropUrl}
          alt={`Backdrop of ${movie.title}`}
          fill
          priority
          className="pointer-events-none object-cover object-[50%_20%] opacity-15"
        />
      )}

      <div className="relative z-10 flex flex-col gap-6 p-6">
        {/* Movie info */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <Link
            href={getMovieUrl(movie.id, movie.title)}
            className="mx-auto shrink-0 sm:mx-0"
            tabIndex={-1}
          >
            <div className="relative aspect-2/3 w-40 overflow-hidden rounded-md">
              <PosterImage title={movie.title} posterUrl={posterUrl} className="h-full" />
              {posterUrl && (
                <Image
                  src={posterUrl}
                  alt={`Poster of ${movie.title}`}
                  fill
                  priority
                  className="object-cover"
                />
              )}
            </div>
          </Link>

          <div className="flex min-w-0 flex-col gap-2">
            <Link href={getMovieUrl(movie.id, movie.title)} className="hover:underline">
              <h2 className="text-2xl font-bold">
                {movie.title} <span className="font-normal text-muted-foreground">({year})</span>
              </h2>
            </Link>

            <p className="text-sm text-muted-foreground">
              {[genres, runtime].filter(Boolean).join(' • ')}
            </p>

            {movie.overview && (
              <p className="line-clamp-4 text-sm text-muted-foreground">{movie.overview}</p>
            )}

            <p className="text-sm text-muted-foreground">
              TMDB{' '}
              <span className="font-semibold text-foreground">{movie.vote_average.toFixed(1)}</span>
              /10 <span className="text-xs">({movie.vote_count.toLocaleString()} votes)</span>
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-4 border-t border-border pt-4">
          {/* Rating slider */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-sm font-medium">
                <StarIcon className="size-4 fill-primary text-primary" />
                Your rating
              </span>
              <span className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{ratingValue.toFixed(1)}</span>
                /10 — {getRatingDescription(ratingValue)}
              </span>
            </div>
            <Slider
              value={ratingValue}
              onValueChange={(v) => setRatingValue(v as number)}
              min={0}
              max={10}
              step={0.5}
            />
          </div>

          {/* Watch date + action buttons */}
          <div className="flex items-center gap-3">
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger
                disabled={isPending}
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'gap-2',
                  watchDate ? 'text-foreground' : 'text-muted-foreground',
                )}
              >
                <CalendarIcon className="size-4" />
                {watchDate ? format(watchDate, 'dd / MM / yyyy') : 'Watch date'}
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={watchDate}
                  onSelect={(date) => {
                    setWatchDate(date)
                    setCalendarOpen(false)
                  }}
                  captionLayout="dropdown"
                  weekStartsOn={1}
                  autoFocus
                />
              </PopoverContent>
            </Popover>

            <div className="flex flex-1 justify-end gap-3">
              <Button
                variant="ghost"
                onClick={() => skipMutation.mutate()}
                disabled={isPending}
                className="text-muted-foreground"
              >
                Skip
              </Button>
              <Button onClick={() => rateMutation.mutate()} disabled={isPending}>
                Rate
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
