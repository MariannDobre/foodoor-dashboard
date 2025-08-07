import { auth } from '@/_lib/auth';
import { getUserDeliveryData } from '@/_lib/actions';
import { GroupedLogData } from './LogsList';

import Image from 'next/image';

import { FaUser } from 'react-icons/fa';
import { MdOutlineLocationOn, MdOutlinePhone } from 'react-icons/md';

interface ComponentProps {
  data: GroupedLogData;
}

export default async function CardHeader({ data }: ComponentProps) {
  const session = await auth();
  const userDeliveryData = await getUserDeliveryData();

  return (
    <header className='w-full h-auto flex items-center justify-between'>
      <div className='flex items-center gap-3 lg:gap-4.5'>
        <div className='w-12 h-12 lg:w-13.5 lg:h-13.5 2xl:w-15 2xl:h-15 flex items-center justify-center bg-gray-300 dark:bg-stone-600/75 rounded-full shadow-sm'>
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
            <span className='text-gray-500 dark:text-white/75 text-lg lg:text-xl 2xl:text-2xl'>
              <FaUser />
            </span>
          )}
        </div>

        <div className='flex flex-col'>
          <h6 className='text-orange-500 text-sm lg:text-base font-medium tracking-wide mb-1.5'>
            {session?.user?.name ?? 'No user name was found!'}
          </h6>

          <p className='flex items-center gap-1 text-xs lg:text-sm text-gray-500 dark:text-stone-400 font-normal tracking-wider lg:tracking-wide mb-0.25'>
            <span className='text-sm lg:text-base text-black dark:text-white'>
              <MdOutlinePhone />
            </span>
            {userDeliveryData?.phone_number}
          </p>

          <p className='flex items-center gap-1 text-xs lg:text-sm text-gray-500 dark:text-stone-400 font-normal tracking-wider lg:tracking-wide mb-0.25'>
            <span className='text-sm lg:text-base text-black dark:text-white'>
              <MdOutlineLocationOn />
            </span>
            {userDeliveryData?.address}
          </p>
        </div>
      </div>

      <div className='flex flex-col items-center'>
        <span className='self-end py-1 px-2 lg:py-1.5 lg:px-3 rounded-sm lg:rounded-md 2xl:rounded-full shadow-sm bg-emerald-200/50 dark:bg-emerald-300/50 flex items-center justify-center text-center text-emerald-700 dark:text-emerald-400 text-xs font-medium tracking-wider mb-1'>
          Delivered
        </span>

        <p className='text-xs lg:text-sm text-gray-500 dark:text-stone-400 font-normal tracking-wider lg:tracking-wide mb-1.5 lg:mb-1.75'>
          {/* {data.created_at} */}
          {new Date(data.created_at).toLocaleString()}
        </p>

        <span className='self-end text-base lg:text-lg 2xl:text-xl text-emerald-500 dark:text-emerald-400 font-medium tracking-wide'>
          ${data.total_order_price.toFixed(2)}
        </span>
      </div>
    </header>
  );
}
