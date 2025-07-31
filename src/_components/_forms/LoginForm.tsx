import Link from 'next/link';
import Image from 'next/image';
import { signInAction } from '@/_lib/actions';

export default function LoginForm() {
  return (
    <div className='w-md h-auto flex flex-col items-center outline-none border border-neutral-300 dark:border-neutral-600 p-6 rounded-lg shadow-sm'>
      <div className='flex items-center justify-center bg-orange-500 w-16 h-16 rounded-2xl shadow-sm mb-4.5'>
        <span className='text-3xl rotate-15'>🍕</span>
      </div>

      <div className='w-full h-auto flex flex-col items-center justify-center gap-0.5 mb-9'>
        <h6 className='text-black dark:text-white text-2xl font-medium tracking-wide'>
          Welcome Back
        </h6>

        <p className='text-gray-500 dark:text-stone-400 text-base font-normal tracking-wider'>
          Sign in to your&nbsp;
          <span className='text-orange-500'>Foodoor</span>&nbsp;account
        </p>
      </div>

      <form
        action={signInAction}
        className='w-full h-auto'
      >
        <button className='w-full h-auto flex items-center justify-center gap-3 outline-none border border-neutral-300 dark:border-neutral-600 cursor-pointer disabled:cursor-not-allowed bg-transparent text-black dark:text-white py-2.5 rounded-lg shadow-sm text-center text-sm font-medium tracking-wide hover:bg-gray-200/75 dark:hover:bg-stone-500/25 focus-visible:bg-gray-200/75 dark:focus-visible:bg-stone-500/25 hover:text-gray-500 dark:hover:text-white focus-visible:text-gray-500 dark:focus-visible:text-white hover:border-neutral-400 dark:hover:border-neutral-700 focus-visible:border-neutral-400 dark:focus-visible:border-neutral-700 transition-all duration-500'>
          <Image
            src='https://authjs.dev/img/providers/google.svg'
            alt='Google logo'
            height='20'
            width='20'
            className='drop-shadow-sm'
          />
          Continue with Google
        </button>
      </form>

      <div className='w-full flex flex-col gap-4.5 items-center mt-9'>
        <div className='w-full flex items-center justify-between'>
          <div className='w-25 h-px bg-neutral-300 dark:bg-neutral-600' />

          <p className='w-auto text-sm text-gray-500 dark:text-stone-400 font-normal tracking-wide'>
            Don&quot;t have an account?
          </p>

          <div className='w-25 h-px bg-neutral-300 dark:bg-neutral-600' />
        </div>

        <Link
          href='/register'
          title='To the register page.'
          className='w-full outline-none border border-neutral-300 dark:border-neutral-600 text-black dark:text-white bg-transparent rounded-lg shadow-sm cursor-pointer py-2.5 text-center text-sm font-medium tracking-wide hover:bg-orange-500 focus-visible:bg-orange-500 hover:text-white focus-visible:text-white transition-all duration-500'
        >
          Create an Account
        </Link>
      </div>
    </div>
  );
}
