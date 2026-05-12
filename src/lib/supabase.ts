// lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseUrl = "https://trhcxavyxuqdxsalluif.supabase.co";
const supabaseAnonKey = "sb_publishable__nF38Jb9PCqk-2E4ndw-RA_Jqj5Iems";

// Singleton — safe to import anywhere in the app
export const supabase = createClient(supabaseUrl, supabaseAnonKey);