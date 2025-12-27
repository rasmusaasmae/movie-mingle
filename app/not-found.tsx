import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-56px)] w-full flex-col items-center justify-center gap-3">
      <h1 className="text-center text-6xl font-bold md:text-9xl">Not Found</h1>
      <p className="text-center text-2xl font-bold md:text-5xl">
        Could not find the requested resource
      </p>
      <Link href="/">Return Home</Link>
    </main>
  )
}
