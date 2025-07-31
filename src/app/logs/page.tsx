import LogsList from '@/_components/_logs/LogsList';

export default function Page() {
  return (
    <section className='w-full h-full flex flex-col gap-6'>
      <div className='w-full h-auto flex flex-col gap-1.5'>
        <h6 className='text-black dark:text-white text-2xl font-medium tracking-wide'>
          Order Logs
        </h6>

        <p className='text-gray-500 dark:text-stone-400 text-base font-normal tracking-wide'>
          View your complete order history and delivery details
        </p>
      </div>

      <LogsList />
    </section>
  );
}
