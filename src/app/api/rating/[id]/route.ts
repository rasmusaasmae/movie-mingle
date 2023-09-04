import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import prisma from "@/libs/prisma";
import { authOptions } from "@/libs/auth";
import { type Rating } from "@/schemas/rating";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    // Check auth
    const user = await getUser();
    if (user === null)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Get rating
    const rating = await prisma.rating.findUnique({
      where: {
        movieId_userId: { movieId: params.id, userId: user.id },
      },
    });

    // Return rating
    return NextResponse.json(rating);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    // Check auth
    const user = await getUser();
    if (user === null)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Parse rating
    const body = await request.json();
    const rating = z.number().parse(body.rating);

    // Make sure movie exists
    await prisma.movie.upsert({
      where: { id: params.id },
      create: { id: params.id },
      update: {},
    });

    // Set rating
    const newRating = await prisma.rating.upsert({
      where: { movieId_userId: { movieId: params.id, userId: user.id } },
      create: { rating, movieId: params.id, userId: user.id },
      update: { rating },
    });

    // Return rating
    const response: Rating = newRating;
    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

async function getUser() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  if (!email) return null;

  return await prisma.user.findUnique({
    where: { email },
  });
}
