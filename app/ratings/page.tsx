import { RatingListItem } from '@/components/rating-list-item'
import { auth } from '@/lib/auth'
import { getUserRatings } from '@/actions'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'My Ratings - Movie Mingle',
}

export default async function RatingsPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) {
    redirect('/')
  }

  const ratings = await getUserRatings()

  return (
    <main className="flex min-h-[calc(100vh-56px)] w-full flex-col items-center gap-6 px-2 pt-10 pb-4 md:px-4">
      <div className="w-full max-w-3xl rounded-md bg-card px-4 py-4">
        <h1 className="mb-6 text-2xl font-semibold">My Ratings</h1>
        {ratings.length === 0 ? (
          <p className="text-muted-foreground">
            You haven&apos;t rated any movies yet. Search for movies and rate them to see them here.
          </p>
        ) : (
          <>
            <div className="flex justify-end gap-6 border-b border-border px-3 pb-2 text-xs font-medium tracking-wider text-muted-foreground uppercase">
              <span className="w-16 text-center">Mine</span>
              <span className="w-16 text-center">Avg</span>
            </div>
            <ul className="divide-y divide-border">
              {ratings.map((movie) => (
                <li key={movie.imdbId}>
                  <RatingListItem movie={movie} />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </main>
  )
}
