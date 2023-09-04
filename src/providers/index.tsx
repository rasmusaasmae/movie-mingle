import React from "react";
import AuthProvider from "./auth";
import ThemeProvider from "./theme";
import QueryProvider from "./query";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
