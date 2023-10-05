"use client";

import { createContext, useState, useEffect, useContext } from "react";
import {
  type Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useQueryClient } from "react-query";

const AuthContext = createContext<{
  session: Session | null | undefined;
  signIn: (redirectTo?: string) => void;
  signOut: () => void;
}>({
  session: null,
  signIn: () => {},
  signOut: () => {},
});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClientComponentClient();
  const queryClient = useQueryClient();
  const [session, setSession] = useState<Session | null | undefined>();

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
    await queryClient.invalidateQueries({ queryKey: ["rating"] });
  }

  async function signOut() {
    await supabase.auth.signOut();
    await queryClient.invalidateQueries({ queryKey: ["rating"] });
  }

  return (
    <AuthContext.Provider value={{ session, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
