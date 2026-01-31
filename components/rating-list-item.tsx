'use client'

import type { MovieWithUserRating } from '@/db/types'
import { getPosterImageUrl } from '@/lib/tmdb'
import { getMovieUrl } from '@/lib/url'
import { StarIcon, UsersIcon } from 'lucide-react'
import Link from 'next/link'
import { PosterImage } from './poster-image'

type RatingListItemProps = {
  movie: MovieWithUserRating
}

export const RatingListItem = ({ movie }: RatingListItemProps) => {
  const { tmdbId, title, year, posterPath, userRating, voteMean, voteCount } = movie
  const href = getMovieUrl(tmdbId, title)
  const posterUrl = posterPath ? getPosterImageUrl(posterPath, 'small') : undefined

  return (
    <Link href={href} className="block">
      <div className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-muted/50">
        <PosterImage
          title={title ?? undefined}
          posterUrl={posterUrl}
          className="h-16 w-11 flex-shrink-0 rounded"
        />
        <div className="flex flex-1 flex-col gap-1 overflow-hidden">
          <h3 className="truncate font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{year}</p>
        </div>
        <div className="flex flex-shrink-0 items-center gap-6">
          <div className="flex w-16 flex-col items-center">
            <div className="flex items-center gap-1 text-lg font-bold">
              <StarIcon fill="currentColor" className="size-4 text-primary" />
              <span>{userRating.toFixed(1)}</span>
            </div>
          </div>
          <div className="flex w-16 flex-col items-center">
            <div className="flex items-center gap-1 text-lg text-muted-foreground">
              <UsersIcon className="size-4" />
              <span>{voteMean.toFixed(1)}</span>
            </div>
            <span className="text-xs text-muted-foreground">({voteCount})</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
