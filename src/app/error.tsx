'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className='w-full h-full flex flex-col items-center justify-center bg-transparent'>
      <h3 className='text-xl text-red-700 font-normal tracking-wide'>
        Something unexpected happened!
      </h3>

      <p className='text-center text-lg text-red-400 dark:text-stone-400 font-normal tracking-wide mt-3'>
        {error?.message}
      </p>

      <button
        type='button'
        onClick={reset}
        title='Try to reload!'
        className='outline-none border border-red-700 cursor-pointer bg-red-300/75 dark:bg-transparent text-red-700 text-center py-2 px-10 text-base font-normal tracking-wider mt-9 rounded-lg shadow-sm hover:bg-red-400/75 dark:hover:bg-stone-500/10 focus-visible:bg-red-400/75 dark:focus-visible:bg-stone-500/10 hover:text-red-900 dark:hover:text-red-500 focus-visible:text-red-900 dark:focus-visible:text-red-500 hover:border-red-900 dark:hover:border-red-700 focus-visible:border-red-900 dark:focus-visible:border-red-700 hover:shadow-lg focus-visible:shadow-lg transition-all duration-500'
      >
        Try Again
      </button>
    </main>
  );
}
