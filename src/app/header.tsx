import Image from "next/image";
import Link from "next/link";

import SearchDialog from "@/components/search-dialog";
import SignInButton from "@/components/sign-in-button";
import ThemeDropdownMenu from "@/components/theme-dropdown-menu";
import UserDropdownMenu from "@/components/user-dropdown-menu";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-md backdrop-filter">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-8">
        <div className="flex h-14 items-center justify-between space-x-2 sm:space-x-8">
          <Link href="/">
            <div className="mx-4 flex flex-row items-center space-x-2">
              <Image
                src="/logo.png"
                alt="Movie Mingle"
                width={32}
                height={32}
                className="rounded-md bg-gradient-to-r from-slate-950 to-slate-900 dark:rounded-none dark:from-transparent dark:to-transparent"
              />
              <h1 className="text-2xl font-semibold">Movie Mingle</h1>
            </div>
          </Link>
          <nav></nav>
          <div className="flex items-center space-x-1 sm:space-x-4">
            <span className="hidden sm:inline-block">
              <SearchDialog />
            </span>
            <ThemeDropdownMenu />
            <SignInButton />
            <UserDropdownMenu />
          </div>
        </div>
        <div className="sm:hidden w-full grid place-items-center">
          <SearchDialog className="w-fill" />
        </div>
      </div>
    </header>
  );
}
