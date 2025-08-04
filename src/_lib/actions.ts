'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { supabaseClient } from './supabaseClient';

import { auth, signIn, signOut } from '@/_lib/auth';
import {
  createCartIdentifier,
  getCartIdentifier,
} from '@/_utils/cartIdentifier';

// Actions for signing in and signing out the user
export async function signInAction() {
  await signIn('google', { redirectTo: '/account' });
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}

// Actions for getting and updating the user delivery data
export async function getUserDeliveryData() {
  // console.log('🔍 Action: Starting getting the user delivery data...');

  try {
    const session = await auth();
    // console.log('🔍 Action: Session from [getUserDeliveryData]:', session);

    if (!session?.user?.email) {
      console.log('❌ Action: No session or email found [getUserDeliveryData]');
      throw new Error('You must be logged in...');
    }

    // console.log('🔍 Action: Querying Supabase for email:', session.user.email);

    const { data, error } = await supabaseClient
      .from('users')
      .select('*')
      .eq('email', session.user.email);

    // console.log('🔍 Action: Supabase query result:', { data, error });

    if (error) {
      console.error('[Supabase Error]', error?.message);
      throw new Error(`Database error: ${error.message}`);
    }

    if (!data || data.length === 0) {
      console.log('❌ Action: No user found in database');
      throw new Error('No user found in database');
    }

    if (data.length > 1) {
      console.warn(
        `⚠️  Action: Multiple users found for email: ${session.user.email}`
      );
      return data[0];
    }

    // console.log('✅ Action: Successfully returning user data');
    return data[0];
  } catch (error) {
    console.error('[getUserData Error]', error);
    throw error;
  }
}

