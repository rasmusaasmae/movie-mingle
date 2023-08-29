import Link from "next/link";
import ThemeMenu from "./themeMenu";
import UserMenu from "./userMenu";
import SignInButton from "./signInButton";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-30 w-full backdrop-filter backdrop-blur-md">
      <div className="max-w-screen-xl mx-auto px-8">
        <div className="h-14 flex items-center justify-between">
          <div className="flex space-x-4">
            <Link
              href="/"
              className="mr-8 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:cursor-pointer transition-colors"
            >
              Movie Mingle
            </Link>
            <Link
              href="/movies"
              className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:cursor-pointer transition-colors"
            >
              Ranking
            </Link>
          </div>
          <div className="flex space-x-4 items-center">
            <ThemeMenu />
            <SignInButton />
            <UserMenu />
          </div>
        </div>
      </div>
    </nav>
  );
}
