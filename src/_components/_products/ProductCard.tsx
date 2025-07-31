import { Suspense } from 'react';
import Image from 'next/image';
import FilterProducts from './FilterProducts';
import AddToCart from '../_cart/AddToCart';

import { Product } from '@/_types/database';
import MiniSpinner from '../_ui/MiniSpinner';

interface ProductCardProps {
  cardData: Product[];
  restaurantId: string;
  filterValue: string;
}

export default function ProductCard({
  cardData,
  restaurantId,
  filterValue,
}: ProductCardProps) {
  const getCardHeight = (productId: number) => {
    switch (productId.toString()) {
      case '1':
        return { card: 'h-[560px]', content: 'h-[260px]' };
      case '2':
        return { card: 'h-[520px]', content: 'h-[220px]' };
      case '3':
        return { card: 'h-[560px]', content: 'h-[260px]' };
      case '4':
        return { card: 'h-[540px]', content: 'h-[240px]' };
      case '5':
        return { card: 'h-[520px]', content: 'h-[220px]' };
      default:
        return { card: 'h-[480px]', content: 'h-[180px]' };
    }
  };

  const displayedProducts = cardData;

  return (
    <div className='flex flex-col gap-6'>
      <FilterProducts
        filterValue={filterValue}
        restaurantId={restaurantId}
      />

      <Suspense
        fallback={
          <div className='w-full h-full flex flex-col items-center justify-center'>
            <div className='flex items-center justify-center w-20 h-20'>
              <MiniSpinner
                size='text-4xl'
                color='text-orange-500'
              />
            </div>

            <p className='text-lg text-gray-500 font-medium tracking-wide'>
              Loading the restaurant menu...
            </p>
          </div>
        }
      >
        {displayedProducts.length === 0 ? (
          <div className='w-full h-auto flex flex-col items-center justify-center gap-1.5 my-6'>
            <h6 className='text-xl text-black dark:text-white font-normal tracking-wide'>
              Unfortunately this restaurant does not have any food of this
              type:&nbsp;
              <em className='font-medium text-orange-500'>{filterValue}</em>
            </h6>

            <p className='text-base text-gray-500 dark:text-stone-400 font-normal tracking-wide'>
              We suggest clearing the filter and try again 💪!
            </p>
          </div>
        ) : (
          <div className='w-full h-auto grid grid-cols-3 gap-6'>
            {displayedProducts.map((product) => {
              const heights =
                product.restaurant_id.toString() === restaurantId
                  ? getCardHeight(product.restaurant_id)
                  : { card: 'h-[480px]', content: 'h-[180px]' };

              return (
                <div
                  key={product.id}
                  className={`w-full ${heights.card} bg-transparent rounded-lg shadow-sm border border-neutral-400 dark:border-neutral-700 hover:shadow-lg focus-visible:shadow-lg transition-all duration-500`}
                >
                  <div className='w-full h-[300px] relative'>
                    <Image
                      src={product.image}
                      alt={`Photo of product ${product.name}`}
                      fill
                      priority
                      placeholder='blur'
                      blurDataURL={product.image}
                      className='w-full h-full object-cover rounded-t-lg'
                    />
                  </div>

                  <div
                    className={`w-full ${heights.content} p-3 flex flex-col gap-1.5`}
                  >
                    <h6 className='text-lg font-medium tracking-wider text-black dark:text-white'>
                      {product.name}&nbsp;
                      {product.product_tag.toLowerCase().includes('spicy')
                        ? '🌶️'
                        : null}
                    </h6>

                    <p className='text-base font-normal tracking-wide text-gray-500 dark:text-stone-400'>
                      {product.description}
                    </p>

                    <div className='w-full flex items-center justify-between mt-auto'>
                      <span className='text-xl text-orange-500 font-medium tracking-wider'>
                        ${product.price}
                      </span>

                      <AddToCart
                        productId={product.id}
                        productPrice={product.price}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Suspense>
    </div>
  );
}
