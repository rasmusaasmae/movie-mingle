import { type Database } from "@/lib/supabase/types";

export type Movie = Database["public"]["Views"]["movies"]["Row"];
