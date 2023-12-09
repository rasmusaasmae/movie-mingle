import Link from "next/link";

import ThemeDropdownMenu from "@/components/theme-dropdown-menu";
import UserDropdownMenu from "@/components/user-dropdown-menu";
import SignInButton from "@/components/sign-in-button";
import SearchDialog from "../components/search-dialog";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-md backdrop-filter">
      <div className="mx-auto max-w-screen-xl px-8">
        <div className="flex h-14 items-center justify-between">
          <Link
            href="/"
            className="mr-8 rounded-md bg-white px-4 py-2 text-lg font-semibold text-slate-700 transition-colors hover:cursor-pointer hover:text-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:text-slate-200"
          >
            Movie Mingle
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
