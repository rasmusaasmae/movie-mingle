"use client";

import { signOut, useSession } from "next-auth/react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserDropdownMenu() {
  const { data: session, status } = useSession();

  async function handleSignOut() {
    await signOut().catch();
  }

  if (status === "unauthenticated") return null;
  if (status === "loading") return null;

  const imageSrc = session?.user?.image;
  const name = session?.user?.name ?? "";

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
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
