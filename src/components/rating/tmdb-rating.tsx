import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { RatingWrapper } from './rating-wrapper'

type TMDBRatingProps = {
  tmdbId: number
  rating: { mean: number; count: number }
}
export const TMDBRating = ({ tmdbId, rating }: TMDBRatingProps) => {
  return (
    <RatingWrapper title="TMDB rating">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button asChild variant="outline" className="flex h-10 min-w-40 flex-row space-x-3">
              <a
                href={`https://www.themoviedb.org/movie/${tmdbId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src="/tmdb.svg" alt="TMDB Rating" height={18} width={41} />
                <div className="self-center text-lg tracking-wider text-black dark:text-white">
                  <span className="font-bold">{rating.mean.toFixed(1)}</span>
                  /10
                </div>
              </a>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{`${rating.count} vote${rating.count !== 1 ? 's' : ''}`}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </RatingWrapper>
  )
}
