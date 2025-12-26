import { createClient } from '@supabase/supabase-js'
import pkg from 'pg'
const { Client } = pkg

const users = [
  {
    // Rasmus
    supabaseUserId: '3d6a1ab5-1d0d-4092-83d8-be7d47a83a95',
    localUserId: 'GuibNQBYcD9ZFVLTKYx2FeKKSs8HjvA5',
  },
]

const userMap = {}
users.forEach((u) => {
  userMap[u.supabaseUserId] = u.localUserId
})

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

const localClient = new Client({
  host: 'localhost',
  port: 5433,
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

let moviesUpserted = 0
for (const m of movies) {
  const { rowCount } = await localClient.query(
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
    ON CONFLICT (imdb_id) DO UPDATE SET
        tmdb_id = EXCLUDED.tmdb_id,
        title = EXCLUDED.title,
        year = EXCLUDED.year,
        overview = EXCLUDED.overview,
        poster_path = EXCLUDED.poster_path,
        backdrop_path = EXCLUDED.backdrop_path,
        genre_ids = EXCLUDED.genre_ids,
        imdb_vote_count = EXCLUDED.imdb_vote_count,
        imdb_vote_mean = EXCLUDED.imdb_vote_mean,
        tmdb_vote_count = EXCLUDED.tmdb_vote_count,
        tmdb_vote_mean = EXCLUDED.tmdb_vote_mean,
        updated_at = now()`,
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
  moviesUpserted += rowCount ?? 0
}
console.log(`Movies: total=${movies.length} inserted=${moviesUpserted}`)

const { data: watchedData, error: watchedError } = await supabase.from('watched').select('*')

if (watchedError) {
  console.error('Error fetching watched from Supabase:', watchedError)
  process.exit(1)
}

let watchedUpserted = 0
let watchedSkipped = 0

for (const w of watchedData) {
  const localUserId = userMap[w.user_id]
  if (!localUserId) {
    watchedSkipped++
    continue
  }

  const { rowCount } = await localClient.query(
    `INSERT INTO watched (
          imdb_id,
          user_id,
          date,
          created_at,
          updated_at
      ) VALUES ($1,$2,$3,now(),now())
      ON CONFLICT (imdb_id, user_id) DO UPDATE SET
          date = EXCLUDED.date,
          updated_at = now()`,
    [w.imdb_id, localUserId, w.date],
  )
  watchedUpserted += rowCount ?? 0
}
console.log(
  `Watched: total=${watchedData.length} inserted=${watchedUpserted} skipped=${watchedSkipped}`,
)

const { data: ratingsData, error: ratingsError } = await supabase.from('ratings').select('*')

if (ratingsError) {
  console.error('Error fetching ratings from Supabase:', ratingsError)
  process.exit(1)
}

let ratingsUpserted = 0
let ratingsSkipped = 0

for (const r of ratingsData) {
  const localUserId = userMap[r.user_id]
  if (!localUserId) {
    ratingsSkipped++
    continue
  }

  // Ensure value is within 0-10
  let value = parseFloat(r.value)
  if (value < 0) value = 0
  if (value > 10) value = 10

  const { rowCount } = await localClient.query(
    `INSERT INTO ratings (
          imdb_id,
          user_id,
          value,
          created_at,
          updated_at
      ) VALUES ($1,$2,$3,$4,$5)
      ON CONFLICT (imdb_id, user_id) DO UPDATE SET
          value = EXCLUDED.value,
          updated_at = now()`,
    [r.imdb_id, localUserId, value, r.created_at, r.updated_at],
  )
  ratingsUpserted += rowCount ?? 0
}
console.log(
  `Ratings: total=${ratingsData.length} inserted=${ratingsUpserted} skipped=${ratingsSkipped}`,
)

console.log('Migration complete.')
await localClient.end()
