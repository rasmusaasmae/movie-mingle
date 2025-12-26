'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { signOut, useSession } from '@/auth/client'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { LogOutIcon } from 'lucide-react'

export const UserMenu = () => {
  const pathname = usePathname()
  const { data: session, isPending } = useSession()
  const router = useRouter()

  if (isPending || pathname === '/login' || pathname === '/signup') {
    return null
  }

  if (!session) {
    return (
      <Button variant="ghost" asChild>
        <Link href={`/login?redirect=${encodeURIComponent(pathname)}`}>Login</Link>
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
