"use client";
import useRanking from "@/features/ranking/useRanking";

export default function Ranking() {
  const { isLoading, data } = useRanking();

  return (
    <main>
      <div className="flex justify-center">
        {data?.map((movie) => (
          <div key={movie.id}>
            {movie.id} {movie.avgRating}
          </div>
        ))}
      </div>
    </main>
  );
}
