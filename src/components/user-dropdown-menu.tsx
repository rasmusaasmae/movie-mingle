'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { LogOutIcon } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/contexts/auth'

export default function UserDropdownMenu() {
  const { session, signOut } = useAuth()

  if (!session) return null

  const avatarUrl = `${session.user.user_metadata.avatar_url}`
  const fullName = `${session.user.user_metadata.full_name}`
  const initials = fullName.length > 0 ? fullName[0] : ''

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Avatar className="h-7 w-7">
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link href="/ratings">Your ratings</Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem onClick={signOut} className="cursor-pointer">
          <LogOutIcon className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
