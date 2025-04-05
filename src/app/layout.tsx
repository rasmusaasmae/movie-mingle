import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Footer from "@/app/_components/footer";
import Header from "@/app/_components/header";
import QueryProvider from "@/app/_components/query-provider";
import ThemeProvider from "@/app/_components/theme-provider";
import { Separator } from "@/components/ui/separator";
import { AuthProvider } from "@/contexts/auth";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Movie Mingle",
  description:
    "Movie Mingle is an invite-only movie rating website for the few true and honest movie raters out there.",
  keywords: ["Movies", "User Ratings", "Synopsis", "Photos", "Reviews"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
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
