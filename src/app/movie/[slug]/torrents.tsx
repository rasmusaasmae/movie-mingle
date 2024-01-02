import _ from "lodash";
import { Magnet } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getTorrents } from "@/lib/supabase/torrents/server";

type TorrentsProps = {
  imdbId: string;
};

export default async function Torrents({ imdbId }: TorrentsProps) {
  const torrents = await getTorrents(imdbId);
  const sorted = _.orderBy(
    torrents,
    function (t) {
      let weight = 0;

      if (t.quality === "2160p") weight += 30;
      else if (t.quality === "1080p") weight += 20;
      else if (t.quality === "720p") weight += 10;

      if (t.type === "bluray") weight += 2;
      else if (t.type === "web") weight += 1;

      return weight;
    },
    ["desc"],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Magnet className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {sorted.map((t) => (
            <DropdownMenuItem key={t.hash}>
              <Link href={t.magnet} target="_top" className="capitalize">
                {t.quality} {t.type} (
                {(t.size_bytes / (1024 * 1024 * 1024)).toFixed(1)} GB)
              </Link>
            </DropdownMenuItem>
          ))}
          {sorted.length === 0 && (
            <DropdownMenuItem disabled>No torrents found</DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
