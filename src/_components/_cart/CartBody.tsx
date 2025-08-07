import { auth } from '@/_lib/auth';
import { getCartData } from '@/_lib/actions';
import { getCartIdentifier } from '@/_utils/cartIdentifier';

import Link from 'next/link';
import CartItem from './CartItem';

export default async function CartBody() {
  const session = await auth();
  const identifier = await getCartIdentifier(session?.user?.user_id ?? null);
  const cartData = identifier ? await getCartData(identifier) : [];

  return (
    <div className='w-full h-full flex flex-col gap-4.5 overflow-y-auto'>
      {cartData?.length > 0 ? (
        cartData.map((item) => (
          <CartItem
            key={item.id}
            item={item}
          />
        ))
      ) : (
        <div className='w-full h-auto p-3 lg:p-6 flex flex-col gap-3 items-center justify-center rounded-sm lg:rounded-md xl:rounded-lg shadow-sm border border-neutral-400 dark:border-neutral-700'>
          <h3 className='text-base lg:text-lg text-black dark:text-white font-medium tracking-wide'>
            Your cart is empty!
          </h3>

          <Link
            href='/restaurants'
            className='outline-none border-none cursor-pointer bg-orange-500 text-white rounded-sm lg:rounded-md xl:rounded-lg shadow-sm text-sm font-medium tracking-wider py-1 px-3 lg:py-1.5 lg:px-6 hover:bg-orange-700 focus-visible:bg-orange-700 transition-all duration-500'
          >
            Browse Restaurants
          </Link>
        </div>
      )}
    </div>
  );
}
