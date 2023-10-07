import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getAverageRating,
  getUserRating,
  setUserRating,
} from "@/lib/supabase/ratings/client";
import { type UserRating } from "@/lib/supabase/ratings/types";

export function useUserRating(movieId: string) {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["rating", movieId, "user"],
    queryFn: () => getUserRating(movieId),
  });
  const mutation = useMutation({
    mutationFn: setUserRating,
    onMutate: async (data) => {
      await queryClient.cancelQueries({
        queryKey: ["rating", data.movieId, "user"],
      });

      const previousRating: UserRating | null | undefined =
        queryClient.getQueryData(["rating", data.movieId, "user"]);

      const newRating: UserRating | null = data.rating
        ? {
            movie_id: data.movieId,
            created_at: Date.now().toString(),
            rating: data.rating,
            user_id: previousRating?.user_id ?? "undefined",
          }
        : null;
      queryClient.setQueryData(["rating", movieId, "user"], newRating);

      return { previousRating, newRating };
    },
    onError: (err, newRating, context) => {
      queryClient.setQueryData(
        ["rating", context?.newRating?.movie_id, "user"],
        context?.previousRating ?? null,
      );
    },
    onSettled: (newTodo) => {
      queryClient.invalidateQueries({ queryKey: ["rating", movieId] });
    },
  });
  return { query, mutation };
}

export function useAverageRating(movieId: string) {
  const query = useQuery({
    queryKey: ["rating", movieId, "average"],
    queryFn: () => getAverageRating(movieId),
  });
  return { query };
}
