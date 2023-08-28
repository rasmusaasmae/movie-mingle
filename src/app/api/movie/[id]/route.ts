import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { YTS_BASE_URL } from "@/constants/yts";
import { ytsMovieSchema } from "@/schemas/yts";
import _ from "lodash";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { Movie } from "@/schemas/movie";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const movieDB = await prisma.movie.findUnique({
    where: {
      id: params.id,
    },
    include: {
      ratings: true,
    },
  });

  if (movieDB !== null) {
    // Movie exists in database
    const session = await getServerSession(authOptions);
    const user = session?.user?.email
      ? await prisma.user.findUnique({
          where: { email: session.user.email },
        })
      : null;
    const { ratings, ...movie } = movieDB;
    const avgRating = _.mean(ratings.map((r) => r.rating));
    const userRating = ratings.find((r) => r.userId === user?.id);
    const result: Movie = {
      ...movie,
      avgRating,
      userRating: userRating
        ? { rating: userRating.rating, updatedAt: userRating.updatedAt }
        : undefined,
    };
    return NextResponse.json(result);
  } else {
    // Movie does not exist in database
    const response = await fetch(
      `${YTS_BASE_URL}/movie_details.json?movie_id=${params.id}`
    );
    const body = await response.json();
    const {
      url,
      title,
      slug,
      year,
      runtime,
      imdb_code,
      rating,
      description,
      language,
      mpa_rating,
      small_cover_image,
      large_cover_image,
      genres,
    } = ytsMovieSchema.parse(body.data.movie);

    const result: Movie = {
      id: params.id,
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
      largeCoverImage: large_cover_image,
      avgRating: undefined,
      userRating: undefined,
    };

    return NextResponse.json(result);
  }
}
