import { Label } from '@/components/ui/label'

export const RatingWrapper = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => {
  return (
    <div className="flex flex-col items-center space-y-1">
      <Label className="text-sm text-muted-foreground uppercase">{title}</Label>
      {children}
    </div>
  )
}
