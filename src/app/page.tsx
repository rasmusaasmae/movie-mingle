import MovieCard from "@/components/movie-card";

export default function Home() {
  const myArray = ["a", "asd", "Dsa", "as", "dsda", "ddkkk", "ad", "ss"];

  return (
    <main className="mt-10 flex w-screen flex-col items-center gap-6 border border-red-300 pb-8">
      <div className="relative h-64 w-full max-w-7xl">
        <div className="flex h-full w-full flex-row space-x-4 overflow-x-auto border-yellow-200">
          {myArray.map((val) => (
            <MovieCard
              tmdb_id={808}
              title={val}
              poster_path={"2yYP0PQjG8zVqturh1BAqu2Tixl.jpg"}
              key={val}
            />
          ))}
        </div>
        <div className="absolute bottom-0 right-0 top-0 h-full w-24 bg-gradient-to-r from-transparent to-slate-950" />
      </div>
    </main>
  );
}
