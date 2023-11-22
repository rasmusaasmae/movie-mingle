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
    <div className="w-full h-24 flex flex-row justify-between rounded-md overflow-hidden border border-slate-500">
      <div className="h-full flex flex-row gap-2">
        <PosterImage
          tmdb_id={movie.id}
          title={movie.title}
          poster_path={movie.poster_path}
        />
        <section className="h-full p-1 flex flex-col">
          <h3 className="font-semibold text-lg">{movie.title}</h3>
          <p className="dark:text-slate-300"> {year}</p>
        </section>
      </div>
      <section className="p-2 flex flex-row gap-2">
        <UserRating imdbId={imdbId} movieTitle={movie.title} />
        <AverageRating imdbId={imdbId} />
      </section>
    </div>
  );
}
