"use client";

import { LogOut } from "lucide-react";
import { useAuth } from "@/providers/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "./ui/separator";
import Link from "next/link";

export default function UserDropdownMenu() {
  const { session, signOut } = useAuth();

  if (session === null) return null;

  const imageSrc = session?.user.user_metadata.avatar_url;
  const name = session?.user.user_metadata.full_name ?? "";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          {
            <Avatar className="h-7 w-7">
              {imageSrc !== null && <AvatarImage src={imageSrc} />}
              <AvatarFallback>{name[0]}</AvatarFallback>
            </Avatar>
          }
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link href="/ratings">Your Ratings</Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem onClick={signOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
