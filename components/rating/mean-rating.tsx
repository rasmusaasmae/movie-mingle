import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { RatingWrapper } from './rating-wrapper'
import { StarIcon } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/tailwind'

type MeanRatingProps = {
  mean: number | null
  count: number
}

export const MeanRating = ({ mean, count }: MeanRatingProps) => {
  const title = 'Average rating'
  const rounded = mean?.toFixed(1) ?? '-'
  const countText = `${count} vote${count !== 1 ? 's' : ''}`

  return (
    <RatingWrapper title={title}>
      <Tooltip>
        <TooltipTrigger
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'flex h-10 min-w-40 cursor-default gap-4',
          )}
        >
          <StarIcon fill="currentColor" className="size-5" />
          <div className="flex w-16 justify-end text-lg tracking-wider">
            <span className="font-bold">{rounded}</span>
            /10
          </div>
        </TooltipTrigger>
        <TooltipContent>{countText}</TooltipContent>
      </Tooltip>
    </RatingWrapper>
  )
}
