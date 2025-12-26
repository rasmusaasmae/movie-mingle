import { type NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/login' || pathname === '/signup') {
    const session = await auth.api.getSession({
      headers: request.headers,
    })

    if (session) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
