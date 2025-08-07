import Image from 'next/image';
import Link from 'next/link';

import { FaLocationDot, FaRegClock, FaRegCalendar } from 'react-icons/fa6';
import { BsBoxArrowInLeft, BsStarFill } from 'react-icons/bs';
import { Restaurant } from '@/_types/database';

interface ComponentProps {
  restaurantData: Restaurant;
}

export default function RestaurantBanner({ restaurantData }: ComponentProps) {
  return (
    <div className='w-full h-[460px] relative'>
      <Link
        href='/restaurants'
        title='Back to the restaurants page.'
        className='cursor-pointer outline-none border-none absolute top-3 left-6 2xl:top-6 2xl:left-9 z-50 py-1 px-3 2xl:py-1.5 2xl:px-6 flex items-center justify-center gap-1.5 bg-white text-black text-sm 2xl:text-base text-center font-medium tracking-wider rounded-full shadow-sm hover:bg-orange-500 focus-visible:bg-orange-500 hover:text-white focus-visible:text-white hover:shadow-xl focus-visible:shadow-xl transition-all duration-500'
      >
        <span className='text-base 2xl:text-lg'>
          <BsBoxArrowInLeft />
        </span>
        Back to All Restaurants
      </Link>

      <Image
        src={restaurantData.banner}
        alt={`Banner of ${restaurantData.name} restaurant.`}
        priority
        fill
        placeholder='blur'
        blurDataURL={restaurantData.banner}
        className='object-cover object-center w-full h-full rounded-lg drop-shadow-sm'
      />

      <div className='w-full h-48 2xl:h-56 flex items-center gap-6 2xl:gap-9 px-6 2xl:px-9 top-5/8 absolute z-50'>
        <div className='w-2/8 2xl:w-1/8 h-full relative bg-gray-200/75 backdrop-blur-md rounded-lg'>
          <Image
            src={restaurantData.poster}
            alt={`Banner of ${restaurantData.name} restaurant.`}
            priority
            fill
            placeholder='blur'
            blurDataURL={restaurantData.poster}
            className='object-cover object-center w-full h-full rounded-lg drop-shadow-sm'
          />
        </div>

        <div className='w-6/8 2xl:w-7/8 h-full flex flex-col gap-1.5 2xl:gap-3 p-3 2xl:p-6 bg-gray-200/75 dark:bg-stone-500/75 backdrop-blur-md rounded-lg drop-shadow-sm'>
          <div className='w-full flex items-center justify-between'>
            <h6 className='text-black dark:text-white text-lg 2xl:text-2xl font-medium tracking-wide'>
              {restaurantData.name}
            </h6>

            <p className='flex items-center gap-1.5 text-sm 2xl:text-lg text-black dark:text-white/50 font-normal tracking-wide'>
              <span className='text-amber-400 text-base 2xl:text-xl'>
                <BsStarFill />
              </span>
              4.7
            </p>
          </div>

          <p className='flex items-center gap-1.5 2xl:gap-3 text-gray-500 dark:text-white/50 text-sm 2xl:text-base font-normal tracking-wider 2xl:tracking-wide'>
            <span className='text-base 2xl:text-lg'>
              <FaLocationDot />
            </span>
            {restaurantData.location}
          </p>

          <p className='flex items-center gap-1.5 2xl:gap-3 text-emerald-500 dark:text-emerald-400 text-sm 2xl:text-base font-normal tracking-wider 2xl:tracking-wide'>
            <span className='text-base 2xl:text-lg text-gray-500 dark:text-white/50'>
              <FaRegClock />
            </span>
            Open&nbsp;
            <span className='animate-pulse text-lg'>&#x2022;</span>
            &nbsp;
            {restaurantData.open_time} - {restaurantData.close_time}
          </p>

          <p className='flex items-center flex-wrap 2xl:flex-nowrap gap-1.5 2xl:gap-3 text-gray-500 dark:text-white/50 text-sm 2xl:text-base font-normal tracking-wider 2xl:tracking-wide'>
            <span className='text-base 2xl:text-lg'>
              <FaRegCalendar />
            </span>
            {restaurantData.days_open.map((day, index) => (
              <span key={index}>
                {day}
                {index < restaurantData.days_open.length - 1 && ','}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}
