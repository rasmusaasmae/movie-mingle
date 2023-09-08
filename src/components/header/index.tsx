import Link from "next/link";
import ThemeDropdownMenu from "./theme-dropdown-menu";
import UserDropdownMenu from "./user-dropdown-menu";
import SignInButton from "./sign-in-button";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 w-full backdrop-filter backdrop-blur-md">
      <div className="max-w-screen-xl mx-auto px-8">
        <div className="h-14 flex items-center justify-between">
          <div className="flex space-x-4">
            <Link
              href="/"
              className="mr-8 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:cursor-pointer transition-colors"
            >
              Movie Mingle
            </Link>
          </div>
          <nav></nav>
          <div className="flex space-x-4 items-center">
            <ThemeDropdownMenu />
            <SignInButton />
            <UserDropdownMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
