import { createClient } from '@supabase/supabase-js';

const supabaseURL = process.env.SUPABASE_URL!;
const supabaseKEY = process.env.SUPABASE_KEY!;

if (!supabaseURL || !supabaseKEY) {
  throw new Error('Missing Supabase environment variables');
}

export const supabaseClient = createClient(supabaseURL, supabaseKEY);
