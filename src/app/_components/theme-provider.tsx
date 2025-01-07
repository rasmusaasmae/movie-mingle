"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      {...props}
      attribute="class"
      defaultTheme="dark"
      forcedTheme="dark"
    >
      {children}
    </NextThemesProvider>
  );
}
