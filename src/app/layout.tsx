import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/providers";
import Navbar from "@/components/navbar";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie Mingle",
  description: "Movie rating website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
    <body className={inter.className}>
    <Providers>
      <div
        className="w-screen min-h-screen bg-white dark:bg-gradient-to-br dark:from-slate-950 dark:to-slate-900 text-black dark:text-white">
        <Navbar />
        {children}
      </div>
    </Providers>
    </body>
    </html>
  );
}
