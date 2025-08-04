import { Suspense } from 'react';
import { Restaurant, Product } from '@/_types/database';

import RestaurantBanner from '@/_components/_individual-restaurant/RestaurantBanner';
import RestaurantDeliveryArea from '@/_components/_individual-restaurant/RestaurantDeliveryArea';
import ProductCard from '@/_components/_products/ProductCard';
import MiniSpinner from '@/_components/_ui/MiniSpinner';

interface PageProps {
  params: { restaurantId: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ restaurantId: string }>;
}) {
  const { restaurantId } = await params;
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';

  const restaurantResponse = await fetch(
    `${baseURL}/api/restaurants/${restaurantId}`,
    {
      method: 'GET',
    }
  );

  const { name }: Restaurant = await restaurantResponse.json();

  return { title: `${name} Restaurant` };
}

export async function generateStaticParams() {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
  const restaurantsRequest = await fetch(`${baseURL}/api/restaurants`, {
    method: 'GET',
  });
  const restaurantsData = await restaurantsRequest.json();

  const ids = restaurantsData.map((restaurant: Restaurant) => ({
    restaurantId: String(restaurant.id),
  }));

  return ids;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { restaurantId } = await params;
  const rawFilterParams = await searchParams;
  const rawFilterValue = rawFilterParams?.productType;
  const filterValue = Array.isArray(rawFilterValue)
    ? rawFilterValue[0]
    : rawFilterValue || 'all';
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';

  const restaurantRequest = await fetch(
    `${baseURL}/api/restaurants/${restaurantId}`,
    {
      method: 'GET',
    }
  );
  const productRequest = await fetch(
    `${baseURL}/api/products/${restaurantId}?${new URLSearchParams(
      filterValue !== 'all' && typeof filterValue === 'string'
        ? { productType: filterValue }
        : {}
    )}`,
    {
      method: 'GET',
    }
  );

  const restaurantData: Restaurant = await restaurantRequest.json();
  const productData: Product[] = await productRequest.json();

  const suspenseKey = `${restaurantId}-${filterValue}`;

  return (
    <section className='w-full flex flex-col gap-6'>
      <RestaurantBanner restaurantData={restaurantData} />

      <RestaurantDeliveryArea restaurantData={restaurantData} />

      <div className='flex flex-col gap-4.5'>
        <h6 className='text-orange-500 text-xl font-medium tracking-wide'>
          Menu
        </h6>

        {/* MAIN */}
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
                Loading the restaurant menu...
              </p>
            </div>
          }
          key={suspenseKey}
        >
          <ProductCard
            cardData={productData}
            restaurantId={restaurantId}
            filterValue={filterValue}
          />
        </Suspense>
      </div>
    </section>
  );
}
