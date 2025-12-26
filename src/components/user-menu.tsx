'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { signIn, signOut, useSession } from '@/auth/client'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { LogOutIcon } from 'lucide-react'
import { toast } from 'sonner'

export const UserMenu = () => {
  const path = usePathname()
  const { data: session, isPending } = useSession()
  const router = useRouter()

  const handleSignIn = async () => {
    const { error } = await signIn.social({
      provider: 'google',
      callbackURL: `${process.env.NEXT_PUBLIC_APP_URL}${path}`,
    })
    if (error) {
      toast.error(error.message ?? 'Failed to login')
    }
  }

  if (isPending) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <Avatar className="h-7 w-7 animate-pulse">
          <AvatarFallback />
        </Avatar>
      </Button>
    )
  }

  if (!session) {
    return (
      <Button onClick={handleSignIn}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
            fill="currentColor"
          />
        </svg>
        Login
      </Button>
    )
  }
  const { name, image } = session.user

  const initials = name.length > 0 ? name.charAt(0) : ''

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Avatar className="h-7 w-7">
            <AvatarImage src={image ?? ''} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="cursor-pointer justify-between px-4"
          onClick={async () => {
            await signOut()
            router.refresh()
          }}
        >
          <LogOutIcon className="h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
