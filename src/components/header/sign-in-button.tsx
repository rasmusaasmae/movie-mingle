"use client";

import { useAuth } from "@/providers/auth";
import { Button } from "@/components/ui/button";
import { usePathname, useSearchParams } from "next/navigation";
import getBaseURL from "@/lib/get-base-url";

export default function SignInButton() {
  const { session, signIn } = useAuth();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (session || session === undefined) return null;

  return (
    <Button
      variant="ghost"
      onClick={() =>
        signIn(getBaseURL() + pathname + "?" + searchParams.toString())
      }
    >
      Sign in
    </Button>
  );
}
