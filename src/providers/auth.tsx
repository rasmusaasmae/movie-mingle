"use client";

import {
  type Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext<{
  session: Session | null;
  signIn: () => void;
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
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });
  }, []);

  function signIn() {
    supabase.auth.signInWithOAuth({ provider: "google" });
  }

  function signOut() {
    supabase.auth.signOut();
  }

  return (
    <AuthContext.Provider value={{ session, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
