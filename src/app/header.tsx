import Link from "next/link";

import SearchDialog from "@/components/search-dialog";
import SignInButton from "@/components/sign-in-button";
import ThemeDropdownMenu from "@/components/theme-dropdown-menu";
import UserDropdownMenu from "@/components/user-dropdown-menu";
import Image from "next/image";
import logo from "../../public/logo.png";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-md backdrop-filter">
      <div className="mx-auto max-w-screen-xl px-8">
        <div className="flex h-14 items-center justify-between space-x-8">
          <Link href="/">
            <div className="mx-4 flex flex-row items-center space-x-2">
              <Image
                src={logo}
                alt="Movie Mingle"
                className="h-8 w-8 rounded-md bg-gradient-to-r from-slate-950 to-slate-900 dark:rounded-none dark:from-transparent dark:to-transparent"
              />
              <h1 className="text-2xl font-semibold">Movie Mingle</h1>
            </div>
          </Link>
          <nav></nav>
          <div className="flex items-center space-x-4">
            <SearchDialog />
            <ThemeDropdownMenu />
            <SignInButton />
            <UserDropdownMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
