import "./globals.css";
import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/providers";
import Header from "@/components/header";
import { cn } from "@/utils/shadcn";
import Footer from "@/components/footer";
import { Separator } from "@/components/ui/separator";

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
      <body
        className={cn(
          inter.className,
          "w-screen h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200",
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
