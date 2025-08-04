import { Restaurant } from '@/_types/database';
import RestaurantCard from '@/_components/_restaurants/RestaurantCard';

export default async function RestaurantsList() {
  const baseURL =
    process.env.NEXT_PUBLIC_BASE_URL ??
    'https://foodoor-dashboard-demo.vercel.app/';
  const res = await fetch(`${baseURL}/api/restaurants`, {
    method: 'GET',
  });
  const data: Restaurant[] = await res.json();

  return (
    <div className='grid grid-cols-5 gap-x-6 border-b border-neutral-400 dark:border-neutral-600 pb-4.5'>
      {data?.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          data={restaurant}
        />
      ))}
    </div>
  );
}
