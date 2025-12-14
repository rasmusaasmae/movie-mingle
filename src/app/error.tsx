'use client'

import { useEffect } from 'react'

export default function Error({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="flex min-h-[calc(100vh-56px)] w-full flex-col items-center justify-center gap-3">
      <p className="text-center text-6xl font-bold md:text-9xl">Oh no!</p>
      <h1 className="text-center text-2xl font-bold md:text-5xl">Something went wrong</h1>
    </main>
  )
}
