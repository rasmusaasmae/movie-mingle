import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createClient } from "@/utils/supabase/client";
import {
  deleteWatchDate,
  getWatchDate,
  setWatchDate,
} from "@/utils/supabase/queries";

function useGetWatchDate(imdbId: string) {
  const supabase = createClient();

  return useQuery({
    queryKey: ["supabase", "watch-date", imdbId],
    queryFn: async () => await getWatchDate(supabase, imdbId),
  });
}

function useSetWatchDate() {
  const supabase = createClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ imdbId, date }: { imdbId: string; date?: Date }) => {
      if (!date) return await deleteWatchDate(supabase, imdbId);
      return await setWatchDate(supabase, imdbId, date);
    },
    onSettled: async (_data, _error, variables) => {
      return await queryClient.invalidateQueries({
        queryKey: ["supabase", "watch-date", variables.imdbId],
      });
    },
  });
}

export { useGetWatchDate, useSetWatchDate };
