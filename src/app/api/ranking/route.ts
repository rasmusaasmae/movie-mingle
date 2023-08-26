import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const result = await prisma.rating.groupBy({
    by: "movieId",
    orderBy: {
      _avg: {
        rating: "desc",
      },
    },
    _avg: {
      rating: true,
    },
    take: 10,
  });
  const ranking = result.map((m) => ({
    id: m.movieId,
    avgRating: m._avg.rating,
  }));
  return NextResponse.json(ranking);
}
