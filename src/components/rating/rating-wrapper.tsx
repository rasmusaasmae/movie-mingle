type RatingWrapperProps = {
  children: React.ReactNode;
  title: string;
};

export default function RatingWrapper({ children, title }: RatingWrapperProps) {
  return (
    <div className="flex flex-col items-center space-y-1">
      <h4 className="uppercase text-sm text-slate-700 dark:text-slate-400">
        {title}
      </h4>
      {children}
    </div>
  );
}
