import { Suspense } from 'react';

import CartBody from '@/_components/_cart/CartBody';
import CartFooter from '@/_components/_cart/CartFooter';
import CartNotification from '@/_components/_cart/CartNotification';
import MiniSpinner from '@/_components/_ui/MiniSpinner';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function Page({ searchParams }: PageProps) {
  return (
    <section className='w-full h-full flex flex-col gap-9'>
      <div className='w-full h-auto flex flex-col gap-1.5'>
        <h6 className='text-black dark:text-white text-2xl font-medium tracking-wide'>
          Shopping Cart
        </h6>

        <p className='text-gray-500 dark:text-stone-400 text-base font-normal tracking-wide'>
          Review your items and place your order
        </p>
      </div>

      <CartNotification searchParams={searchParams} />

      <Suspense
        fallback={
          <div className='w-full h-full flex flex-col items-center justify-center'>
            <div className='flex items-center justify-center w-20 h-20'>
              <MiniSpinner
                size='text-4xl'
                color='text-orange-500'
              />
            </div>

            <p className='text-lg text-gray-500 dark:text-stone-400 font-medium tracking-wide'>
              Loading the cart body...
            </p>
          </div>
        }
      >
        <CartBody />
      </Suspense>

      <Suspense
        fallback={
          <div className='w-full h-full flex flex-col items-center justify-center'>
            <div className='flex items-center justify-center w-20 h-20'>
              <MiniSpinner
                size='text-4xl'
                color='text-orange-500'
              />
            </div>

            <p className='text-lg text-gray-500 dark:text-stone-400 font-medium tracking-wide'>
              Loading the cart footer...
            </p>
          </div>
        }
      >
        <CartFooter />
      </Suspense>
    </section>
  );
}
