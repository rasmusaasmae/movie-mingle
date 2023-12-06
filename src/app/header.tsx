import Link from "next/link";

import ThemeDropdownMenu from "@/components/theme-dropdown-menu";
import UserDropdownMenu from "@/components/user-dropdown-menu";
import SignInButton from "@/components/sign-in-button";
import SearchDialog from "../components/search-dialog";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 w-full backdrop-filter backdrop-blur-md">
      <div className="max-w-screen-xl mx-auto px-8">
        <div className="h-14 flex items-center justify-between">
          <Link
            href="/"
            className="mr-8 py-2 px-4 rounded-md text-lg font-semibold bg-white dark:bg-slate-950 text-slate-700 hover:text-slate-800 dark:text-slate-300 dark:hover:text-slate-200 hover:cursor-pointer transition-colors"
          >
            Movie Mingle
          </Link>
          <nav></nav>
          <div className="flex space-x-4 items-center">
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
