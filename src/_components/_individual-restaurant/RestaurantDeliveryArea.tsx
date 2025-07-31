import { Restaurant } from '@/_types/database';

interface ComponentProps {
  restaurantData: Restaurant;
}

export default function RestaurantDeliveryArea({
  restaurantData,
}: ComponentProps) {
  return (
    <div className='w-full h-full p-3 border border-neutral-400 dark:border-neutral-700 rounded-lg shadow-sm mt-15'>
      <p className='w-full flex items-center gap-4.5 text-black dark:text-white text-base tracking-wide'>
        Delivery Areas
        <span className='flex items-center justify-center py-1.5 px-4.5 text-sm text-center bg-orange-50 dark:bg-stone-500/25 text-orange-500 tracking-wider rounded-full shadow-sm'>
          {restaurantData.delivery_city}
        </span>
      </p>
    </div>
  );
}
