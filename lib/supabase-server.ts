import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/auth-helpers-nextjs';

export const createSupabaseServerClient = () =>
  createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies }
  );
