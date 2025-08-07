import { BsHeadphones } from 'react-icons/bs';

export default function GetHelp() {
  return (
    <div className='rounded-lg shadow-sm w-full h-full border border-orange-500 bg-orange-200/50 dark:bg-stone-400/50 p-3 xl:p-9 flex flex-col items-center justify-center gap-3 lg:gap-4.5'>
      <h6 className='flex items-center gap-1.5 text-black dark:text-white text-lg lg:text-xl xl:text-2xl font-medium tracking-wide text-center'>
        <span className='text-xl lg:text-2xl xl:text-3xl text-orange-500'>
          <BsHeadphones />
        </span>
        Need Help?
      </h6>

      <p className='text-slate-500 dark:text-stone-400 text-sm lg:text-base font-normal tracking-wider lg:tracking-wide w-full max-w-[620px] text-center'>
        Our customer support team is available 24/7 to assist you with any
        questions or concerns.
      </p>

      <div className='flex items-center justify-center gap-3 w-full'>
        <button
          type='button'
          className='rounded-sm lg:rounded-md xl:rounded-lg shadow-sm outline-none border-none flex items-center justify-center text-center w-56 bg-gradient-to-br py-1.5 px-3 from-orange-500 to-orange-700 text-white text-xs lg:text-base xl:text-lg font-medium tracking-wider lg:tracking-wide cursor-pointer hover:from-orange-300 hover:to-orange-500 focus-visible:from-orange-300 focus-visible:to-orange-500'
          title='Contact our support team.'
        >
          Contact Support
        </button>

        <button
          type='button'
          className='rounded-sm lg:rounded-md xl:rounded-lg shadow-sm outline-none border border-neutral-300 dark:border-neutral-600 flex items-center justify-center text-center w-56 bg-white py-1.5 px-3 text-black text-xs lg:text-base xl:text-lg font-medium tracking-wider lg:tracking-wide cursor-pointer hover:bg-orange-500 focus-visible:bg-orange-500 hover:text-white focus-visible:text-white transition-all duration-500'
          title='Check our FAQ.'
        >
          View FAQ
        </button>
      </div>
    </div>
  );
}
