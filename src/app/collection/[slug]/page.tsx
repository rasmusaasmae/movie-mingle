import { getIdFromSlug, selfHealCollectionUrl } from '@/lib/url'
import { CollectionSummary } from '@/components/collection-summary'
import { MovieCardTmdb } from '@/components/movie-card'
import { alphabetical } from 'radash'
import { getCollection } from '@/lib/tmdb'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tmdbId = getIdFromSlug(slug)
  if (tmdbId === null) {
    return { title: 'Collection not found - Movie Mingle' }
  }
  const collection = await getCollection(tmdbId)
  return {
    title: `${collection.name.trim()} - Movie Mingle`,
    description: `${collection.overview.slice(0, 150).trim()}`,
    keywords: ['Movie Mingle', collection.name.trim()],
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tmdbId = getIdFromSlug(slug) ?? notFound()
  const collection = await getCollection(tmdbId)
  selfHealCollectionUrl(slug, tmdbId, collection.name)

  const movies = alphabetical(
    collection.parts,
    (t) => new Date(t.release_date).getTime().toString(),
    'asc',
  )

  return (
    <main className="flex min-h-[calc(100vh-56px)] w-full flex-col items-center gap-6 pb-8">
      <CollectionSummary collection={collection} />
      <div className="w-full max-w-7xl">
        <div className="relative mb-4 w-full">
          <ul className="flex w-full flex-row space-x-4 overflow-x-auto mask-r-from-80% pb-5">
            {movies.map((movie) => (
              <li key={movie.id}>
                <MovieCardTmdb movie={movie} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
}
