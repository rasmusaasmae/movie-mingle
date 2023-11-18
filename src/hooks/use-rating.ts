import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserRating, setUserRating } from "@/lib/supabase/ratings/client";

export function useUserRating(imdb_id: string) {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["supabase-user-rating", imdb_id],
    queryFn: () => getUserRating(imdb_id),
  });
  const mutation = useMutation({
    mutationFn: setUserRating,
    onSettled: async () => {
      return await queryClient.invalidateQueries({
        queryKey: ["supabase-user-rating", imdb_id],
      });
    },
  });
  return { query, mutation };
}
