"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";

interface MovieDetails {
  title: string;
  description: string;
  image: string;
  genres: string[];
}

export default function Movie({ params }: { params: { id: string } }) {
  const [movieDetails, setMovieDetails] = useState<MovieDetails>();
  const movieDetailsURL =
    "https://yts.mx/api/v2/movie_details.json?movie_id=" +
    params.id +
    "&with_images=true&with_cast=true";
  axios.get(movieDetailsURL).then(
    (response) => {
      const data = response.data;
      const details: MovieDetails = {
        title: data.title_long,
        description: data.description_full,
        image: data.background_image,
        genres: data.genres,
      };
      setMovieDetails(details);
    },
    (error) => {
      console.log(error);
    }
  );
  console.log(movieDetails);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        {movieDetails.title}
      </div>
    </main>
  );
}
