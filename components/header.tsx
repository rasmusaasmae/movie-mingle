import Image from 'next/image'
import Link from 'next/link'
import { SearchMoviesDialog } from './search-movies-dialog'
import { UserMenu } from './user-menu'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export const Header = async () => {
  const session = await auth.api.getSession({ headers: await headers() })
  const isAuthenticated = !!session

  return (
    <header className="sticky top-0 z-30 w-full bg-background/70 backdrop-blur-md backdrop-filter">
      <div className="mx-auto max-w-7xl px-4 pb-2 sm:px-8 sm:pb-0">
        <div className="flex h-14 items-center justify-between space-x-2 sm:space-x-8">
          <Link href="/">
            <div className="mx-4 flex flex-row items-center space-x-2">
              <div className="relative h-8 w-8">
                <Image
                  src="/logo.png"
                  alt="Movie Mingle"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <h1 className="text-xl font-semibold sm:text-2xl">Movie Mingle</h1>
            </div>
          </Link>
          <div className="flex items-center space-x-1 sm:space-x-4">
            <SearchMoviesDialog />
            {isAuthenticated && (
              <Link
                href="/ratings"
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              >
                My Ratings
              </Link>
            )}
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  )
}
