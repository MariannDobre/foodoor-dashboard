import type { ReactElement } from 'react';

import { BsPerson, BsStarFill } from 'react-icons/bs';

interface CardItem {
  id: number;
  icon: ReactElement;
  name: string;
  body: string;
  postAge: string;
}

interface CardItemProps {
  data: CardItem;
}

const cardData: CardItem[] = [
  {
    id: 0,
    icon: <BsPerson />,
    name: 'Sarah Johnson',
    body: '"Amazing service! Food arrived hot and fresh."',
    postAge: '2 hours ago',
  },
  {
    id: 1,
    icon: <BsPerson />,
    name: 'Mike Chen',
    body: '"Super fast delivery and great customer support."',
    postAge: '1 day ago',
  },
];

export default function Testimonials() {
  return (
    <div className='w-full flex flex-col items-center justify-center gap-9 my-6'>
      <h6 className='text-black dark:text-white text-lg xl:text-xl 2xl:text-2xl font-medium tracking-wide text-center'>
        What Our Customers Say?
      </h6>

      <div className='w-full flex flex-col xl:flex-row items-center justify-between gap-3 xl:gap-6'>
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
    <div className='bg-transparent p-4.5 xl:p-6 2xl:p-9 flex items-start gap-6 rounded-lg shadow-sm w-full h-full border border-neutral-300 dark:border-neutral-600 hover:shadow-xl focus-visible:shadow-xl transition-all duration-500'>
      <div className='w-8 h-8 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14 rounded-full shadow-sm flex items-center justify-center bg-orange-200/50 dark:bg-stone-400/50'>
        <span className='text-orange-500 text-base xl:text-xl 2xl:text-3xl'>
          {data.icon}
        </span>
      </div>

      <div className='flex flex-col gap-3'>
        <div className='flex items-start gap-3'>
          <h6 className='text-black dark:text-white text-base xl:text-lg font-normal tracking-wide'>
            {data.name}
          </h6>

          <div className='flex items-center gap-1 mt-1.5'>
            {Array.from({ length: 5 }).map((_, index) => (
              <span
                key={index}
                className='text-base text-amber-400 drop-shadow-sm'
              >
                {<BsStarFill />}
              </span>
            ))}
          </div>
        </div>

        <p className='text-slate-500 dark:text-stone-400 text-xs xl:text-sm font-normal tracking-wider'>
          {data.body}
        </p>

        <p className='text-slate-500 dark:text-stone-400 text-xs xl:text-sm font-normal tracking-wider'>
          {data.postAge}
        </p>
      </div>
    </div>
  );
}
