interface CardItem {
  id: number;
  step: number;
  title: string;
  body: string;
}

interface CardItemProps {
  data: CardItem;
  index: number;
  length: number;
}

const cardData: CardItem[] = [
  {
    id: 0,
    step: 1,
    title: 'Choose Location',
    body: 'Enter your delivery address',
  },
  {
    id: 1,
    step: 2,
    title: 'Browse & Order',
    body: 'Select your favorite dishes',
  },
  {
    id: 2,
    step: 3,
    title: 'Track & Enjoy',
    body: 'Monitor delivery and enjoy your meal',
  },
];

export default function HowItWorks() {
  return (
    <div className='flex flex-col items-center justify-center w-full h-auto gap-6 xl:gap-9 my-3 lg:my-4.5 xl:my-6'>
      <div className='w-full h-auto flex flex-col items-center justify-center gap-1.5'>
        <h6 className='text-black dark:text-white text-lg lg:text-xl xl:text-2xl font-medium tracking-wide text-center'>
          How It Works?
        </h6>

        <p className='text-slate-500 dark:text-stone-400 text-sm lg:text-base xl:text-lg font-normal tracking-wide w-full max-w-[620px] text-center'>
          Simple steps to get your food delivered.
        </p>
      </div>

      <div className='flex flex-col xl:flex-row items-center justify-center gap-6 xl:gap-12'>
        {cardData.map((card, index) => (
          <Card
            key={card.id}
            data={card}
            index={index}
            length={cardData.length}
          />
        ))}
      </div>
    </div>
  );
}

function Card({ data, index, length }: CardItemProps) {
  return (
    <div className='relative flex flex-col items-center w-auto xl:w-96'>
      <span className='mb-3 xl:mb-4.5 w-8 h-8 lg:w-12 lg:h-12 xl:w-16 xl:h-16 bg-orange-500 rounded-full shadow-sm flex items-center justify-center text-white font-medium text-base lg:text-lg xl:text-xl'>
        {data.step}
      </span>

      <h6 className='mb-1.5 text-black dark:text-white text-sm lg:text-base xl:text-2xl font-normal tracking-wide text-center'>
        {data.title}
      </h6>

      <p className='text-slate-500 dark:text-stone-400 text-xs lg:text-sm xl:text-base font-normal tracking-wider xl:tracking-wide text-center'>
        {data.body}
      </p>

      {index < length - 1 && (
        <div className='hidden 2xl:block absolute top-8 left-[56.5%] z-50 w-full h-1 bg-gradient-to-r from-orange-500 via-orange-300 to-orange-500' />
      )}
    </div>
  );
}
