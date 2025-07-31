import { auth } from '@/_lib/auth';
import { getCartIdentifier } from '@/_utils/cartIdentifier';
import { addToCart, getCartData } from '@/_lib/actions';

interface ComponentProps {
  productId: number;
  productPrice: number;
}

export default async function AddToCart({
  productId,
  productPrice,
}: ComponentProps) {
  const session = await auth();
  const userId = session?.user?.user_id ?? null;

  const identifier = await getCartIdentifier(userId);
  const cartData = identifier ? await getCartData(identifier) : [];

  const matchingItem = cartData.find((item) => item.product_id === productId);
  const quantity = matchingItem?.total_quantity ?? 0;

  async function handleAddToCart() {
    'use server';

    await addToCart(productId, productPrice);
  }

  return (
    <form action={handleAddToCart}>
      <button
        type='submit'
        className='outline-none border-none cursor-pointer text-base text-white font-normal tracking-wide bg-orange-500 py-1.5 px-3 rounded-lg shadow-sm hover:bg-orange-400 focus-visible:bg-orange-400 hover:shadow-lg focus-visible:shadow-lg hover:scale-105 focus-visible:scale-105 transition-all duration-500'
      >
        {quantity > 0 ? (
          <p>
            <span className='bg-white text-black py-0.5 px-1 rounded-lg shadow-sm'>
              {quantity}
            </span>{' '}
            + Add
          </p>
        ) : (
          '+ Add'
        )}
      </button>
    </form>
  );
}
