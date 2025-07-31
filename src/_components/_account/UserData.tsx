import { auth } from '@/_lib/auth';
import Image from 'next/image';

import { BsIncognito } from 'react-icons/bs';

export default async function UserData() {
  const session = await auth();

  return (
    <div className='border border-neutral-300 dark:border-neutral-600 flex flex-col items-center gap-6 p-6 rounded-lg shadow-sm w-full h-full'>
      <div className='w-full h-auto flex flex-col gap-0.5'>
        <h6 className='text-orange-500 text-xl font-medium tracking-wide'>
          Account Informations
        </h6>
        <p className='text-gray-500 dark:text-stone-400 text-sm font-normal tracking-wider'>
          Preview your account details such as username, avatar, and so on...
        </p>
      </div>

      <div className='w-full flex items-center gap-4.5'>
        <div className='w-18 h-18 bg-gray-300 dark:bg-neutral-600 flex items-center justify-center rounded-full shadow-sm relative'>
          {session?.user?.image ? (
            <div className='w-full h-full rounded-full relative'>
              <Image
                src={session.user?.image}
                alt={`Avatar of the user ${session.user?.name}`}
                fill
                priority
                placeholder='blur'
                blurDataURL={session.user?.image}
                referrerPolicy='no-referrer'
                className='w-full h-full object-cover rounded-full drop-shadow-sm'
              />
            </div>
          ) : (
            <span>
              {session?.user ? (
                session.user?.name?.trim().charAt(0).toUpperCase()
              ) : (
                <BsIncognito />
              )}
            </span>
          )}
        </div>

        <div className='flex flex-col'>
          <p className='text-lg text-black dark:text-white font-medium tracking-wide'>
            {session?.user?.name}
          </p>

          <span className='text-sm text-gray-500 dark:text-white/50 font-normal tracking-wide'>
            {session?.user?.email}
          </span>
        </div>
      </div>

      <div className='w-full h-full p-6 flex flex-col items-center justify-center bg-gray-200/75 dark:bg-stone-500/75 border border-neutral-400 dark:border-neutral-700 rounded-lg shadow-sm'>
        <p className='text-gray-500 dark:text-white/75 text-sm font-normal tracking-wider text-center'>
          Since your account was created using Google as the authentication
          provider, you can`t change your display name or email directly from
          here.
          <br />
          <br />
          If you`d like to update this information, please do so in your Google
          account settings — you`ll just need to sign in again here afterward
          for the changes to take effect!
        </p>
      </div>
    </div>
  );
}
