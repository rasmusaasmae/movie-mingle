'use client'

import { Button } from '@/components/ui/button'
import { getBaseUrl } from '@/utils/url'
import { useAuth } from '@/contexts/auth'
import { usePathname } from 'next/navigation'

function SignInButton() {
  const { session, signIn } = useAuth()
  const pathname = usePathname()

  if (session !== null) return null

  return (
    <Button variant="ghost" onClick={() => signIn(getBaseUrl() + pathname)}>
      Sign in
    </Button>
  )
}

export { SignInButton }
