import { auth } from '@/_lib/auth';
import { getCartData, placeOrder } from '@/_lib/actions';
import { getCartIdentifier } from '@/_utils/cartIdentifier';

export default async function CartFooter() {
  const session = await auth();
  const identifier = await getCartIdentifier(session?.user?.user_id ?? null);
  const cartData = identifier ? await getCartData(identifier) : [];

  const totalCartPrice = cartData
    .reduce((sum, item) => sum + item.total_price, 0)
    .toFixed(2);

  if (cartData.length === 0) return null;

  async function handlePlaceOrder() {
    'use server';

    await placeOrder();
  }

  return (
    <div className='w-full h-auto flex flex-col gap-3 lg:gap-6 p-3 lg:p-4.5 xl:p-6 rounded-sm lg:rounded-md xl:rounded-lg border border-neutral-400 dark:border-neutral-700 shadow-sm'>
      <h6 className='text-black dark:text-white text-base lg:text-lg xl:text-xl font-medium tracking-wide'>
        Order Summary
      </h6>

      <div className='w-full h-auto flex flex-col gap-2.5'>
        <div className='w-full h-auto flex items-center justify-between'>
          <p className='text-gray-500 dark:text-stone-400 text-sm lg:text-base font-normal tracking-wide'>
            Subtotal
          </p>

          <span className='text-black dark:text-white/75 text-base lg:text-lg font-medium tracking-wide'>
            ${totalCartPrice}
          </span>
        </div>

        <div className='w-full h-auto flex items-center justify-between'>
          <p className='text-gray-500 dark:text-stone-400 text-sm lg:text-base font-normal tracking-wide'>
            Delivery Fee
          </p>

          <span className='text-emerald-500 dark:text-emerald-400 text-base lg:text-lg font-medium tracking-wide'>
            Free
          </span>
        </div>

        <div className='w-full h-px rounded-lg bg-neutral-300 dark:bg-neutral-600' />

        <div className='w-full h-auto flex items-center justify-between'>
          <p className='text-black dark:text-white text-base lg:text-lg font-normal tracking-wide'>
            Total
          </p>

          <span className='text-black dark:text-white/75 text-base lg:text-lg font-medium tracking-wide'>
            ${totalCartPrice}
          </span>
        </div>
      </div>

      <form
        action={handlePlaceOrder}
        className='w-full h-auto rounded-lg'
      >
        <button
          type='submit'
          className='w-full h-auto outline-none border-none cursor-pointer bg-orange-500 text-white rounded-sm lg:rounded-md xl:rounded-lg shadow-sm text-sm lg:text-base font-medium tracking-wider lg:tracking-wide py-1.5 lg:py-3 hover:bg-orange-400 focus-visible:bg-orange-400 transition-all duration-500'
        >
          Place Order
        </button>
      </form>
    </div>
  );
}
