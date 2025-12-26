import * as schema from './schema'
import { Pool } from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'

if (
  !process.env.DATABASE_USER ||
  !process.env.DATABASE_PASSWORD ||
  !process.env.DATABASE_PORT ||
  !process.env.DATABASE_NAME
) {
  throw new Error('DATABASE_USER, DATABASE_PASSWORD, DATABASE_PORT, and DATABASE_NAME must be set')
}

const pool = new Pool({
  connectionString: `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@localhost:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
})

export const db = drizzle(pool, { schema, casing: 'snake_case' })
