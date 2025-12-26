import { getIdFromSlug, selfHealMovieUrl } from '@/lib/url'
import { getMovieDetails, getYear } from '@/lib/tmdb'
import { Collection } from '@/components/collection'
import { MovieSummary } from '@/components/movie-summary'
import { Recommendations } from '@/components/recommendations'
import { Separator } from '@/components/ui/separator'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tmdbId = getIdFromSlug(slug)
  if (tmdbId === null) {
    return { title: 'Movie not found - Movie Mingle' }
  }
  const movie = await getMovieDetails(tmdbId)
  const year = getYear(movie.release_date)
  return {
    title: `${movie.title} (${year}) - Movie Mingle`,
    description: `${movie.overview.slice(0, 150)}`,
    keywords: ['Movie Mingle', movie.title, year],
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tmdbId = getIdFromSlug(slug) ?? notFound()
  const movie = await getMovieDetails(tmdbId)
  selfHealMovieUrl(slug, movie.id, movie.title)

  return (
    <main className="flex min-h-[calc(100vh-56px)] w-full flex-col items-center gap-6 pb-8">
      <MovieSummary movie={movie} />
      <div className="flex w-full flex-col items-center gap-4 px-6">
        <Collection collection={movie.belongs_to_collection} />
        {!!movie.belongs_to_collection && <Separator />}
        <Recommendations movie={movie} />
      </div>
    </main>
  )
}
