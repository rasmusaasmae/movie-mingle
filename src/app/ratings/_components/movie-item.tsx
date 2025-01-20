import Link from "next/link";

import PosterImage from "@/components/poster-image";
import { AverageRating } from "@/components/rating/average-rating";
import UserRating from "@/components/rating/user-rating";
import { Database } from "@/utils/supabase/types";
import { getMovieUrl } from "@/utils/url";

type MovieItemProps = {
  movie: Database["public"]["Views"]["movies_with_rating_and_popularity"]["Row"];
};

export default async function MovieItem(props: MovieItemProps) {
  const { movie } = props;
  const { imdb_id, tmdb_id, title, year, poster_path, vote_mean, vote_count } =
    movie;

  const rating =
    vote_mean !== null && vote_count !== null
      ? { mean: vote_mean, count: vote_count }
      : null;
  const href = getMovieUrl(tmdb_id!, title);

  return (
    <div className="flex h-24 w-full flex-row justify-between overflow-hidden rounded-md border border-slate-500">
      <div className="flex h-full flex-row gap-2">
        <Link href={href} className="h-full">
          <PosterImage
            title={title ?? imdb_id ?? tmdb_id!.toString()}
            poster_path={poster_path}
            className="h-full"
          />
        </Link>
        <section className="flex h-full flex-col p-1">
          <Link href={href}>
            <h3 className="line-clamp-2 text-lg font-semibold">{title}</h3>
          </Link>
          <p className="dark:text-slate-300"> {year}</p>
        </section>
      </div>
      <section className="flex flex-row gap-2 p-2">
        <UserRating imdbId={imdb_id!} movieTitle={title ?? imdb_id!} />
        <AverageRating imdbId={imdb_id!} rating={rating} />
      </section>
    </div>
  );
}
