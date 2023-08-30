import { NextRequest, NextResponse } from "next/server";
import { YTS_BASE_URL } from "@/constants/yts";
import { ytsMoviesSchema } from "@/schemas/yts";
import type { Movies } from "@/schemas/movie";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query_term");
  if (query === null || query === "") return NextResponse.json([]);

  const response = await fetch(
    `${YTS_BASE_URL}/list_movies.json?` + request.nextUrl.searchParams,
  );
  const body = await response.json();
  const movies = ytsMoviesSchema.parse(body.data.movies ?? []);

  const result: Movies = movies.map(
    ({
      id,
      url,
      title,
      slug,
      year,
      runtime,
      imdb_code,
      rating,
      genres,
      description,
      language,
      mpa_rating,
      small_cover_image,
      medium_cover_image,
      large_cover_image,
    }) => ({
      id: String(id),
      url,
      title,
      slug,
      year,
      runtime,
      imdbCode: imdb_code,
      imdbRating: rating,
      genres: genres.map((g) => {
        if (g === "Film-Noir") return "FilmNoir";
        else if (g === "Game-Show") return "GameShow";
        else if (g === "Reality-TV") return "RealityTV";
        else if (g === "Sci-Fi") return "SciFi";
        else if (g === "Talk-Show") return "TalkShow";
        else return g;
      }),
      description,
      language,
      mpaRating: mpa_rating,
      smallCoverImage: small_cover_image,
      mediumCoverImage: medium_cover_image,
      largeCoverImage: large_cover_image,
      avgRating: undefined,
      userRating: undefined,
    }),
  );

  return NextResponse.json(result);
}
