import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/tailwind'

type MeanRatingCircleProps = { mean: number; count: number }

export const MeanRatingCircle = ({ mean, count }: MeanRatingCircleProps) => {
  const percentage = (mean * 10).toFixed(0)
  const countText = `${count} vote${count !== 1 ? 's' : ''}`

  return (
    <Tooltip>
      <TooltipTrigger
        className={cn(
          'grid h-10 w-10 place-items-center rounded-full border',
          mean >= 8 && 'bg-purple-500',
          mean >= 6 && mean < 8 && 'bg-green-500',
          mean >= 4 && mean < 6 && 'bg-yellow-400',
          mean < 4 && 'bg-red-500',
        )}
      >
        <div className="grid h-8 w-8 place-items-center rounded-full bg-background font-bold tracking-wider">
          {percentage}
        </div>
      </TooltipTrigger>
      <TooltipContent>{countText}</TooltipContent>
    </Tooltip>
  )
}
