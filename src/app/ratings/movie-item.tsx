import PosterImage from "@/components/poster-image";
import AverageRating from "@/components/rating/average-rating";
import UserRating from "@/components/rating/user-rating";
import { fetchMovieImdb } from "@/lib/tmdb";

type MovieItemProps = {
  imdbId: string;
};

export default async function MovieItem(props: MovieItemProps) {
  const { imdbId } = props;

  const movie = await fetchMovieImdb(imdbId);
  const release_date = new Date(movie.release_date);
  const year = release_date.getFullYear();

  return (
    <div className="flex h-24 w-full flex-row justify-between overflow-hidden rounded-md border border-slate-500">
      <div className="flex h-full flex-row gap-2">
        <PosterImage
          tmdb_id={movie.id}
          title={movie.title}
          poster_path={movie.poster_path}
        />
        <section className="flex h-full flex-col p-1">
          <h3 className="text-lg font-semibold">{movie.title}</h3>
          <p className="dark:text-slate-300"> {year}</p>
        </section>
      </div>
      <section className="flex flex-row gap-2 p-2">
        <UserRating imdbId={imdbId} movieTitle={movie.title} />
        <AverageRating imdbId={imdbId} />
      </section>
    </div>
  );
}
