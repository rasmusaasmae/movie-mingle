"use client";

import type { ReactNode } from "react";
import { ThemeProvider as NextThemeProvider } from "next-themes";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return <NextThemeProvider attribute="class">{children}</NextThemeProvider>;
}
