import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import RatingWrapper from "./rating-wrapper";

type IMDbRatingProps = {
  imdb_code: string;
  rating: number | null;
};

export default async function IMDbRating({
  imdb_code,
  rating,
}: IMDbRatingProps) {
  return (
    <RatingWrapper title="IMDb rating">
      <Button asChild variant="outline" className="flex flex-row space-x-3">
        <Link href={`https://www.imdb.com/title/${imdb_code}`} target="_blank">
          <Image src="/imdb.svg" alt="IMDb Rating" height={18} width={41} />
          <div className="text-lg self-center">
            <span className="font-bold">{rating ?? "-"}</span>/10
          </div>
        </Link>
      </Button>
    </RatingWrapper>
  );
}
