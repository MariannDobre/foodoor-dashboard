import { Restaurant } from '@/_types/database';

interface ComponentProps {
  restaurantData: Restaurant;
}

export default function RestaurantDeliveryArea({
  restaurantData,
}: ComponentProps) {
  return (
    <div className='w-full h-full p-3 border border-neutral-400 dark:border-neutral-700 rounded-lg shadow-sm mt-10 2xl:mt-15'>
      <p className='w-full flex items-center gap-3 2xl:gap-4.5 text-black dark:text-white text-sm 2xl:text-base tracking-wide'>
        Delivery Areas
        <span className='flex items-center justify-center py-1 px-3 2xl:py-1.5 2xl:px-4.5 text-xs 2xl:text-sm text-center bg-orange-50 dark:bg-stone-500/25 text-orange-500 tracking-wider rounded-sm 2xl:rounded-full shadow-sm'>
          {restaurantData.delivery_city}
        </span>
      </p>
    </div>
  );
}
