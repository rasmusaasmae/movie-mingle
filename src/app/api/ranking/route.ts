import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const ranking = await prisma.rating.groupBy({
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
  return NextResponse.json({ ranking });
}
