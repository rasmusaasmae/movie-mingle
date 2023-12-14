import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center bg-white px-2 dark:bg-slate-950 md:px-4">
      <div className="flex h-28 w-full max-w-7xl flex-row items-center justify-between">
        <p>&copy; 2023 Movie Mingle</p>
        <section className="flex flex-row">
          <Link
            href="https://github.com/rasmusaasmae/movie-mingle"
            className="flex flex-row items-center gap-1 transition-all hover:text-lg hover:font-semibold hover:text-black dark:hover:text-white"
          >
            <Github className="h-6 w-6" />
            <span>GitHub</span>
          </Link>
        </section>
        <p className="flex flex-row gap-2">
          <span>Metadata & images from</span>
          <Link href="https://www.themoviedb.org/">
            <Image alt="TMDb" src="/tmdb.svg" height={24} width={56} />
          </Link>
        </p>
      </div>
    </footer>
  );
}
