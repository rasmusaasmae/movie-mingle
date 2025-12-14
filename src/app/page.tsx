import { getRecentMovies, getTopMovies } from '@/utils/supabase/queries'
import { MovieCard } from '@/components/movie-card'
import { createClient } from '@/utils/supabase/server'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const supabase = await createClient()
  const recentMovies = await getRecentMovies(supabase)
  const topMovies = await getTopMovies(supabase)

  return (
    <main className="flex min-h-[calc(100vh-56px)] w-full flex-col items-center gap-6 px-2 pt-10 pb-4 md:px-4">
      <div className="w-full max-w-7xl rounded-md bg-card px-4 py-2">
        <h2 className="mb-4 text-2xl font-semibold">Recently rated</h2>
        <ul className="flex w-full flex-row space-x-4 overflow-x-auto mask-r-from-90% pb-5">
          {recentMovies.map((m) => (
            <li key={`recent_${m.imdb_id}`}>
              <MovieCard movie={m} />
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full max-w-7xl rounded-md bg-card px-4 py-2">
        <h2 className="mb-4 text-2xl font-semibold">Top movies</h2>
        <ul className="flex w-full flex-row space-x-4 overflow-x-auto mask-r-from-90% pb-5">
          {topMovies.map((m) => (
            <li key={`top_${m.imdb_id}`}>
              <MovieCard movie={m} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
