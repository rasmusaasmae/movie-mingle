import { type Database } from "@/lib/supabase/types";

export type Torrent = Database["public"]["Tables"]["torrents"]["Row"];
