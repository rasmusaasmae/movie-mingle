import MovieSearch from "@/components/movie-search";

export default function Home() {
  return (
    <main className="flex flex-col w-full h-full max-w-lg px-6 mx-auto items-center mt-6">
      <MovieSearch className="h-[calc(100vh-5rem)]" />
    </main>
  );
}
