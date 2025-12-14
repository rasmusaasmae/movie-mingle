'use client'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Search, SearchIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { PosterImage } from '@/components/poster-image'
import { Separator } from '@/components/ui/separator'
import { type TmdbMovie } from '@/utils/tmdb/schemas'
import { getMovieUrl } from '@/utils/url'
import { useSearchMovies } from '@/hooks/use-search-movies'
import { useState } from 'react'

function SearchDialog() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const { data } = useSearchMovies(searchTerm, 1)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <SearchIcon />
          <span className="hidden sm:inline">Search for movies...</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-96 max-h-full flex-col justify-start gap-2 sm:max-w-md md:max-w-xl">
        <DialogHeader className="h-fit">
          <DialogTitle className="sr-only">Search movies</DialogTitle>
          <div className="flex flex-row items-center px-3">
            <Search className="h-4 w-4 opacity-50" />
            <Input
              type="search"
              placeholder="Start typing to search for movies..."
              onChange={(e) => setSearchTerm(e.target.value)}
              maxLength={50}
              className="-ml-6 pl-8"
            />
          </div>
        </DialogHeader>
        <Separator />
        <div className="flex h-full max-h-full w-full flex-col gap-1 overflow-x-hidden overflow-y-auto">
          {data?.results.map((movie) => (
            <DialogClose key={movie.id} asChild>
              <Link href={getMovieUrl(movie.id, movie.title)} className="hover:bg-accent/30">
                <SearchResult key={movie.id} movie={movie} />
              </Link>
            </DialogClose>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

type SearchResultProps = {
  movie: TmdbMovie
}
function SearchResult(props: SearchResultProps) {
  const { movie } = props

  const release_date = new Date(movie.release_date)
  const year = release_date.getFullYear()

  return (
    <div className="flex h-24 w-full flex-row overflow-hidden rounded-md">
      <PosterImage title={movie.title} poster_path={movie.poster_path} className="h-full" />
      <div className="h-full w-full px-2 py-2">
        <h3 className="truncate text-lg font-semibold">{movie.title}</h3>
        <p className="text-muted-foreground"> {year}</p>
      </div>
    </div>
  )
}

export { SearchDialog }
