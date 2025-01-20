import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getMovieRatingDistribution } from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/server";

import MovieRatingDistributionChart from "./movie-rating-distribution-chart";

type MovieRatingDistributionProps = {
  imdbId: string;
  children: React.ReactNode;
};

export default async function MovieRatingDistribution(
  props: MovieRatingDistributionProps,
) {
  const { imdbId, children } = props;
  const supabase = await createClient();
  const data = await getMovieRatingDistribution(supabase, imdbId);
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent>
        <MovieRatingDistributionChart data={data} />
      </PopoverContent>
    </Popover>
  );
}
