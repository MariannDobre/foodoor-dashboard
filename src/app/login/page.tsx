import LoginForm from '@/_components/_forms/LoginForm';

import { RiNextjsFill } from 'react-icons/ri';

export default function Page() {
  return (
    <section className='w-full h-[calc(100vh-64px-60px-24px)] xl:h-full flex flex-col items-center justify-center gap-3 lg:gap-6 xl:gap-9'>
      <LoginForm />

      <p className='w-72 sm:w-82 md:w-92 lg:w-sm xl:w-md flex items-center justify-center text-sm text-center text-gray-500 dark:text-stone-400 font-normal tracking-wide'>
        Secured login powered by&nbsp;
        <span className='text-cyan-500 text-lg'>
          <RiNextjsFill />
        </span>
        <span className='bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent'>
          &nbsp;NextAuth
        </span>
      </p>
    </section>
  );
}
