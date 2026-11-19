import { createClient } from "@supabase/supabase-js";

const DEFAULT_SUPABASE_URL = "https://kcabtdbzqczvzbzkdyjd.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY = "sb_publishable_IuRjHUVYDLGsFcrgOVxvQA_dpvngok6";

const supabaseUrl = 
  process.env.NEXT_PUBLIC_SUPABASE_URL || 
  process.env.SUPABASE_URL || 
  DEFAULT_SUPABASE_URL;

const supabaseKey = 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
  process.env.SUPABASE_ANON_KEY || 
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 
  DEFAULT_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

// Create Supabase client singleton
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
      },
    })
  : null;
