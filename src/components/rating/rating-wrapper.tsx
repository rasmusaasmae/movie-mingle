type RatingWrapperProps = {
  children: React.ReactNode;
  title: string;
};

export default function RatingWrapper({ children, title }: RatingWrapperProps) {
  return (
    <div className="flex flex-col items-center space-y-1">
      <h4 className="text-sm uppercase">{title}</h4>
      {children}
    </div>
  );
}
