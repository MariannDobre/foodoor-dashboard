import { supabaseClient } from '@/_lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ restaurantId: string }> }
) {
  try {
    const { restaurantId } = await params;
    const { searchParams } = new URL(request.url);
    const filterValue = searchParams.get('productType') || 'all';

    let query = supabaseClient
      .from('products')
      .select('*')
      .eq('restaurant_id', restaurantId);

    if (filterValue !== 'all') {
      query = query.ilike('product_tag', `%${filterValue}%`);
    }

    const { data, error } = await query.order('name');

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
