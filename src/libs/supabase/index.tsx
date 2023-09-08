import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl)
  throw new Error("Missing Supabase URL in environment variables");
if (!supabaseKey)
  throw new Error("Missing Supabase Key in environment variables");

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
