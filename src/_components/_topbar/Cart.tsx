import { getCartData } from '@/_lib/actions';
import { getCartIdentifier } from '@/_utils/cartIdentifier';

import Link from 'next/link';

import { BsCart3 } from 'react-icons/bs';

interface ComponentProps {
  userId: number | null;
}

export default async function Cart({ userId }: ComponentProps) {
  const identifier = await getCartIdentifier(userId);
  const cartData = identifier ? await getCartData(identifier) : [];

  const totalCartLength = cartData.reduce(
    (sum, item) => sum + item.total_quantity,
    0
  );

  return (
    <div className='w-7 h-7 2xl:w-12 2xl:h-12 bg-transparent flex items-center justify-center rounded-sm 2xl:rounded-2xl relative'>
      <Link
        href='/cart'
        className='group outline-none border-none w-full h-full rounded-sm 2xl:rounded-2xl flex items-center justify-center cursor-pointer bg-transparent hover:bg-orange-500 focus-visible:bg-orange-500 hover:shadow-lg focus-visible:shadow-lg transition-all duration-500'
        title='Check your order cart.'
      >
        <span className='text-base 2xl:text-xl text-neutral-500 dark:text-stone-400 group-hover:text-white group-focus-visible:text-white transition-all duration-500'>
          <BsCart3 />
        </span>
      </Link>

      {totalCartLength > 0 && (
        <span className='bg-orange-300 dark:bg-orange-400 text-white absolute z-50 -top-2 -left-2 flex items-center justify-center text-sm font-medium w-6 h-6 rounded-full'>
          {totalCartLength}
        </span>
      )}
    </div>
  );
}
