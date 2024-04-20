"use client";

import { Session } from "@supabase/supabase-js";
import { useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";

import { createClient } from "@/utils/supabase/client";

export const AuthContext = createContext<{
  session: Session | null | undefined;
  signIn: (redirectTo?: string) => Promise<void>;
  signOut: () => Promise<void>;
}>({
  session: null,
  signIn: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const queryClient = useQueryClient();
  const [session, setSession] = useState<Session | null>();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });
  }, [supabase]);

  async function signIn(redirectTo?: string) {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });
    await queryClient.invalidateQueries({ queryKey: ["supabase"] });
  }

  async function signOut() {
    await supabase.auth.signOut();
    await queryClient.invalidateQueries({ queryKey: ["supabase"] });
  }

  return (
    <AuthContext.Provider value={{ session, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
