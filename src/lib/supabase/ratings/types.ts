import { type Database } from "@/lib/supabase/types";

export type UserRating = Database["public"]["Tables"]["ratings"]["Row"];
