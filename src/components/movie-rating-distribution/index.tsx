import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import MovieRatingDistributionChart from './movie-rating-distribution-chart'
import { getMovieRatingDistribution } from '@/db/queries'

type MovieRatingDistributionProps = {
  imdbId: string
  children: React.ReactNode
}

export default async function MovieRatingDistribution(props: MovieRatingDistributionProps) {
  const { imdbId, children } = props
  const data = await getMovieRatingDistribution(imdbId)
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent>
        <MovieRatingDistributionChart data={data} />
      </PopoverContent>
    </Popover>
  )
}
