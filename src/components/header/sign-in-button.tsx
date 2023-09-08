"use client";

import { useAuth } from "@/providers/auth";
import { Button } from "@/components/ui/button";

export default function SignInButton() {
  const { session, signIn } = useAuth();

  if (session) return null;

  return (
    <Button variant="ghost" onClick={signIn}>
      Sign in
    </Button>
  );
}
