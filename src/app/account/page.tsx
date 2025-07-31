import UserData from '@/_components/_account/UserData';
import DeliveryData from '@/_components/_account/DeliveryData';

export default function Page() {
  return (
    <section className='w-full h-full flex flex-col gap-9'>
      <div className='w-full h-auto flex flex-col gap-1.5'>
        <h6 className='text-black dark:text-white text-2xl font-medium tracking-wide'>
          Account Settings
        </h6>

        <p className='text-gray-500 dark:text-stone-400 text-base font-normal tracking-wide'>
          Manage your account information and preferences
        </p>
      </div>

      <div className='w-full h-full grid grid-cols-2 gap-x-9'>
        <UserData />

        <DeliveryData />
      </div>
    </section>
  );
}
