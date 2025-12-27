import { type Movie as TmdbMovie, getPosterImageUrl, getYear } from '../lib/tmdb'
import Link from 'next/link'
import { MeanRatingCircle } from './rating'
import { Movie } from '../db/types'
import { PosterImage } from './poster-image'
import { Skeleton } from './ui/skeleton'
import { getMovieUrl } from '../lib/url'

type MovieCardProps = {
  movie: Pick<Movie, 'tmdbId' | 'title' | 'year' | 'posterPath'> & {
    voteMean?: number
    voteCount?: number
  }
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const { tmdbId, title, year, posterPath, voteMean, voteCount } = movie
  const href = getMovieUrl(tmdbId, title)
  const posterUrl = posterPath ? getPosterImageUrl(posterPath) : undefined

  return (
    <Link href={href}>
      <div className="group relative aspect-2/3 h-72 overflow-hidden rounded-md bg-background text-lg">
        <PosterImage
          title={title ?? undefined}
          posterUrl={posterUrl}
          className="h-full transition-opacity group-hover:opacity-30 dark:group-hover:opacity-20"
        />

        <div className="absolute top-1/2 right-0 left-0 m-1 grid -translate-y-1/2 place-items-center opacity-0 transition-opacity group-hover:opacity-100">
          <h3 className="line-clamp-3 text-center font-bold">{title}</h3>
          <p className="font-semibold">{year}</p>
        </div>
        {voteMean && voteCount && (
          <div className="absolute top-0 right-0 z-20 grid place-items-end p-1">
            <MeanRatingCircle mean={voteMean} count={voteCount} />
          </div>
        )}
      </div>
    </Link>
  )
}

export const MovieCardTmdb = ({ movie }: { movie: TmdbMovie }) => {
  const { id, title, release_date, poster_path } = movie

  const year = getYear(release_date)

  return (
    <MovieCard
      movie={{
        tmdbId: id,
        title,
        year,
        posterPath: poster_path,
      }}
    />
  )
}

export const MovieCardSkeleton = () => {
  return <Skeleton className="aspect-2/3 h-72 rounded-md" />
}
