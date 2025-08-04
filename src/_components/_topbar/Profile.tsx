import { auth } from '@/_lib/auth';
import Link from 'next/link';
import Image from 'next/image';

// import MiniSpinner from '../_ui/MiniSpinner';
import { BsIncognito } from 'react-icons/bs';

export default async function Profile() {
  const session = await auth();

  return (
    <Link
      href={session?.user ? '/account' : '/login'}
      className='group w-7 h-7 2xl:w-12 2xl:h-12 outline-none border-none cursor-pointer flex items-center justify-center rounded-2xl'
    >
      <div
        className={`w-full h-full flex items-center justify-center rounded-2xl shadow-sm transition-all duration-500 overflow-hidden
        ${
          session?.user
            ? 'bg-orange-500 dark:bg-neutral-900 group-hover:bg-orange-700 group-focus-visible:bg-orange-700'
            : 'bg-gray-200 dark:bg-stone-500 group-hover:bg-gray-300 group-focus-visible:bg-gray-300'
        } group-hover:shadow-lg group-focus-visible:shadow-lg`}
      >
        {session?.user?.image ? (
          <div className='w-full h-full rounded-2xl relative'>
            <Image
              src={session.user?.image}
              alt={`Avatar of the user ${session.user?.name}`}
              fill
              priority
              placeholder='blur'
              blurDataURL={session.user?.image}
              referrerPolicy='no-referrer'
              className='w-full h-full object-cover rounded-2xl drop-shadow-sm'
            />
          </div>
        ) : (
          <span className='text-white text-2xl font-medium'>
            {session?.user ? (
              session.user?.name?.trim().charAt(0).toUpperCase()
            ) : (
              <BsIncognito />
            )}
          </span>
        )}
      </div>
    </Link>
  );
}
