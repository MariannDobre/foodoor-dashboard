import MiniSpinner from '@/_components/_ui/MiniSpinner';

export default function Loading() {
  return (
    <div className='w-full h-[calc(100vh-64px-60px-24px)] xl:h-full flex flex-col items-center justify-center'>
      <div className='flex items-center justify-center w-20 h-20'>
        <MiniSpinner
          size='text-4xl'
          color='text-orange-500'
        />
      </div>

      <p className='text-lg text-gray-500 dark:text-stone-400 font-medium tracking-wide'>
        Loading restaurant data...
      </p>
    </div>
  );
}
