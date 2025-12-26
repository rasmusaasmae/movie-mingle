import { defineConfig } from 'drizzle-kit'

if (
  !process.env.DATABASE_USER ||
  !process.env.DATABASE_PASSWORD ||
  !process.env.DATABASE_PORT ||
  !process.env.DATABASE_NAME
) {
  throw new Error('DATABASE_USER, DATABASE_PASSWORD, DATABASE_PORT, and DATABASE_NAME must be set')
}

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@localhost:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
  },
})
