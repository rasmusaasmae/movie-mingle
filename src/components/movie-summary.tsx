import {
  type MovieDetails,
  getBackdropImageUrl,
  getPosterImageUrl,
  getYear,
  parseRuntime,
} from '@/lib/tmdb'
import { TMDB_IMAGE_BASE_URL, TMDB_IMAGE_SIZE_POSTER_ORIGINAL } from '@/lib/tmdb/constants'
import Image from 'next/image'
import { ImageIcon } from 'lucide-react'
import { MeanRating } from '@/components/rating/mean-rating'
import { PosterImage } from '@/components/poster-image'
import { Rating } from '@/components/rating/rating'
import { TMDBRating } from '@/components/rating/tmdb-rating'
import { Watched } from '@/components/watched'
import { getMeanRating } from '@/actions'

export const MovieSummary = async ({ movie }: { movie: MovieDetails }) => {
  const { imdb_id, backdrop_path, runtime, release_date } = movie
  const meanRating = imdb_id ? await getMeanRating({ imdbId: imdb_id }) : null
  const imageUrl = backdrop_path ? getBackdropImageUrl(backdrop_path) : null
  const { hours, minutes } = parseRuntime(runtime)
  const year = getYear(release_date)

  return (
    <section className="relative flex w-full flex-col items-center overflow-hidden bg-background p-6">
      {imageUrl && (
        <Image
          alt={`Backdrop of ${movie.title}`}
          src={imageUrl}
          priority
          fill
          className="pointer-events-none aspect-video h-full object-cover object-[50%_20%] opacity-25"
        />
      )}
      <div className="z-10 flex w-full max-w-7xl flex-col items-center gap-10 sm:flex-row sm:items-start">
        <div className="relative aspect-2/3 w-full max-w-[18rem] overflow-hidden rounded-md">
          <PosterImage
            title={movie.title}
            posterUrl={movie.poster_path ? getPosterImageUrl(movie.poster_path) : undefined}
            className="h-full"
          />
          {movie.poster_path !== null ? (
            <Image
              alt={`Poster of ${movie.title}`}
              src={`${TMDB_IMAGE_BASE_URL}/${TMDB_IMAGE_SIZE_POSTER_ORIGINAL}/${movie.poster_path}`}
              priority
              fill
              className="object-cover"
            />
          ) : (
            <div className="grid h-full w-full place-items-center">
              <ImageIcon className="h-8 w-8 opacity-50" />
            </div>
          )}
        </div>
        <section className="flex w-full flex-col gap-2 pt-10">
          <div className="flex flex-row items-center gap-4">
            <h1 className="text-3xl font-bold">
              {movie.title} <span className="font-normal text-muted-foreground">({year})</span>
            </h1>
          </div>
          <div className="space-x-3 text-muted-foreground">
            <span>{movie.genres.map((g) => g.name).join(', ')}</span>
            <span>•</span>
            <span>{`${hours}h ${minutes}m`}</span>
          </div>
          <section className="my-2 flex flex-wrap gap-2">
            {movie.imdb_id !== null && <Rating imdbId={movie.imdb_id} title={movie.title} />}
            {movie.imdb_id !== null && <MeanRating imdbId={movie.imdb_id} rating={meanRating} />}
            <TMDBRating
              tmdbId={movie.id}
              rating={{ mean: movie.vote_average, count: movie.vote_count }}
            />
            {movie.imdb_id !== null && <Watched imdbId={movie.imdb_id} />}
          </section>
          <h3 className="text-muted-foreground italic">{movie.tagline}</h3>
          <section className="space-y-1">
            <h2 className="text-lg font-semibold">Overview</h2>
            <p className="text-sm">{movie.overview}</p>
          </section>
        </section>
      </div>
    </section>
  )
}
