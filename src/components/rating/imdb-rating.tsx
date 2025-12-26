import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { RatingWrapper } from './rating-wrapper'

type IMDbRatingProps = {
  imdbId: string
  rating: {
    mean: number | null
  }
}

export const IMDbRating = ({ imdbId, rating }: IMDbRatingProps) => {
  const rounded = rating.mean !== null ? rating.mean.toFixed(1) : '-'
  return (
    <RatingWrapper title="IMDb rating">
      <Button asChild variant="outline" className="flex flex-row space-x-3">
        <a href={`https://www.imdb.com/title/${imdbId}`} target="_blank" rel="noopener noreferrer">
          <Image src="/imdb.svg" alt="IMDb Rating" height={18} width={41} />
          <div className="self-center text-lg">
            <span className="font-bold">{rounded}</span>/10
          </div>
        </a>
      </Button>
    </RatingWrapper>
  )
}
