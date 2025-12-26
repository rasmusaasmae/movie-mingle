import { getRecentMovies, getTopMovies } from '@/actions'
import { MovieCard } from '@/components/movie-card'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const recentMovies = await getRecentMovies()
  const topMovies = await getTopMovies()

  return (
    <main className="flex min-h-[calc(100vh-56px)] w-full flex-col items-center gap-6 px-2 pt-10 pb-4 md:px-4">
      <div className="w-full max-w-7xl rounded-md bg-card px-4 py-2">
        <h2 className="mb-4 text-2xl font-semibold">Recently rated</h2>
        <ul className="flex min-h-77 w-full flex-row space-x-4 overflow-x-auto mask-r-from-90% pb-5">
          {recentMovies.map((movie) => (
            <li key={`recent_${movie.imdbId}`}>
              <MovieCard movie={movie} />
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full max-w-7xl rounded-md bg-card px-4 py-2">
        <h2 className="mb-4 text-2xl font-semibold">Top movies</h2>
        <ul className="flex min-h-77 w-full flex-row space-x-4 overflow-x-auto mask-r-from-90% pb-5">
          {topMovies.map((movie) => (
            <li key={`top_${movie.imdbId}`}>
              <MovieCard movie={movie} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
