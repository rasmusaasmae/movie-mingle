import { useQuery } from "react-query";
import fetchRanking from "./fetchRanking";

export default function useRanking() {
  return useQuery({
    queryKey: ["ranking"],
    queryFn: fetchRanking,
  });
}
