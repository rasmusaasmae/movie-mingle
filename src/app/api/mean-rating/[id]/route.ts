import { NextRequest, NextResponse } from "next/server";
import _ from "lodash";
import prisma from "@/libs/prisma";
import { type MeanRating } from "@/schemas/rating";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    // Get movie
    const movie = await prisma.movie.findUnique({
      where: { id: params.id },
      include: { ratings: true },
    });
    if (movie === null) return NextResponse.json(null);

    // Calculate mean rating
    const mean = _.meanBy(movie.ratings, "rating");

    // Return mean rating
    const response: MeanRating = { mean };
    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