export async function updateDeliveryData(formData: FormData): Promise<void> {
  console.log('🔍 Action: Starting update delivery data...');

  const session = await auth();
  // console.log('🔍 Action: Session from [updateDeliveryData]:', session);

  if (!session) {
    console.log('❌ Action: No session found [updateDeliveryData]');
    throw new Error('You must be logged in...');
  }

  const cityRaw = formData.get('city');
  const addressRaw = formData.get('address');
  const phoneRaw = formData.get('phone_number');

  const city = typeof cityRaw === 'string' ? cityRaw.trim() : '';
  const address = typeof addressRaw === 'string' ? addressRaw.trim() : '';
  const phone_number = typeof phoneRaw === 'string' ? phoneRaw.trim() : '';

  // console.log('🔍 Action: Form data:', { city, address, phone_number });

  // ✅ Regex validations
  const cityRegex = /^[a-zA-Z\s\-'.]{2,100}$/; // only letters and common city characters
  const addressRegex = /^[\w\s.,'’\-#]{2,200}$/; // letters, numbers, punctuation, common symbols
  const phoneRegex = /^[0-9+\-\s]{6,20}$/; // numbers, plus, dash, spaces

  if (city && !cityRegex.test(city)) {
    console.log('❌ Action: City regex failed');
    throw new Error('Invalid city name. Allowed: letters, spaces, - and .');
  }

  if (address && !addressRegex.test(address)) {
    console.log('❌ Action: Address regex failed');
    throw new Error('Invalid address. Avoid special characters.');
  }

  if (phone_number && !phoneRegex.test(phone_number)) {
    console.log('❌ Action: Phone regex failed');
    throw new Error('Invalid phone number. Only numbers and basic symbols.');
  }

  // ✅ Only update fields that are present & valid
  const updateData: Record<string, string> = {};
  if (city) updateData.city = city;
  if (address) updateData.address = address;
  if (phone_number) updateData.phone_number = phone_number;

  if (Object.keys(updateData).length === 0) {
    console.log('❌ Action: No valid fields to update');
    throw new Error('No valid fields provided to update.');
  }

  // console.log('🔍 Action: Updating user with ID:', session?.user?.user_id);

  const { data, error } = await supabaseClient
    .from('users')
    .update(updateData)
    .eq('id', session?.user?.user_id)
    .select();

  // console.log('🔍 Action: Supabase update result:', { data, error });

  if (error) {
    console.error(`[Supabase Error: ]`, error?.message);
    throw new Error('The data could not be updated...');
  }

  // console.log('✅ Action: Successfully updated user data');
  revalidatePath('/account');
}

// Cart actions
async function ensureCartIdentifier(
  userId: number | null
): Promise<string | number> {
  if (userId) return userId;

  const existingId = await getCartIdentifier(userId);
  if (existingId) return existingId;

  // Create new cart identifier if none exists
  return await createCartIdentifier();
}

export async function getCartData(identifier: number | string | null) {
  try {
    if (!identifier) return [];

    const query = supabaseClient.from('cart').select('*, products(*)');

    const isUUID = typeof identifier === 'string' && identifier.includes('-');
    query.eq(isUUID ? 'cart_id' : 'user_id', identifier);

    const { data, error } = await query;

    if (error) {
      console.error('[Supabase Error & getCartData]', error.message);
      throw new Error(`Database error: ${error.message}`);
    }

    return data ?? [];
  } catch (error) {
    console.error('[getCartData Error]', error);
    throw error;
  }
}

export async function addToCart(productId: number, productPrice: number) {
  const session = await auth();
  const userId = session?.user?.user_id ?? null;

  const identifier = await ensureCartIdentifier(userId);

  const isUUID = typeof identifier === 'string' && identifier.includes('-');
  const idColumn = isUUID ? 'cart_id' : 'user_id';

  const query = supabaseClient
    .from('cart')
    .select('*')
    .eq(idColumn, identifier)
    .eq('product_id', productId);

  const { data: existingData, error: existingError } = await query;

  if (existingError) {
    console.error('[Supabase Error & addToCart-check]', existingError.message);
    throw new Error(`Database error: ${existingError.message}`);
  }

  if (existingData && existingData.length > 0) {
    const existing = existingData[0];

    const newQuantity = existing.total_quantity + 1;
    const newTotalPrice = parseFloat((productPrice * newQuantity).toFixed(2));

    const { error: updateError } = await supabaseClient
      .from('cart')
      .update({ total_quantity: newQuantity, total_price: newTotalPrice })
      .eq('product_id', productId)
      .eq(idColumn, identifier);

    if (updateError) {
      console.error('[Supabase Error & addToCart-update]', updateError.message);
      throw new Error('The product quantity could not be updated.');
    }
  } else {
    const insertPayload = {
      product_id: productId,
      total_quantity: 1,
      total_price: parseFloat(productPrice.toFixed(2)),
      [idColumn]: identifier,
    };

    const { error: insertError } = await supabaseClient
      .from('cart')
      .insert(insertPayload);

    if (insertError) {
      console.error('[Supabase Error & addToCart-insert]', insertError.message);
      throw new Error('The product could not be added to the cart.');
    }
  }

  revalidatePath('/');
}

export async function incrementQuantity(
  productId: number,
  productPrice: number
) {
  const session = await auth();
  const userId = session?.user?.user_id ?? null;

  const identifier = await ensureCartIdentifier(userId);

  const isUUID = typeof identifier === 'string' && identifier.includes('-');
  const idColumn = isUUID ? 'cart_id' : 'user_id';

  const query = supabaseClient
    .from('cart')
    .select('*')
    .eq(idColumn, identifier)
    .eq('product_id', productId);

  const { data: existingData, error: existingError } = await query;

  if (existingError) {
    console.error(
      '[Supabase Error & incrementQuantity-check]',
      existingError.message
    );
    throw new Error(`Database error: ${existingError.message}`);
  }

  if (existingData && existingData.length > 0) {
    const existing = existingData[0];
    const newQuantity = existing.total_quantity + 1;
    const newTotalPrice = parseFloat((productPrice * newQuantity).toFixed(2));

    const { error: updateError } = await supabaseClient
      .from('cart')
      .update({
        total_quantity: newQuantity,
        total_price: newTotalPrice,
      })
      .eq('product_id', productId)
      .eq(idColumn, identifier);

    if (updateError) {
      console.error(
        '[Supabase Error & incrementQuantity-update]',
        updateError.message
      );
      throw new Error('The product quantity could not be updated.');
    }
  }

  revalidatePath('/');
}

export async function decrementQuantity(
  productId: number,
  productPrice: number
) {
  const session = await auth();
  const userId = session?.user?.user_id ?? null;

  const identifier = await ensureCartIdentifier(userId);

  const isUUID = typeof identifier === 'string' && identifier.includes('-');
  const idColumn = isUUID ? 'cart_id' : 'user_id';

  const query = supabaseClient
    .from('cart')
    .select('*')
    .eq(idColumn, identifier)
    .eq('product_id', productId);

  const { data: existingData, error: existingError } = await query;

  if (existingError) {
    console.error(
      '[Supabase Error & decrementQuantity-check]',
      existingError.message
    );
    throw new Error(`Database error: ${existingError.message}`);
  }

  if (existingData && existingData.length > 0) {
    const existing = existingData[0];
    const newQuantity = existing.total_quantity - 1;

    if (newQuantity < 1) {
      await supabaseClient
        .from('cart')
        .delete()
        .eq('product_id', productId)
        .eq(idColumn, identifier);
      revalidatePath('/');
      return;
    } else {
      const newTotalPrice = parseFloat((productPrice * newQuantity).toFixed(2));

      const { error: updateError } = await supabaseClient
        .from('cart')
        .update({
          total_quantity: newQuantity,
          total_price: newTotalPrice,
        })
        .eq('product_id', productId)
        .eq(idColumn, identifier);

      if (updateError) {
        console.error(
          '[Supabase Error & decrementQuantity-update]',
          updateError.message
        );
        throw new Error('The product quantity could not be updated.');
      }
    }
  }

  revalidatePath('/');
}

export async function removeItem(productId: number) {
  const session = await auth();
  const userId = session?.user?.user_id ?? null;

  const identifier = await ensureCartIdentifier(userId);

  const isUUID = typeof identifier === 'string' && identifier.includes('-');
  const idColumn = isUUID ? 'cart_id' : 'user_id';

  const query = supabaseClient
    .from('cart')
    .select('id')
    .eq(idColumn, identifier)
    .eq('product_id', productId);

  const { data: existingData, error: existingError } = await query;

  if (existingError) {
    console.error('[Supabase Error & removeItem-check]', existingError.message);
    throw new Error(`Database error: ${existingError.message}`);
  }

  if (existingData && existingData.length > 0) {
    const { error: deletionError } = await supabaseClient
      .from('cart')
      .delete()
      .eq('product_id', productId)
      .eq(idColumn, identifier);

    if (deletionError) {
      console.error(
        '[Supabase Error & removeItem-delete]',
        deletionError.message
      );
      throw new Error('The product could not be removed.');
    }
  }

  revalidatePath('/');
}

// export async function placeOrder() {
//   const session = await auth();
//   const userId = session?.user?.user_id ?? null;

//   const identifier = await ensureCartIdentifier(userId);

//   console.log(`placeOrder execution process started: `, identifier);

//   const isUUID = typeof identifier === 'string' && identifier.includes('-');
//   const idColumn = isUUID ? 'cart_id' : 'user_id';

//   const { data: cartItems, error: cartError } = await supabaseClient
//     .from('cart')
//     .select('*, products(*)')
//     .eq(idColumn, identifier);

//   if (cartError || !cartItems || cartItems.length === 0) {
//     throw new Error('Cart is empty or failed to load.');
//   }

//   if (!isUUID) {
//     const { data: log, error: logError } = await supabaseClient
//       .from('logs')
//       .insert({ user_id: identifier })
//       .select()
//       .single();

//     if (logError || !log) {
//       console.error('Failed to insert log:', logError);
//       throw new Error('Failed to create order log.');
//     }

//     const logId = log.id;

//     const logItems = cartItems.map((item) => ({
//       log_id: logId,
//       product_id: item.products.id,
//       product_name: item.products.name,
//       product_price: item.products.price,
//       product_image: item.products.image,
//       total_quantity: item.total_quantity,
//       total_price: item.total_price,
//     }));

//     const { error: insertItemsError } = await supabaseClient
//       .from('log_items')
//       .insert(logItems);

//     if (insertItemsError) {
//       console.error(
//         `Failed to insert order items: `,
//         insertItemsError?.message
//       );
//       throw new Error('Failed to insert order items.');
//     }
//   }

//   const { error: deleteError } = await supabaseClient
//     .from('cart')
//     .delete()
//     .eq(idColumn, identifier);

//   if (deleteError) {
//     console.error('Failed to clear cart:', deleteError.message);
//     throw new Error('Failed to clear cart.');
//   }

//   console.log(
//     `✅ Order placed and cart cleared for ${
//       isUUID ? 'guest' : 'user'
//     }: ${identifier}`
//   );

//   revalidatePath('/');
// }

export async function placeOrder() {
  const session = await auth();
  const userId = session?.user?.user_id ?? null;

  const identifier = await ensureCartIdentifier(userId);

  console.log(`placeOrder execution process started: `, identifier);

  const isUUID = typeof identifier === 'string' && identifier.includes('-');
  const idColumn = isUUID ? 'cart_id' : 'user_id';

  const { data: cartItems, error: cartError } = await supabaseClient
    .from('cart')
    .select('*, products(*)')
    .eq(idColumn, identifier);

  if (cartError || !cartItems || cartItems.length === 0) {
    redirect('/cart?status=error&message=Cart is empty or failed to load');
  }

  if (!isUUID) {
    const { data: log, error: logError } = await supabaseClient
      .from('logs')
      .insert({ user_id: identifier })
      .select()
      .single();

    if (logError || !log) {
      console.error('Failed to insert log:', logError);
      redirect('/cart?status=error&message=Failed to create order log');
    }

    const logId = log.id;

    const logItems = cartItems.map((item) => ({
      log_id: logId,
      product_id: item.products.id,
      product_name: item.products.name,
      product_price: item.products.price,
      product_image: item.products.image,
      total_quantity: item.total_quantity,
      total_price: item.total_price,
    }));

    const { error: insertItemsError } = await supabaseClient
      .from('log_items')
      .insert(logItems);

    if (insertItemsError) {
      console.error(
        `Failed to insert order items: `,
        insertItemsError?.message
      );
      redirect('/cart?status=error&message=Failed to insert order items');
    }
  }

  const { error: deleteError } = await supabaseClient
    .from('cart')
    .delete()
    .eq(idColumn, identifier);

  if (deleteError) {
    console.error('Failed to clear cart:', deleteError.message);
    redirect('/cart?status=error&message=Failed to clear cart');
  }

  console.log(
    `✅ Order placed and cart cleared for ${
      isUUID ? 'guest' : 'user'
    }: ${identifier}`
  );

  // Success redirect
  redirect('/cart?status=success&message=Order placed successfully!');
}

export async function getLogIdentifier(userId: number | null) {
  if (!userId) {
    throw new Error('User ID is required to fetch log identifier.');
  }

  const { data, error } = await supabaseClient
    .from('logs')
    .select('*')
    .eq('user_id', userId);

  if (error || !data) {
    console.error('Failed to retrieve log identifier:', error);
    throw new Error('Failed to retrieve log identifier.');
  }

  return data;
}

// export async function getLogsItems(
//   userId: number | null,
//   logIds: number[] | null
// ) {
//   if (!userId || !logIds) {
//     throw new Error('User ID and Log ID are required to fetch log data.');
//   }

//   const { data, error } = await supabaseClient
//     .from('log_items')
//     .select('*')
//     // .eq('user_id', userId)
//     .in('log_id', logIds);

//   if (error || !data) {
//     console.error('Failed to retrieve log data:', error);
//     throw new Error('Failed to retrieve log data.');
//   }

//   return data;
// }

export async function getLogsItems(
  userId: number | null,
  logIds: number[] | null
) {
  if (!userId || !logIds) {
    throw new Error('User ID and Log ID are required to fetch log data.');
  }

  const { data, error } = await supabaseClient
    .from('log_items')
    .select(
      `
      *,
      products!inner(
        id,
        restaurant_id,
        restaurants!inner(
          id,
          name,
          location
        )
      )
    `
    )
    .in('log_id', logIds);

  if (error || !data) {
    console.error('Failed to retrieve log data:', error);
    throw new Error('Failed to retrieve log data.');
  }

  return data;
}
