"use client";

import { usePathname, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth";
import { getBaseUrl } from "@/utils/url";

export default function SignInButton() {
  const { session, signIn } = useAuth();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (session || session === undefined) return null;

  return (
    <Button
      variant="ghost"
      onClick={() =>
        signIn(getBaseUrl() + pathname + "?" + searchParams.toString())
      }
    >
      Sign in
    </Button>
  );
}
