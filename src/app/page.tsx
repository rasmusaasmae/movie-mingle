"use client";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [value, setValue] = useState<string>("");
  const [movies, setMovies] = useState<any[]>([]);

  function handleChange(event: any) {
    setValue(event.target.value);
    let name = event.target.value;
    console.log(event.target.value);

    let url =
      "https://yts.mx/api/v2/list_movies.json?query_term=" +
      name +
      "&sort_by=rating";

    axios.get(url).then(
      (response) => {
        let data = response.data.data;
        let array = [];
        console.log(data);
        if (data.movies == undefined) {
          return;
        }
        for (let i = 0; i < data.movies.length; i++) {
          // console.log(data.movies);
          let movie = {
            name: "",
            year: 0,
            image: "",
          };
          if (data.movies[i].title == undefined) {
            continue;
          }
          movie.name = data.movies[i].title;
          movie.year = data.movies[i].year;
          movie.image = data.movies[i].medium_cover_image;
          movie.image = data.movies[i].small_cover_image;
          array.push(movie);
        }
        setMovies(array);
      },
      (error) => {
        console.log(error);
      },
    );
  }

  return (
    <main>
      <div className="flex justify-center"></div>
      <input
        type="text"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={value}
        onChange={(e) => handleChange(e)}
      />
      <ul>
        {movies.map((movie) => (
          <li key={movie.name}>
            {movie.name + " (" + movie.year + ")"}
            <Image src={movie.image} alt={movie.name} />
          </li>
        ))}
      </ul>
    </main>
  );
}
