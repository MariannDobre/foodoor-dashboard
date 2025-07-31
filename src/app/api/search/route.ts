// /app/api/search/route.ts
import { supabaseClient } from '@/_lib/supabaseClient';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.toLowerCase() || '';

  if (q.length < 3) {
    return NextResponse.json([], { status: 200 });
  }

  const { data, error } = await supabaseClient
    .from('restaurants')
    .select('id, name')
    .ilike('name', `%${q}%`) // case-insensitive partial match
    .order('name');

  if (error) {
    console.error('[Supabase Error]', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}
