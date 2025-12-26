import { betterAuth } from 'better-auth'
import { db } from '@/db'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

if (
  !process.env.NEXT_PUBLIC_APP_URL ||
  !process.env.GOOGLE_CLIENT_ID ||
  !process.env.GOOGLE_CLIENT_SECRET
) {
  throw new Error('NEXT_PUBLIC_APP_URL, GOOGLE_CLIENT_ID, and GOOGLE_CLIENT_SECRET must be set')
}

export const auth = betterAuth({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
})
