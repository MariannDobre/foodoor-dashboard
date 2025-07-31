import { supabaseClient } from '@/_lib/supabaseClient';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { data, error } = await supabaseClient
      .from('products')
      .select('*, restaurants (name)')
      .order('name');

    if (error) {
      console.error('[Supabase Error]', error);
      return NextResponse.json({ error: error?.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('[Unexpected Error]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
