import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  // Check auth
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email)
    return NextResponse.json({ error: "Not logged in" });

  // Get all user ratings
  const user = await prisma.user.findUniqueOrThrow({
    where: { email: session.user.email },
  });
  const ratings = await prisma.rating.findMany({
    where: { author: user },
    select: {
      movieId: true,
      rating: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return NextResponse.json(ratings);
}

export async function POST(request: Request) {
  // Check auth
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email)
    return NextResponse.json({ error: "Not logged in" });

  // Update rating
  const { movieId, movieRating } = await request.json();
  const rating = await prisma.rating.create({
    data: {
      movieId,
      rating: movieRating,
      author: { connect: { email: session?.user?.email } },
    },
  });

  return NextResponse.json({ rating });
}
