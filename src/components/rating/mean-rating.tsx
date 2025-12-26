import { Button } from '@/components/ui/button'
import MovieRatingDistribution from '../movie-rating-distribution'
import { Star } from 'lucide-react'

type MeanRatingProps = {
  imdbId: string
  rating: {
    mean: number | null
  } | null
}
export const MeanRating = ({ imdbId, rating }: MeanRatingProps) => {
  const rounded = rating && rating.mean !== null ? rating.mean.toFixed(1) : '-'

  return (
    <div className="flex flex-col items-center space-y-1">
      <h4 className="text-sm uppercase">average rating</h4>
      <MovieRatingDistribution imdbId={imdbId}>
        <Button variant="outline" className="flex h-10 min-w-40 flex-row items-center space-x-3">
          <Star fill="currentColor" className="h-6 w-6 text-slate-500 dark:text-slate-300" />
          <div className="text-lg tracking-wider text-black dark:text-white">
            <span className="font-bold">{rounded}</span>
            /10
          </div>
        </Button>
      </MovieRatingDistribution>
    </div>
  )
}
