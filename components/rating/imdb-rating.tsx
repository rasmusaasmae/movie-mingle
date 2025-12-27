import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import Image from 'next/image'
import { RatingWrapper } from './rating-wrapper'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/tailwind'
import { getImdbMovieUrl } from '@/lib/imdb'

type IMDbRatingProps = {
  imdbId: string
  mean: number | null
  count: number
}

export const IMDbRating = ({ imdbId, mean, count }: IMDbRatingProps) => {
  const title = 'IMDb rating'
  const href = getImdbMovieUrl(imdbId)
  const rounded = mean !== null ? mean.toFixed(1) : '-'
  const countText = `${count} vote${count !== 1 ? 's' : ''}`

  return (
    <RatingWrapper title={title}>
      <Tooltip>
        <TooltipTrigger>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: 'outline' }), 'flex h-10 min-w-40 gap-4')}
          >
            <Image src="/imdb.svg" alt={title} height={18} width={41} />
            <div className="flex w-16 justify-end text-lg tracking-wider">
              <span className="font-bold">{rounded}</span>/10
            </div>
          </a>
        </TooltipTrigger>
        <TooltipContent>{countText}</TooltipContent>
      </Tooltip>
    </RatingWrapper>
  )
}
