import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createClient } from "@/utils/supabase/client";
import {
  deleteUserRating,
  getUserRating,
  setUserRating,
} from "@/utils/supabase/queries";

export function useUserRating(imdb_id: string) {
  const supabase = createClient();
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["supabase", "user-rating", imdb_id],
    queryFn: async () => await getUserRating(supabase, imdb_id),
  });

  const mutation = useMutation({
    mutationFn: async (
      userRating: Awaited<ReturnType<typeof getUserRating>>,
    ) => {
      if (userRating === null) return await deleteUserRating(supabase, imdb_id);
      return setUserRating(supabase, imdb_id, userRating.value);
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries({
        queryKey: ["supabase", "user-rating", imdb_id],
      });
    },
  });
  return { query, mutation };
}
