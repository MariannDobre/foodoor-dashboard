import { auth } from '@/_lib/auth';
import { getUserDeliveryData, updateDeliveryData } from '@/_lib/actions';

import {
  MdOutlineLocationOn,
  MdOutlinePhone,
  MdOutlineHomeWork,
  MdOutlineShield,
  MdOutlineMailLock,
} from 'react-icons/md';

export default async function DeliveryData() {
  const session = await auth();
  const userDeliveryData = await getUserDeliveryData();

  const userId = session?.user?.user_id ?? '';
  const userEmail = session?.user?.email ?? '';

  return (
    <div className='border border-neutral-300 dark:border-neutral-600 flex flex-col items-center gap-6 p-6 rounded-lg shadow-sm w-full h-full'>
      <div className='w-full h-auto flex flex-col gap-0.5'>
        <h6 className='text-orange-500 text-xl font-medium tracking-wide'>
          Delivery Informations
        </h6>

        <p className='text-gray-500 dark:text-stone-400 text-sm font-normal tracking-wider'>
          Manage your address, phone number, and contact details...
        </p>
      </div>

      <div className='w-full h-full p-6 flex flex-col items-center justify-center gap-1.5 bg-gray-200/75 dark:bg-stone-500/75 border border-neutral-400 dark:border-neutral-700 rounded-lg shadow-sm'>
        <form
          action={updateDeliveryData}
          className='w-full h-full flex flex-col gap-6'
        >
          <div className='w-full h-auto flex items-center justify-between gap-6'>
            <label
              htmlFor='id'
              className='flex flex-col gap-2 w-full'
            >
              <p className='w-full flex items-center justify-start gap-2 text-sm text-black dark:text-white/75 font-normal tracking-wide'>
                <span className='text-lg text-orange-500'>
                  <MdOutlineShield />
                </span>
                Supabase ID
              </p>

              <input
                type='text'
                id='id'
                name='id'
                disabled
                defaultValue={userId}
                className='opacity-50 cursor-default outline-none border border-neutral-400 dark:border-neutral-700 w-full bg-gray-100 dark:bg-neutral-400 py-1.5 px-3 text-sm text-black font-normal tracking-wider placeholder:text-gray-500 dark:placeholder:text-black rounded-lg shadow-sm caret-orange-500 not-disabled:hover:border-orange-500 not-disabled:focus-visible:border-orange-500 selection:bg-orange-500 selection:text-white transition-all duration-500'
              />
            </label>

            <label
              htmlFor='email'
              className='flex flex-col gap-2 w-full'
            >
              <p className='w-full flex items-center justify-start gap-2 text-sm text-black dark:text-white/75 font-normal tracking-wide'>
                <span className='text-lg text-orange-500'>
                  <MdOutlineMailLock />
                </span>
                Your E-mail
              </p>

              <input
                type='email'
                id='email'
                name='email'
                disabled
                defaultValue={userEmail}
                className='opacity-50 cursor-default outline-none border border-neutral-400 dark:border-neutral-700 w-full bg-gray-100 dark:bg-neutral-400 py-1.5 px-3 text-sm text-black font-normal tracking-wider placeholder:text-gray-500 dark:placeholder:text-black rounded-lg shadow-sm caret-orange-500 not-disabled:hover:border-orange-500 not-disabled:focus-visible:border-orange-500 selection:bg-orange-500 selection:text-white transition-all duration-500'
              />
            </label>
          </div>

          <label
            htmlFor='city'
            className='flex flex-col gap-2'
          >
            <p className='w-full flex items-center justify-start gap-2 text-sm text-black dark:text-white/75 font-normal tracking-wide'>
              <span className='text-lg text-orange-500'>
                <MdOutlineHomeWork />
              </span>
              City
            </p>

            <input
              type='text'
              id='city'
              name='city'
              placeholder='Ex: Paris'
              defaultValue={userDeliveryData?.city || ''}
              className='outline-none border border-neutral-400 dark:border-neutral-700 w-full bg-gray-100 dark:bg-stone-500 py-1.5 px-3 text-sm text-black dark:text-white font-normal tracking-wider placeholder:text-gray-500 dark:placeholder:text-white/75 rounded-lg shadow-sm caret-orange-500 hover:border-orange-500 focus-visible:border-orange-500 selection:bg-orange-500 selection:text-white transition-all duration-500'
            />

            <span
              className={`text-xs ${
                userDeliveryData?.city
                  ? 'text-green-700 dark:text-green-500'
                  : 'text-red-700 dark:text-red-500'
              } font-normal tracking-widest`}
            >
              {userDeliveryData?.city
                ? `Right now this input holds the following value: ${userDeliveryData?.city}`
                : 'Right now this input do NOT hold any value...'}
            </span>
          </label>

          <label
            htmlFor='address'
            className='flex flex-col gap-2'
          >
            <p className='w-full flex items-center justify-start gap-2 text-sm text-black dark:text-white/75 font-normal tracking-wide'>
              <span className='text-lg text-orange-500'>
                <MdOutlineLocationOn />
              </span>
              Address
            </p>

            <input
              type='text'
              id='address'
              name='address'
              placeholder='Ex: Avenue des Champs-Élysées'
              defaultValue={userDeliveryData?.address || ''}
              className='outline-none border border-neutral-400 dark:border-neutral-700 w-full bg-gray-100 dark:bg-stone-500 py-1.5 px-3 text-sm text-black dark:text-white font-normal tracking-wider placeholder:text-gray-500 dark:placeholder:text-white/75 rounded-lg shadow-sm caret-orange-500 hover:border-orange-500 focus-visible:border-orange-500 selection:bg-orange-500 selection:text-white transition-all duration-500'
            />

            <span
              className={`text-xs ${
                userDeliveryData?.address
                  ? 'text-green-700 dark:text-green-500'
                  : 'text-red-700 dark:text-red-500'
              } font-normal tracking-widest`}
            >
              {userDeliveryData?.address
                ? `Right now this input holds the following value: ${userDeliveryData?.address}`
                : 'Right now this input do NOT hold any value...'}
            </span>
          </label>

          <label
            htmlFor='phone_number'
            className='flex flex-col gap-2'
          >
            <p className='w-full flex items-center justify-start gap-2 text-sm text-black dark:text-white/75 font-normal tracking-wide'>
              <span className='text-lg text-orange-500'>
                <MdOutlinePhone />
              </span>
              Phone Number
            </p>

            <input
              type='text'
              id='phone_number'
              name='phone_number'
              placeholder='Ex: +33 1 23 45 67 89'
              defaultValue={userDeliveryData?.phone_number || ''}
              className='outline-none border border-neutral-400 dark:border-neutral-700 w-full bg-gray-100 dark:bg-stone-500 py-1.5 px-3 text-sm text-black dark:text-white font-normal tracking-wider placeholder:text-gray-500 dark:placeholder:text-white/75 rounded-lg shadow-sm caret-orange-500 hover:border-orange-500 focus-visible:border-orange-500 selection:bg-orange-500 selection:text-white transition-all duration-500'
            />

            <span
              className={`text-xs ${
                userDeliveryData?.phone_number
                  ? 'text-green-700 dark:text-green-500'
                  : 'text-red-700 dark:text-red-500'
              } font-normal tracking-widest`}
            >
              {userDeliveryData?.phone_number
                ? `Right now this input holds the following value: ${userDeliveryData?.phone_number}`
                : 'Right now this input do NOT hold any value...'}
            </span>
          </label>

          <div className='w-full h-auto flex flex-col gap-2 items-center justify-center mt-auto'>
            <h6 className='text-xs text-gray-500 dark:text-white/75 font-normal tracking-widest text-center'>
              The following action will make an update for the user with the
              email:&nbsp;
              <span className='text-orange-400 dark:text-orange-500 font-medium'>
                {userEmail}
              </span>
            </h6>

            <button className='outline-none border-none cursor-pointer py-1.5 px-6 w-full text-base text-white font-normal tracking-wide bg-orange-500 flex items-center justify-center text-center rounded-lg shadow-sm hover:bg-orange-400 focus-visible:bg-orange-400 transition-all duration-500'>
              Update your delivery data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
