"use client";

import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth";
import { getBaseUrl } from "@/utils/url";

function SignInButton() {
  const { session, signIn } = useAuth();
  const pathname = usePathname();

  if (session !== null) return null;

  return (
    <Button variant="ghost" onClick={() => signIn(getBaseUrl() + pathname)}>
      Sign in
    </Button>
  );
}

export { SignInButton };
