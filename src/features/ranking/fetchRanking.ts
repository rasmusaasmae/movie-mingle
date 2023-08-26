import { rankingSchema } from "./rankingSchema";

export default async function fetchRanking() {
  return await fetch("/api/ranking")
    .then((res) => res.json())
    .then((res) => rankingSchema.parse(res));
}
