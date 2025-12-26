import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

type MeanRatingCircleProps = { voteMean?: number; voteCount?: number }

export const MeanRatingCircle = ({ voteMean, voteCount }: MeanRatingCircleProps) => {
  const percentage = voteMean !== undefined ? (voteMean * 10).toFixed(0) : '-'
  const count = voteCount ?? 0

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`grid h-10 w-10 place-items-center rounded-full border border-slate-200 ${
              voteMean === undefined
                ? 'bg-slate-700'
                : voteMean >= 8
                  ? 'bg-purple-500'
                  : voteMean >= 6
                    ? 'bg-green-500'
                    : voteMean > 4
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
