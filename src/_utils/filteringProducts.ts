import { supabaseClient } from '@/_lib/supabaseClient';

export async function getFilteredProducts(
  restaurantId: string,
  filterValue: string
) {
  let query = supabaseClient
    .from('products')
    .select('*')
    .eq('restaurant_id', restaurantId);

  if (filterValue !== 'all') {
    query = query.ilike('product_tag', `%${filterValue}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data || [];
}
