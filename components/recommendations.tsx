import { MovieCardTmdb } from './movie-card'
import { type MovieDetails } from '../lib/tmdb'

export const Recommendations = ({ movie }: { movie: MovieDetails }) => {
  const recommendations = movie.recommendations?.results

  if (!recommendations || recommendations.length === 0)
    return (
      <section className="flex w-full max-w-7xl flex-col">
        <h2 className="mb-4 text-2xl font-semibold">Similar movies</h2>
        <p>
          We don&apos;t have enough data to suggest movies based on{' '}
          <span className="font-semibold">{movie.title}</span>.
        </p>
      </section>
    )

  return (
    <section className="flex w-full max-w-7xl flex-col">
      <h2 className="mb-4 text-2xl font-semibold">Similar movies</h2>
      <ul className="flex w-full flex-row space-x-4 overflow-x-auto pb-4">
        {recommendations.map((movie) => (
          <li key={movie.id}>
            <MovieCardTmdb movie={movie} />
          </li>
        ))}
      </ul>
    </section>
  )
}
