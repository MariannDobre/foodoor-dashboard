import RegisterForm from '@/_components/_forms/RegisterForm';

export default function Page() {
  return (
    <section className='w-full h-full flex flex-col items-center justify-center gap-9'>
      <RegisterForm />

      <p className='flex items-center text-sm text-gray-500 dark:text-stone-400 font-normal tracking-wide'>
        By creating an account, you agree to our Terms of Service
      </p>
    </section>
  );
}
