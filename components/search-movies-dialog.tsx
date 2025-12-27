'use client'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Loader2, Search } from 'lucide-react'
import { type Movie, getPosterImageUrl, searchMovies } from '../lib/tmdb'
import { getYear, isValid, parseISO } from 'date-fns'
import { Input } from './ui/input'
import Link from 'next/link'
import { PosterImage } from './poster-image'
import { Separator } from './ui/separator'
import { buttonVariants } from '@/components/ui/button'
import { getMovieUrl } from '../lib/url'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export const SearchMoviesDialog = () => {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [page] = useState(1)

  const hasQuery = searchTerm.length > 0

  const { data, isLoading } = useQuery({
    queryKey: ['tmdb', 'search-movies', { query: searchTerm, page }],
    queryFn: () => searchMovies(searchTerm, page),
    enabled: hasQuery,
  })

  const hasResults = data?.results && data.results.length > 0

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen)
        if (!isOpen) setSearchTerm('')
      }}
    >
      <DialogTrigger className={buttonVariants({ variant: 'outline' })}>
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Search movies</span>
      </DialogTrigger>
      <DialogContent className="flex h-96 max-h-full flex-col justify-start gap-2 sm:max-w-md md:max-w-xl">
        <DialogHeader className="h-fit">
          <DialogTitle className="sr-only">Search movies</DialogTitle>
          <div className="flex flex-row items-center px-3">
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin opacity-50" />
            ) : (
              <Search className="h-4 w-4 opacity-50" />
            )}
            <Input
              type="search"
              placeholder="Start typing to search for movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              maxLength={50}
              className="-ml-6 pl-8"
              autoFocus
            />
          </div>
        </DialogHeader>
        <Separator />
        <div className="flex h-full max-h-full w-full flex-col gap-1 overflow-x-hidden overflow-y-auto">
          {!hasQuery && (
            <p className="py-8 text-center text-sm text-muted-foreground">
              Start typing to search for movies
            </p>
          )}
          {hasQuery && !isLoading && !hasResults && (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No movies found for "{searchTerm}"
            </p>
          )}
          {data?.results.map((movie) => (
            <DialogClose key={movie.id}>
              <Link href={getMovieUrl(movie.id, movie.title)} className="hover:bg-accent/30">
                <SearchResult movie={movie} />
              </Link>
            </DialogClose>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

const SearchResult = ({ movie }: { movie: Movie }) => {
  const { title, release_date, poster_path } = movie
  const parsedReleaseDate = parseISO(release_date)
  const releaseYear = isValid(parsedReleaseDate) ? getYear(parsedReleaseDate) : null
  const posterUrl = poster_path ? getPosterImageUrl(poster_path) : undefined

  return (
    <div className="flex h-24 w-full flex-row overflow-hidden rounded-md">
      <PosterImage title={title} posterUrl={posterUrl} className="h-full" />
      <div className="flex h-full w-full flex-col items-start px-2 py-2">
        <h3 className="truncate text-lg font-semibold">{title}</h3>
        {releaseYear && <p className="text-muted-foreground">{releaseYear}</p>}
      </div>
    </div>
  )
}
