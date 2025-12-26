import {
  check,
  date,
  integer,
  numeric,
  pgTable,
  primaryKey,
  real,
  text,
  timestamp,
} from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'
import { user } from './auth-schema'

export * from './auth-schema'

export const movies = pgTable('movies', {
  imdbId: text('imdb_id').primaryKey(),
  tmdbId: integer('tmdb_id').notNull().unique(),
  title: text('title'),
  year: integer('year'),
  overview: text('overview'),
  posterPath: text('poster_path'),
  backdropPath: text('backdrop_path'),
  genreIds: integer('genre_ids').array(),
  imdbVoteCount: integer('imdb_vote_count'),
  imdbVoteMean: real('imdb_vote_mean'),
  tmdbVoteCount: integer('tmdb_vote_count'),
  tmdbVoteMean: real('tmdb_vote_mean'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .$onUpdate(() => new Date())
    .defaultNow()
    .notNull(),
})

export const ratings = pgTable(
  'ratings',
  {
    imdbId: text('imdb_id')
      .notNull()
      .references(() => movies.imdbId),
    userId: text('user_id')
      .notNull()
      .references(() => user.id),
    value: numeric('value', { precision: 3, scale: 1, mode: 'number' }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .$onUpdate(() => new Date())
      .defaultNow()
      .notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.imdbId, table.userId] }),
    check('ratings_value_range', sql`${table.value} BETWEEN 0 AND 10`),
  ],
)

export const watched = pgTable(
  'watched',
  {
    imdbId: text('imdb_id')
      .notNull()
      .references(() => movies.imdbId),
    userId: text('user_id')
      .notNull()
      .references(() => user.id),
    date: date('date').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .$onUpdate(() => new Date())
      .defaultNow()
      .notNull(),
  },
  (table) => [primaryKey({ columns: [table.imdbId, table.userId] })],
)
