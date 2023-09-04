import z from "zod";

export const ratingSchema = z.object({
  id: z.string(),
  movieId: z.string(),
  rating: z.number(),
  userId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
export type Rating = z.infer<typeof ratingSchema>;

export const meanRatingSchema = z.object({ mean: z.number() });
export type MeanRating = z.infer<typeof meanRatingSchema>;
