import Image from "next/image";
import Link from "next/link";

import SearchDialog from "@/components/search-dialog";
import SignInButton from "@/components/sign-in-button";
import UserDropdownMenu from "@/components/user-dropdown-menu";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-md backdrop-filter">
      <div className="mx-auto max-w-screen-xl px-4 pb-2 sm:px-8 sm:pb-0">
        <div className="flex h-14 items-center justify-between space-x-2 sm:space-x-8">
          <Link href="/">
            <div className="mx-4 flex flex-row items-center space-x-2">
              <div className="relative h-8 w-8">
                <Image
                  src="/logo.png"
                  alt="Movie Mingle"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <h1 className="text-xl font-semibold sm:text-2xl">
                Movie Mingle
              </h1>
            </div>
          </Link>
          <nav></nav>
          <div className="flex items-center space-x-1 sm:space-x-4">
            <span className="hidden sm:inline-block">
              <SearchDialog />
            </span>
            <SignInButton />
            <UserDropdownMenu />
          </div>
        </div>
        <div className="grid w-full place-items-center sm:hidden">
          <SearchDialog className="w-fill" />
        </div>
      </div>
    </header>
  );
}
