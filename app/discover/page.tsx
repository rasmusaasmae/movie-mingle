import { DiscoverQueue } from '@/components/discover-queue'
import { auth } from '@/lib/auth'
import { getDiscoverBatch } from '@/actions'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Discover - Movie Mingle',
  description: 'Discover movies to rate',
}

export default async function DiscoverPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) {
    redirect('/')
  }

  const initialBatch = await getDiscoverBatch({ batchSize: 10 })

  return (
    <main className="flex min-h-[calc(100vh-56px)] w-full flex-col items-center gap-6 px-4 pt-10 pb-8">
      <div className="w-full max-w-3xl">
        <h1 className="mb-6 text-3xl font-bold">Discover</h1>
        <DiscoverQueue initialBatch={initialBatch} />
      </div>
    </main>
  )
}
