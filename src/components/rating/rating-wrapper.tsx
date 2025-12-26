export const RatingWrapper = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => {
  return (
    <div className="flex flex-col items-center space-y-1">
      <h4 className="text-sm uppercase">{title}</h4>
      {children}
    </div>
  )
}
