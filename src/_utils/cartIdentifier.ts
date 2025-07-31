import { cookies } from 'next/headers';
import { randomUUID } from 'crypto';

export async function getCartIdentifier(
  userId: number | null
): Promise<string | number | null> {
  const cookieStore = await cookies();

  if (userId) return userId;

  const cartId = cookieStore.get('cart_id')?.value;
  return cartId || null;
}

export async function createCartIdentifier(): Promise<string> {
  const cookieStore = await cookies();

  let cartId = cookieStore.get('cart_id')?.value;

  if (!cartId) {
    cartId = randomUUID();
    cookieStore.set('cart_id', cartId, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  return cartId;
}

export async function cartIdentifier(
  userId: number | null
): Promise<string | number | null> {
  return getCartIdentifier(userId);
}
