import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

type AverageRatingCircleProps = {
  rating: {
    mean: number
    count: number
  } | null
}

export default function AverageRatingCircle(props: AverageRatingCircleProps) {
  const { rating } = props
  const percentage = rating !== null ? (rating.mean * 10).toFixed(0) : '-'
  const count = rating?.count ?? 0

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`grid h-10 w-10 place-items-center rounded-full border border-slate-200 ${
              rating === null
                ? 'bg-slate-700'
                : rating.mean >= 8
                  ? 'bg-purple-500'
                  : rating.mean >= 6
                    ? 'bg-green-500'
                    : rating.mean > 4
                      ? 'bg-yellow-400'
                      : 'bg-red-500'
            } dark:border-slate-800 dark:to-slate-700`}
          >
            <div className="grid h-8 w-8 place-items-center rounded-full bg-white dark:bg-slate-950">
              <span className="font-bold tracking-wider">{percentage}</span>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{`${count} vote${count !== 1 ? 's' : ''}`}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
