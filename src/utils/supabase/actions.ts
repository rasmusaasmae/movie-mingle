'use server'

import { Database } from './types'
import { createClient } from '@supabase/supabase-js'
import { fetchMovieImdb } from '@/utils/tmdb'

export async function upsertMovie(imdbId: string) {
  const {
    id: tmdb_id,
    title,
    release_date,
    overview,
    poster_path,
    backdrop_path,
    genre_ids,
    vote_count: tmdb_vote_count,
    vote_average: tmdb_vote_mean,
  } = await fetchMovieImdb(imdbId)
  const year = new Date(release_date).getFullYear()

  const client = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )

  await client.from('movies').upsert({
    imdb_id: imdbId,
    tmdb_id,
    title,
    year,
    overview,
    poster_path,
    backdrop_path,
    genre_ids,
    tmdb_vote_count,
    tmdb_vote_mean,
  })
}
