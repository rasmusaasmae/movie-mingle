"use client";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function SignInButton() {
  const { status } = useSession();
  async function handleSignIn() {
    await signIn("google").catch();
  }
  if (status === "authenticated") return null;
  if (status === "loading") return null;
  return (
    <Button variant="ghost" onClick={handleSignIn}>
      Sign in
    </Button>
  );
}
