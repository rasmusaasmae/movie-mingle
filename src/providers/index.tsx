import QueryProvider from "./QueryProvider";
import NextAuthProvider from "./AuthProvider";
import ThemeProvider from "./ThemeProvider";
import React from "react";

export default function Providers({ children }: {
  children: React.ReactNode
}) {
  return (
    <QueryProvider>
      <NextAuthProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </NextAuthProvider>
    </QueryProvider>
  );
}
