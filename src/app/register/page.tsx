import RegisterForm from '@/_components/_forms/RegisterForm';

export default function Page() {
  return (
    <section className='w-full h-[calc(100vh-64px-60px-24px)] xl:h-full flex flex-col items-center justify-center gap-3 lg:gap-6 xl:gap-9'>
      <RegisterForm />

      <p className='w-72 sm:w-82 md:w-92 lg:w-sm xl:w-md flex items-center justify-center text-sm text-center text-gray-500 dark:text-stone-400 font-normal tracking-wide'>
        By creating an account, you agree to our Terms of Service
      </p>
    </section>
  );
}
