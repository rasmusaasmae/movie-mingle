import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import _ from "lodash";
import { Movies } from "@/schemas/movie";

export async function GET(request: Request) {
  const movies = await prisma.movie.findMany({
    include: { ratings: true },
  });
  const session = await getServerSession(authOptions);
  const user = session?.user?.email
    ? await prisma.user.findUnique({
      where: { email: session.user.email },
    })
    : null;
  const result: Movies = movies.map((movie) => {
    const { ratings, ...rest } = movie;
    const avgRating = _.mean(ratings.map((r) => r.rating));
    const userRating = ratings.find((r) => r.userId === user?.id);
    return {
      ...rest,
      avgRating,
      userRating: userRating
        ? { rating: userRating.rating, updatedAt: userRating.updatedAt }
        : undefined,
    };
  });
  return NextResponse.json(result);
}
