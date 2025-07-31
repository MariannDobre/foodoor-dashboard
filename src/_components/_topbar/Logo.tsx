import Link from 'next/link';

export default function Logo() {
  return (
    <div className='hidden md:flex md:items-center md:gap-3'>
      <Link
        className='outline-none border-none flex items-center justify-center bg-orange-500 w-12 h-12 rounded-2xl shadow cursor-pointer hover:bg-orange-700 focus-visible:bg-orange-700 hover:shadow-lg focus-visible:shadow-lg transition-all duration-500'
        href='/'
      >
        <span className='text-xl'>🍕</span>
      </Link>

      <div className='flex flex-col items-start justify-center selection:bg-orange-500 selection:text-white'>
        <p className='text-neutral-800 dark:text-white text-lg font-medium tracking-wide'>
          Foodoor
        </p>

        <p className='text-neutral-500 dark:text-stone-400 text-sm font-medium tracking-wide'>
          Delicious food
        </p>
      </div>
    </div>
  );
}
