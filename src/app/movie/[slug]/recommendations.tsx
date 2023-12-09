import PosterImage from "@/components/poster-image";
import { type TmdbMovieDetails } from "@/lib/tmdb/schemas";

type Props = {
  movie: TmdbMovieDetails;
};

export default async function Recommendations({ movie }: Props) {
  const recommendations = movie.recommendations?.results;

  if (recommendations === undefined || recommendations.length === 0)
    return (
      <section className="flex w-full max-w-7xl flex-col">
        <h2 className="mb-4 text-2xl font-semibold">Similar movies</h2>
        <p>
          We don&apos;t have enough data to suggest movies based on{" "}
          <span className="font-semibold">{movie.title}</span>.
        </p>
      </section>
    );

  return (
    <section className="flex w-full max-w-7xl flex-col">
      <h2 className="mb-4 text-2xl font-semibold">Similar movies</h2>
      <div className="flex h-48 w-full flex-row gap-3 overflow-x-auto pb-4">
        {recommendations.map((m) => (
          <PosterImage
            key={m.id}
            tmdb_id={m.id}
            title={m.title}
            poster_path={m.poster_path}
          />
        ))}
      </div>
    </section>
  );
}
