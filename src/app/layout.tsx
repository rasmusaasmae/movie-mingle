import "./globals.css";
import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/providers";
import Header from "@/components/header";

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
          <div className="w-screen min-h-screen bg-white dark:bg-gradient-to-br dark:from-slate-950 dark:to-slate-900 text-slate-800 dark:text-slate-200">
            <Header />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
