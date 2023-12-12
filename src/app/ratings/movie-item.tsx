import PosterImage from "@/components/poster-image";
import AverageRating from "@/components/rating/average-rating";
import UserRating from "@/components/rating/user-rating";
import { fetchMovieImdb } from "@/lib/tmdb";
import { getMovieUrl } from "@/utils/url";
import Link from "next/link";

type MovieItemProps = {
  imdbId: string;
};

export default async function MovieItem(props: MovieItemProps) {
  const { imdbId } = props;

  const movie = await fetchMovieImdb(imdbId);
  const { id, title, poster_path } = movie;

  const release_date = new Date(movie.release_date);
  const year = release_date.getFullYear();
  const href = getMovieUrl(id, title);

  return (
    <div className="flex h-24 w-full flex-row justify-between overflow-hidden rounded-md border border-gray-500">
      <div className="flex h-full flex-row gap-2">
        <Link href={href} className="h-full">
          <PosterImage
            title={title}
            poster_path={poster_path}
            className="h-full"
          />
        </Link>
        <section className="flex h-full flex-col p-1">
          <Link href={href}>
            <h3 className="line-clamp-2 text-lg font-semibold">{title}</h3>
          </Link>
          <p className="dark:text-gray-300"> {year}</p>
        </section>
      </div>
      <section className="flex flex-row gap-2 p-2">
        <UserRating imdbId={imdbId} movieTitle={title} />
        <AverageRating imdbId={imdbId} />
      </section>
    </div>
  );
}
