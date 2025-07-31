import type { Metadata } from 'next';
import { Suspense } from 'react';
import RestaurantsList from '@/_components/_restaurants/RestaurantsList';
import MiniSpinner from '@/_components/_ui/MiniSpinner';

export const metadata: Metadata = {
  title: 'Restaurants',
};

export default function Page() {
  return (
    <section className='w-full h-full flex flex-col gap-6'>
      <h1 className='text-orange-500 text-xl font-medium tracking-wide'>
        Restaurants
      </h1>

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
              Loading all the restaurants...
            </p>
          </div>
        }
      >
        <RestaurantsList />
      </Suspense>
    </section>
  );
}
