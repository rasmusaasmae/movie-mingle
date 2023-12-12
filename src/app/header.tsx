import Link from "next/link";

import SearchDialog from "@/components/search-dialog";
import SignInButton from "@/components/sign-in-button";
import ThemeDropdownMenu from "@/components/theme-dropdown-menu";
import UserDropdownMenu from "@/components/user-dropdown-menu";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-md backdrop-filter">
      <div className="mx-auto max-w-screen-xl px-8">
        <div className="flex h-14 items-center justify-between space-x-8">
          <Link href="/">
            <h1 className="mx-4 inline-block bg-gradient-to-r from-green-600 to-indigo-500 bg-clip-text text-xl font-semibold text-transparent">
              Movie Mingle
            </h1>
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
