'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { DiscoverCard } from './discover-card'
import type { MovieDetails } from '@/lib/tmdb'
import { Skeleton } from './ui/skeleton'
import { getDiscoverBatch } from '@/actions'

const PREFETCH_THRESHOLD = 3
const BATCH_SIZE = 10

type Props = {
  initialBatch: MovieDetails[]
}

export const DiscoverQueue = ({ initialBatch }: Props) => {
  const [queue, setQueue] = useState<MovieDetails[]>(initialBatch)
  const [isFetching, setIsFetching] = useState(false)
  const [exhausted, setExhausted] = useState(false)
  const fetchingRef = useRef(false)

  const fetchMore = useCallback(async (currentQueue: MovieDetails[]) => {
    if (fetchingRef.current) return
    fetchingRef.current = true
    setIsFetching(true)

    try {
      const excludeTmdbIds = currentQueue.map((m) => m.id)
      const batch = await getDiscoverBatch({ excludeTmdbIds, batchSize: BATCH_SIZE })

      if (batch.length === 0) {
        setExhausted(true)
      } else {
        setQueue((prev) => [...prev, ...batch])
      }
    } finally {
      fetchingRef.current = false
      setIsFetching(false)
    }
  }, [])

  // Prefetch when queue runs low
  useEffect(() => {
    if (!exhausted && queue.length < PREFETCH_THRESHOLD && !fetchingRef.current) {
      fetchMore(queue)
    }
  }, [queue, exhausted, fetchMore])

  const handleAdvance = useCallback(() => {
    setQueue((prev) => prev.slice(1))
  }, [])

  if (queue.length === 0) {
    if (isFetching) {
      return <DiscoverCardSkeleton />
    }
    if (exhausted) {
      return (
        <div className="flex flex-col items-center gap-2 text-center text-muted-foreground">
          <p className="text-lg font-semibold">You're all caught up!</p>
          <p className="text-sm">No more movies to discover right now. Check back later.</p>
        </div>
      )
    }
    return null
  }

  const current = queue[0]

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <DiscoverCard key={current.id} movie={current} onAdvance={handleAdvance} />
      <p className="text-xs text-muted-foreground">
        {queue.length - 1} more in queue
        {isFetching && ' · loading more…'}
      </p>
    </div>
  )
}

const DiscoverCardSkeleton = () => {
  return <Skeleton className="h-96 w-full max-w-3xl rounded-xl" />
}
