'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

import MiniSpinner from '../_ui/MiniSpinner';

import { BsSearch } from 'react-icons/bs';

interface Restaurant {
  id: string;
  name: string;
  location: string;
}

export default function HomeHero() {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async () => {
    if (address.trim().length < 3) return;

    setLoading(true);
    try {
      const res = await fetch('/api/restaurants');
      const data = await res.json();

      const match = data.find((r: Restaurant) =>
        r.location.toLowerCase().includes(address.toLowerCase())
      );

      if (match) {
        router.push('/restaurants');
      } else {
        setAddress('');
        toast.error("We don't have any restaurants around you.");
      }
    } catch (err) {
      console.error('Error:', err);
      toast.error('Something went wrong. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col gap-6 xl:gap-14 bg-gradient-to-br from-orange-300/50 dark:from-orange-400/50 to-transparent w-full h-[264px] xl:h-[420px] p-3 xl:p-12 rounded-lg relative'>
      <HeroTitles />

      <div className='flex flex-col items-start xl:flex-row xl:items-center gap-2 xl:gap-6 w-full'>
        <div className='flex items-center relative'>
          <span className='absolute top-1/2 left-2 lg:left-3 -translate-y-1/2 text-neutral-500 text-sm lg:text-base'>
            <BsSearch />
          </span>

          <input
            type='text'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder='Enter the city you want to order from...'
            className='outline-none border border-transparent w-[276px] sm:w-xs md:w-sm xl:w-[440px] bg-white placeholder:text-neutral-500 caret-orange-500 text-black text-xs lg:text-sm font-medium tracking-wider py-1.5 lg:py-3 pl-6 lg:pl-9 pr-2 lg:pr-4 xl:pr-6 rounded-sm lg:rounded-md xl:rounded-lg shadow-sm hover:border-orange-500 focus-visible:border-orange-500 selection:bg-orange-500 selection:text-white transition-all duration-500'
            title=''
          />
        </div>

        <button
          type='button'
          onClick={handleSearch}
          disabled={loading}
          className='outline-none border-none py-1.5 px-3 lg:py-2 lg:px-4 xl:py-3 xl:px-6 rounded-sm lg:rounded-md xl:rounded-lg shadow-sm bg-orange-500 text-center text-white text-xs lg:text-sm tracking-wider font-medium cursor-pointer hover:bg-orange-700 focus-visible:bg-orange-700 transition-all duration-500'
        >
          {loading ? <MiniSpinner size='text-2xl' /> : 'Find Food Near You'}
        </button>
      </div>

      <div className='absolute top-3 right-3 xl:top-12 xl:right-12 text-3xl xl:text-7xl opacity-50 z-10'>
        🍕
      </div>
      <div className='absolute top-2/5 right-24 xl:right-1/4 text-xl xl:text-5xl opacity-50 z-10'>
        🍝
      </div>
      <div className='absolute bottom-12 xl:bottom-24 right-12 xl:right-36 text-2xl xl:text-6xl opacity-50 z-10'>
        🍔
      </div>
    </div>
  );
}

function HeroTitles() {
  return (
    <div className='w-full h-auto flex flex-col gap-1.5 xl:gap-4.5'>
      <div className='w-full h-auto flex flex-col gap-0.75 xl:gap-1.5'>
        <h1 className='text-2xl xl:text-6xl text-black dark:text-white font-semibold tracking-wide'>
          Delicious Food
        </h1>

        <h2 className='text-xl xl:text-5xl text-orange-500 font-medium tracking-wide'>
          Delivered Fast
        </h2>
      </div>

      <p className='text-sm xl:text-lg text-gray-400 dark:text-stone-400 tracking-wide'>
        Order from your favorite restaurants and get fresh, hot meals delivered
        to your doorstep in minutes.
      </p>
    </div>
  );
}
