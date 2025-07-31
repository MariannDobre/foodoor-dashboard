import type { ReactElement } from 'react';

import { BsTruck, BsShield, BsClock, BsWallet } from 'react-icons/bs';

interface CardItem {
  id: number;
  icon: ReactElement;
  iconColor: string;
  tag: string;
  title: string;
  body: string;
}

interface CardItemProps {
  data: CardItem;
}

const cardData: CardItem[] = [
  {
    id: 0,
    icon: <BsTruck />,
    iconColor: 'text-emerald-600 dark:text-emerald-500',
    tag: 'Popular',
    title: 'Free Delivery',
    body: 'Free delivery on orders over 60 RON',
  },
  {
    id: 1,
    icon: <BsShield />,
    iconColor: 'text-blue-600 dark:text-blue-500',
    tag: 'Trusted',
    title: 'Safe & Secure',
    body: 'Your data and logs are protected',
  },
  {
    id: 2,
    icon: <BsClock />,
    iconColor: 'text-indigo-600 dark:text-indigo-500',
    tag: 'Live',
    title: 'Real-time Tracking',
    body: 'Track your order from kitchen to doorstep',
  },
  {
    id: 3,
    icon: <BsWallet />,
    iconColor: 'text-rose-600 dark:text-rose-500',
    tag: 'Flexible',
    title: 'Easy Payment',
    body: 'Pay when your food arrive',
  },
];

export default function WhyToChooseUs() {
  return (
    <div className='w-full h-auto flex flex-col items-center justify-center gap-9 my-6'>
      <div className='w-full h-auto flex flex-col items-center gap-1.5'>
        <h6 className='text-black dark:text-white text-lg xl:text-xl 2xl:text-2xl font-medium tracking-wide'>
          Why Choose FoodDash?
        </h6>

        <p className='text-slate-500 dark:text-stone-400 text-sm xl:text-base font-normal tracking-wide w-full max-w-[620px] text-center'>
          We&apos;re committed to delivering the best food experience with
          convenience, quality, and reliability.
        </p>
      </div>

      <div className='w-full grid grid-cols-2 gap-3 xl:grid-cols-4 xl:gap-x-6'>
        {cardData.map((card) => (
          <Card
            key={card.id}
            data={card}
          />
        ))}
      </div>
    </div>
  );
}

function Card({ data }: CardItemProps) {
  return (
    <div className='border border-neutral-300 dark:border-neutral-600 flex flex-col items-center gap-4.5 p-4.5 xl:p-6 2xl:p-9 rounded-lg shadow-sm w-full h-full hover:shadow-xl focus-visible:shadow-xl hover:-translate-y-2.5 focus-visible:-translate-y-2.5 transition-all duration-500'>
      <div className='w-full h-auto flex items-start justify-between'>
        <div className='w-8 h-8 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14 flex items-center justify-center rounded-sm xl:rounded-lg 2xl:rounded-2xl shadow-sm bg-transparent border border-orange-300 dark:border-orange-400'>
          <span
            className={`text-base xl:text-xl 2xl:text-2xl ${data.iconColor}`}
          >
            {data.icon}
          </span>
        </div>

        <span className='text-black text-xs xl:text-sm font-medium tracking-wider xl:tracking-wide bg-slate-300/75 dark:bg-stone-200/75 rounded-full py-1 xl:py-1.5 px-2 xl:px-3 shadow-sm'>
          {data.tag}
        </span>
      </div>

      <h6 className='text-black dark:text-white text-lg xl:text-xl 2xl:text-2xl font-normal tracking-wide self-start'>
        {data.title}
      </h6>

      <p className='text-slate-500 dark:text-stone-400 text-sm xl:text-base font-normal tracking-wide self-start'>
        {data.body}
      </p>
    </div>
  );
}
