import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Providers from "@/providers";
import { cn } from "@/utils/shadcn";
import Header from "@/app/header";
import Footer from "@/app/footer";
import { Separator } from "@/components/ui/separator";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie Mingle",
  description:
    "Movie Mingle is an exclusive movie rating website for the few true and honest movie raters out there.",
  keywords: [
    "Movies",
    "User Ratings",
    "Synopsis",
    "Photos",
    "Reviews",
    "Trailers",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "w-screen bg-gradient-radial-top-middle from-violet-200 to-white bg-fixed text-slate-800 dark:from-slate-900  dark:to-slate-950 dark:text-slate-200",
        )}
      >
        <Providers>
          <Header />
          {children}
          <Separator />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
