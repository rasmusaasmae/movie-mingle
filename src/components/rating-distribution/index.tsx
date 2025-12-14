import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import {
  getRatingDistribution,
  getRatingStatistics,
  getUserRatingStatistics,
} from '@/utils/supabase/queries'
import RatingDistributionChart from './rating-distribution-chart'
import clsx from 'clsx'
import { createClient } from '@/utils/supabase/server'

export default async function RatingDistribution() {
  const supabase = await createClient()
  const ratingDistribution = await getRatingDistribution(supabase)
  const totalStats = await getRatingStatistics(supabase)
  const userStats = await getUserRatingStatistics(supabase)

  const meanDifference = (100 * userStats.mean) / totalStats.mean - 100

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rating Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <RatingDistributionChart data={ratingDistribution} />
      </CardContent>
      <CardFooter>
        <ul className="mb-6 ml-6 list-disc [&>li]:mt-2">
          <li>
            You have rated a total of <span className="text-yellow-400">{userStats.count}</span>{' '}
            movies
          </li>
          <li>
            Your <span className="font-semibold">average rating</span> is{' '}
            <span
              className={clsx({
                'text-red-400': userStats.mean < totalStats.mean,
                'text-green-400': userStats.mean > totalStats.mean,
              })}
            >
              {meanDifference > 0
                ? `${meanDifference.toFixed(2)}% higher`
                : `${Math.abs(meanDifference).toFixed(2)}% lower`}
            </span>{' '}
            than the total average rating
          </li>
        </ul>
      </CardFooter>
    </Card>
  )
}
