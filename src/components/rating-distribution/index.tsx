import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { RatingDistributionChart } from './rating-distribution-chart'
import clsx from 'clsx'
import { getRatingStats } from '@/actions'

export const RatingDistribution = async () => {
  const { distribution, stats } = await getRatingStats()

  const meanDifference =
    stats.total.mean && stats.user.mean ? (100 * stats.user.mean) / stats.total.mean - 100 : 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rating Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <RatingDistributionChart data={distribution} />
      </CardContent>
      <CardFooter>
        <ul className="mb-6 ml-6 list-disc [&>li]:mt-2">
          <li>
            You have rated a total of <span className="text-yellow-400">{stats.user.count}</span>{' '}
            movies
          </li>
          <li>
            Your <span className="font-semibold">average rating</span> is{' '}
            <span
              className={clsx({
                'text-red-400': (stats.user.mean ?? 0) < (stats.total.mean ?? 0),
                'text-green-400': (stats.user.mean ?? 0) > (stats.total.mean ?? 0),
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
