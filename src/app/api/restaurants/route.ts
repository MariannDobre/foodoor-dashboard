import { supabaseClient } from '@/_lib/supabaseClient';
import { NextResponse } from 'next/server';
// import { notFound } from 'next/navigation';

export async function GET() {
  try {
    const { data, error } = await supabaseClient
      .from('restaurants')
      .select('*')
      .order('name');

    if (error) {
      console.error('[Supabase Error]', error);
      // notFound();
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
