import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createClient } from "@/utils/supabase/client";
import {
  deleteUserRating,
  getUserRating,
  setUserRating,
} from "@/utils/supabase/queries";

export function useUserRating(imdbId: string) {
  const supabase = createClient();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["supabase", "user-rating", imdbId],
    queryFn: async () => await getUserRating(supabase, imdbId),
  });

  const mutation = useMutation({
    mutationFn: async ({ value }: { value: number | null }) => {
      if (value === null) return await deleteUserRating(supabase, imdbId);
      return await setUserRating(supabase, imdbId, value);
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries({
        queryKey: ["supabase", "user-rating", imdbId],
      });
    },
  });

  return { query, mutation };
}
