import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Footer from "@/app/_components/footer";
import Header from "@/app/_components/header";
import QueryProvider from "@/app/_components/query-provider";
import ThemeProvider from "@/app/_components/theme-provider";
import { Separator } from "@/components/ui/separator";
import { AuthProvider } from "@/contexts/auth";
import { cn } from "@/lib/utils";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie Mingle",
  description:
    "Movie Mingle is an invite-only movie rating website for the few true and honest movie raters out there.",
  keywords: ["Movies", "User Ratings", "Synopsis", "Photos", "Reviews"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          "w-screen bg-gradient-radial-top-middle from-violet-200 to-white bg-fixed text-slate-800 dark:from-slate-900 dark:to-slate-950 dark:text-slate-200",
        )}
      >
        <QueryProvider>
          <AuthProvider>
            <ThemeProvider>
              <Header />
              {children}
              <Separator />
              <Footer />
            </ThemeProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
