import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import Image from 'next/image'
import { RatingWrapper } from './rating-wrapper'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/tailwind'
import { getTmdbMovieUrl } from '@/lib/tmdb'

type TMDBRatingProps = {
  tmdbId: number
  mean: number
  count: number
}

export const TMDBRating = ({ tmdbId, mean, count }: TMDBRatingProps) => {
  const title = 'TMDB rating'
  const href = getTmdbMovieUrl(tmdbId)
  const rounded = mean.toFixed(1)
  const countText = `${count} vote${count !== 1 ? 's' : ''}`

  return (
    <RatingWrapper title={title}>
      <Tooltip>
        <TooltipTrigger
          render={
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: 'outline' }), 'flex h-10 min-w-40 gap-4')}
            >
              <Image src="/tmdb.svg" alt={title} height={18} width={41} />
              <div className="flex w-16 justify-end text-lg tracking-wider">
                <span className="font-bold">{rounded}</span>/10
              </div>
            </a>
          }
        />
        <TooltipContent>{countText}</TooltipContent>
      </Tooltip>
    </RatingWrapper>
  )
}
