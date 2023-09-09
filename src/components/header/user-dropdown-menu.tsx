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

export default function UserDropdownMenu() {
  const { session, signOut } = useAuth();

  if (!session) return null;

  const imageSrc = session.user.user_metadata.avatar_url;
  const name = session.user.user_metadata.full_name;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          {
            <Avatar className="w-7 h-7">
              {imageSrc !== null && <AvatarImage src={imageSrc} />}
              <AvatarFallback>{name[0]}</AvatarFallback>
            </Avatar>
          }
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={signOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}