import Image from "next/image";
import getMovie from "@/libs/supabase/get-movie";
import getRating from "@/libs/supabase/get-rating";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const movie = await getMovie(params.slug);
  return {
    title: `${movie.title_long} - Movie Mingle`,
    description: `${movie.description_intro?.slice(0, 150)}`,
    keywords: ["Movie Mingle", movie.title_long],
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const movie = await getMovie(params.slug);
  const userRating = await getRating(movie.id);

  return (
    <main className="flex min-h-full flex-col items-center justify-between">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        {movie.title} ({movie.year})
      </div>
      <Image
        src={movie.medium_cover_image ?? ""}
        alt={`Picture of ${movie.title}`}
        height={200}
        width={200}
      />
      <div>IMDb rating: {movie.imdb_rating}</div>
      <div>User rating: {userRating?.rating}</div>
    </main>
  );
}
