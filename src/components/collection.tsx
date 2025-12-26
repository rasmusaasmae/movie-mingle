import { type MovieDetails, getBackdropImageUrl } from '@/lib/tmdb'
import Image from 'next/image'
import Link from 'next/link'
import { getCollectionUrl } from '@/lib/url'

export const Collection = ({
  collection,
}: {
  collection: MovieDetails['belongs_to_collection']
}) => {
  if (collection === null) return null

  return (
    <section className="flex w-full max-w-7xl flex-col">
      <h2 className="mb-4 text-2xl font-semibold">Collection</h2>
      <Link href={getCollectionUrl(collection.id, collection.name)}>
        <div className="relative h-48 w-full max-w-7xl overflow-hidden rounded-md bg-background p-8">
          {collection.backdrop_path && (
            <Image
              alt={`Backdrop of ${collection.name}`}
              src={getBackdropImageUrl(collection.backdrop_path)}
              fill
              className="pointer-events-none aspect-video h-full object-cover object-[50%_20%] opacity-30 dark:opacity-20"
            />
          )}
          <p className="text-xl">
            Part of the <span className="text-2xl">{collection.name}</span>
          </p>
        </div>
      </Link>
    </section>
  )
}
