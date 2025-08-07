import type { ReactElement } from 'react';

import { BsClock, BsStar, BsPin } from 'react-icons/bs';

interface CardItem {
  id: number;
  icon: ReactElement;
  title: string;
  subtitle: string;
  body: string;
}

interface CardItemProps {
  data: CardItem;
}

const cardData: CardItem[] = [
  {
    id: 0,
    icon: <BsClock />,
    title: '25-45 Min',
    subtitle: 'Fast Delivery',
    body: 'Average delivery time',
  },
  {
    id: 1,
    icon: <BsStar />,
    title: '4.7 ⭐',
    subtitle: 'Top Rated',
    body: 'Customer satisfaction',
  },
  {
    id: 2,
    icon: <BsPin />,
    title: '25+ Areas',
    subtitle: 'Wide Coverage',
    body: 'Service locations',
  },
];

export default function HeroCards() {
  return (
    <div className='w-full h-auto grid grid-cols-2 gap-3 xl:grid-cols-3 xl:gap-x-6'>
      {cardData.map((card) => (
        <Card
          key={card.id}
          data={card}
        />
      ))}
    </div>
  );
}

function Card({ data }: CardItemProps) {
  return (
    <div className='w-full h-48 xl:h-76 border border-neutral-300 dark:border-neutral-600 flex flex-col items-center justify-center gap-1.5 lg:gap-3 p-3 xl:p-12 rounded-lg shadow-sm hover:shadow-xl focus-visible:shadow-xl transition-all duration-500'>
      <div className='w-12 h-12 xl:w-16 xl:h-16 rounded-full shadow-sm flex items-center justify-center bg-orange-200/50 dark:bg-stone-400/50'>
        <span className='text-orange-500 text-xl lg:text-2xl xl:text-3xl'>
          {data.icon}
        </span>
      </div>

      <h6 className='text-black dark:text-white text-lg lg:text-xl xl:text-2xl font-medium tracking-wide'>
        {data.title}
      </h6>

      <p className='text-neutral-800 dark:text-white/75 text-sm lg:text-base xl:text-lg font-normal tracking-wide'>
        {data.subtitle}
      </p>

      <p className='text-slate-500 dark:text-stone-400 text-xs lg:text-sm xl:text-base font-normal tracking-wide'>
        {data.body}
      </p>
    </div>
  );
}
