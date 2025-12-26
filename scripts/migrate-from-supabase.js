import { createClient } from '@supabase/supabase-js'
import pkg from 'pg'
const { Client } = pkg

const [supabaseUserId, localUserId] = process.argv.slice(2)

if (!supabaseUserId || !localUserId) {
  throw new Error('Usage: bun migrate-supabase-single.js <supabaseUserId> <localUserId>')
}

console.log(`Migrating user ${supabaseUserId} to ${localUserId}`)

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

const localClient = new Client({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
})

await localClient.connect()

const { data: movies, error: moviesError } = await supabase.from('movies').select('*')

if (moviesError) {
  console.error('Error fetching movies from Supabase:', moviesError)
  process.exit(1)
}

for (const m of movies) {
  await localClient.query(
    `INSERT INTO movies (
        imdb_id,
        tmdb_id,
        title,
        year,
        overview,
        poster_path,
        backdrop_path,
        genre_ids,
        imdb_vote_count,
        imdb_vote_mean,
        tmdb_vote_count,
        tmdb_vote_mean,
        created_at,
        updated_at
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,now(),now())
    ON CONFLICT (imdb_id) DO NOTHING`,
    [
      m.imdb_id,
      m.tmdb_id,
      m.title,
      m.year,
      m.overview,
      m.poster_path,
      m.backdrop_path,
      m.genre_ids,
      m.imdb_vote_count,
      m.imdb_vote_mean,
      m.tmdb_vote_count,
      m.tmdb_vote_mean,
    ],
  )
}

console.log(`Migrated ${movies.length} rows from 'movies' table`)

const { data: watchedData, error: watchedError } = await supabase
  .from('watched')
  .select('*')
  .eq('user_id', supabaseUserId)

if (watchedError) {
  console.error('Error fetching watched from Supabase:', watchedError)
  process.exit(1)
}

for (const w of watchedData) {
  await localClient.query(
    `INSERT INTO watched (
          imdb_id,
          user_id,
          date,
          created_at,
          updated_at
      ) VALUES ($1,$2,$3,now(),now())
      ON CONFLICT (imdb_id, user_id) DO NOTHING`,
    [w.imdb_id, localUserId, w.date],
  )
}

console.log(`Migrated ${watchedData.length} rows from 'watched' table`)

const { data: ratingsData, error: ratingsError } = await supabase
  .from('ratings')
  .select('*')
  .eq('user_id', supabaseUserId)

if (ratingsError) {
  console.error('Error fetching ratings from Supabase:', ratingsError)
  process.exit(1)
}

for (const r of ratingsData) {
  await localClient.query(
    `INSERT INTO ratings (
          imdb_id,
          user_id,
          value,
          created_at,
          updated_at
      ) VALUES ($1,$2,$3,$4,$5)
      ON CONFLICT (imdb_id, user_id) DO NOTHING`,
    [r.imdb_id, localUserId, r.value, r.created_at, r.updated_at],
  )
}
console.log(`Migrated ${ratingsData.length} rows from 'ratings' table`)

console.log('Migration complete.')

await localClient.end()
