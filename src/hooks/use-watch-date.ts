import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createClient } from "@/utils/supabase/client";
import {
  deleteWatchDate,
  getWatchDate,
  setWatchDate,
} from "@/utils/supabase/queries";

export function useWatchDate(imdbId: string) {
  const supabase = createClient();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["supabase", "watch-date", imdbId],
    queryFn: async () => await getWatchDate(supabase, imdbId),
  });

  const mutation = useMutation({
    mutationFn: async ({ date }: { date?: Date }) => {
      if (!date) return await deleteWatchDate(supabase, imdbId);
      return await setWatchDate(supabase, imdbId, date);
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries({
        queryKey: ["supabase", "watch-date", imdbId],
      });
    },
  });

  return { query, mutation };
}
