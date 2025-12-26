# Migration Remaining Steps

## Completed

- [x] Drizzle ORM setup (schema, client, config)
- [x] Better Auth setup (server, client, API route)
- [x] Login/Signup pages with TanStack Form + Zod
- [x] Middleware for auth redirects
- [x] DB queries layer (pure data access)
- [x] Actions layer (auth + business logic)
- [x] Removed Supabase imports from codebase
- [x] Deleted src/utils/supabase/ folder

---

## Remaining

### 1. Remove Supabase packages

```bash
bun remove @supabase/ssr @supabase/supabase-js
```

### 2. Add server-only package

```bash
bun add server-only
```

Add `import 'server-only'` to `src/db/queries.ts`

### 3. Test with local PostgreSQL

- Start a local PostgreSQL database
- Set `DATABASE_URL` in `.env.local`
- Run migrations: `bunx drizzle-kit push`
- Test login/signup flow
- Test rating/watch date functionality

### 4. Docker setup for self-hosting

Create `Dockerfile`:

```dockerfile
FROM oven/bun:1 AS builder
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

FROM oven/bun:1-slim
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["bun", "server.js"]
```

Create `docker-compose.yml`:

```yaml
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/moviemingle
      - BETTER_AUTH_SECRET=${BETTER_AUTH_SECRET}
      - NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
    depends_on:
      - db

  db:
    image: postgres:16-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=moviemingle

volumes:
  postgres_data:
```

Update `next.config.ts`:

```typescript
output: 'standalone'
```

### 5. Data migration from Supabase

1. Export from Supabase dashboard (or CLI):
   - movies table
   - ratings table
   - watched table

2. Create migration script to import into new PostgreSQL

3. Users will need to re-register (password hashes are different)

### 6. Environment variables

Update `.env.local` for production:

```env
DATABASE_URL=postgres://user:password@host:5432/moviemingle
BETTER_AUTH_SECRET=your-secret
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

### 7. Deploy to Unraid/Coolify

- Push to git repo
- Connect Coolify to repo
- Set environment variables
- Deploy

---

## Optional improvements

- [ ] Add rate limiting to auth endpoints
- [ ] Add email verification flow
- [ ] Add password reset flow
- [ ] Add forgot password page
