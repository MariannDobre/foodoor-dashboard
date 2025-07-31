'use client';

import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function NotFound() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <main className='w-full h-full flex flex-col items-center justify-center bg-transparent'>
      <h3 className='text-xl text-black dark:text-white font-normal tracking-wide'>
        This page could not be found!
      </h3>

      <p className='text-lg text-gray-500 dark:text-stone-400 font-normal tracking-wide mt-3'>
        There is no page with this pathname:&nbsp;<strong>{pathname}</strong>
      </p>

      <button
        type='button'
        onClick={() => {
          toast.success(
            'Redirecting to the homepage has begun! This may take a while...'
          );
          router.push('/');
        }}
        title='Try to reload!'
        className='outline-none border-none cursor-pointer bg-orange-500 text-white text-center py-2 px-10 text-base font-normal tracking-wider mt-6 rounded-lg shadow-sm hover:bg-orange-400 focus-visible:bg-orange-400 hover:shadow-lg focus-visible:shadow-lg transition-all duration-500'
      >
        To Home Page
      </button>
    </main>
  );
}
