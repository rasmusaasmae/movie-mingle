"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import setMovieRating from "@/utils/rating/set-movie-rating";
import useMovieDetails from "@/hooks/use-movie-details";
import useMovieRating from "@/hooks/use-movie-rating";
import useMovieMeanRating from "@/hooks/use-movie-mean-rating";

export default function Movie({ params }: { params: { id: string } }) {
  const { data: movieDetails } = useMovieDetails(params.id);
  const { data: userRating, refetch: refetchUserRating } = useMovieRating(
    params.id,
  );
  const { data: meanRating, refetch: refetchMeanRating } = useMovieMeanRating(
    params.id,
  );

  async function handleRate() {
    const rating = Math.random() * 10;
    await setMovieRating(params.id, rating).catch(() => {});
    refetchUserRating();
    refetchMeanRating();
  }

  if (movieDetails === undefined) {
    return "loading...";
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        {movieDetails.title} ({movieDetails.year})
      </div>
      <Image
        src={movieDetails.medium_cover_image}
        alt={`Picture of ${movieDetails.title}`}
        height={200}
        width={200}
      />
      <div>{movieDetails.genres.join(", ")}</div>
      <div>IMDb rating: {movieDetails.rating}</div>
      <div>User rating: {userRating?.rating}</div>
      <div>Mean rating: {meanRating?.mean}</div>
      <Button onClick={handleRate}>Rate movie randomly</Button>
    </main>
  );
}
