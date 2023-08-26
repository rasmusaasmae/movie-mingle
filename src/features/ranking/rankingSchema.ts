import { z } from "zod";

export const rankingSchema = z.array(
  z.object({
    id: z.string(),
    avgRating: z.number(),
  })
);
