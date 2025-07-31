import Image from 'next/image';
import Link from 'next/link';

import { Restaurant } from '@/_types/database';

import { BsClock, BsStarFill, BsTruck } from 'react-icons/bs';

interface RestaurantCardProps {
  data: Restaurant;
}

export default function RestaurantCard({ data }: RestaurantCardProps) {
  return (
    <div className='flex flex-col gap-4.5 w-full h-96 p-4.5 border border-neutral-400 dark:border-neutral-600 rounded-lg shadow-sm'>
      <RestaurantBanner data={data} />

      <RestaurantDetails data={data} />

      <RestaurantCTA data={data} />
    </div>
  );
}

function RestaurantBanner({ data }: RestaurantCardProps) {
  return (
    <div className='w-full h-36 relative'>
      <Image
        src={data.banner}
        alt={`Banner of ${data.name} restaurant.`}
        priority
        fill
        placeholder='blur'
        blurDataURL={data.banner}
        className='object-cover w-full h-full rounded-lg drop-shadow-sm'
      />
    </div>
  );
}

function RestaurantDetails({ data }: RestaurantCardProps) {
  return (
    <div className='w-full flex flex-col gap-0.5'>
      <h6 className='text-black dark:text-white text-xl font-medium tracking-wide'>
        {data.name}
      </h6>

      <p className='text-gray-500 dark:text-stone-400 text-sm font-normal tracking-wide'>
        {data.location}
      </p>

      <p className='text-gray-500 dark:text-stone-400 text-sm font-normal tracking-wide'>
        {data.open_time} - {data.close_time}
      </p>

      <div className='w-full flex items-center justify-between mt-1.5'>
        <p className='flex items-center gap-1.5 text-sm text-gray-500 dark:text-stone-400 font-medium tracking-wide'>
          <span className='text-amber-400 text-lg'>
            <BsStarFill />
          </span>

          <span>{data.rating}</span>
        </p>

        <p className='flex items-center gap-1.5 text-sm text-gray-500 dark:text-stone-400 font-medium tracking-wide'>
          <span className='text-lg'>
            <BsClock />
          </span>

          <span>{data.avg_prep_time}</span>
        </p>
      </div>
    </div>
  );
}

function RestaurantCTA({ data }: RestaurantCardProps) {
  return (
    <div className='w-full flex items-center justify-between mt-auto'>
      <p className='flex items-center gap-1.5 text-sm text-emerald-500 font-medium tracking-wide'>
        <span className='text-gray-500 dark:text-stone-400 text-lg'>
          <BsTruck />
        </span>
        Free
      </p>

      <Link
        href={`/restaurants/${data.id}`}
        title={`To the ${data.name} restaurant.`}
        className='rounded-lg shadow-sm outline-none border-none text-center bg-gradient-to-br py-1.5 px-3 from-orange-500 to-orange-700 text-white text-sm font-medium tracking-wider cursor-pointer hover:from-orange-300 hover:to-orange-500 focus-visible:from-orange-300 focus-visible:to-orange-500'
      >
        Order Now
      </Link>
    </div>
  );
}
