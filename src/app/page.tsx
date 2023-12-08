import MovieCard from "@/components/movie-card";

export default function Home() {
  const myArray = ["a", "asd", "Dsa", "as", "dsda", "ddkkk", "ad", "ss"];

  return (
    <main
      className="w-screen border border-red-300 pb-8 flex flex-col items-center gap-6 mt-10">
      <div className="relative h-64 w-full max-w-7xl">
        <div
          className="flex flex-row space-x-4 h-full w-full overflow-x-auto border-yellow-200">
          {
            myArray.map(val => (
                <MovieCard tmdb_id={808} title={val}
                           poster_path={"2yYP0PQjG8zVqturh1BAqu2Tixl.jpg"}
                           key={val} />
              ),
            )
          }

        </div>
        <div
          className="w-24 h-full bg-gradient-to-r from-transparent to-slate-950 absolute right-0 top-0 bottom-0" />
      </div>
    </main>
  );

}
