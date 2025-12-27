import { MovieCardSkeleton } from '@/components/movie-card'
import { range } from 'radash'

export default function Loading() {
  return (
    <main className="flex min-h-[calc(100vh-56px)] w-full flex-col items-center gap-6 px-2 pt-10 pb-4 md:px-4">
      <div className="w-full max-w-7xl rounded-md bg-card px-4 py-2">
        <h2 className="mb-4 text-2xl font-semibold">Recently rated</h2>
        <ul className="flex w-full flex-row space-x-4 overflow-x-hidden mask-r-from-90% pb-5">
          {[...range(6)].map((val) => (
            <li key={`recent_skeleton_${val}`}>
              <MovieCardSkeleton />
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full max-w-7xl rounded-md bg-card px-4 py-2">
        <h2 className="mb-4 text-2xl font-semibold">Top movies</h2>
        <ul className="flex w-full flex-row space-x-4 overflow-x-hidden mask-r-from-90% pb-5">
          {[...range(6)].map((val) => (
            <li key={`top_skeleton_${val}`}>
              <MovieCardSkeleton />
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
