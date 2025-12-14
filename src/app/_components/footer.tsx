import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="flex flex-col items-center md:px-6">
      <div className="flex w-full max-w-7xl flex-col-reverse items-start justify-between gap-4 px-6 py-6 md:flex-row md:items-center md:px-0 md:py-10">
        <section>
          <p>&copy; 2024 Movie Mingle</p>
        </section>
        <section className="flex h-7 flex-row">
          <Link
            href="https://github.com/rasmusaasmae/movie-mingle"
            className="flex flex-row items-center gap-1 transition-all hover:text-lg hover:font-semibold hover:text-black dark:hover:text-white"
          >
            <div className="relative h-6 w-7">
              <Image src="/github.svg" alt="GitHub" fill className="object-contain" />
            </div>
            <span>GitHub</span>
          </Link>
        </section>
        <section className="flex flex-row gap-2">
          <span>Metadata & images from</span>
          <Link href="https://www.themoviedb.org/">
            <div className="relative h-6 w-14">
              <Image src="/tmdb.svg" alt="TMDb" fill className="object-contain" />
            </div>
          </Link>
        </section>
      </div>
    </footer>
  )
}
