import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/providers";
import { cn } from "@/utils/shadcn";
import Header from "@/app/header";

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
          "min-h-screen w-screen bg-white text-gray-800 dark:bg-gray-950 dark:text-gray-200",
        )}
      >
        <Providers>
          <>
            <Header />
            {children}
          </>
        </Providers>
      </body>
    </html>
  );
}
