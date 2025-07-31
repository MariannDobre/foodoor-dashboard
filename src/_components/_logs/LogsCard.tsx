import { GroupedLogData } from './LogsList';
import CardHeader from './CardHeader';
import CardBody from './CardBody';

interface ComponentProps {
  data: GroupedLogData;
}

export default function LogsCard({ data }: ComponentProps) {
  return (
    <li className='border border-neutral-300 dark:border-neutral-600 flex flex-col w-full h-auto rounded-lg shadow-xs p-4.5'>
      <CardHeader data={data} />

      <div className='w-full h-px bg-neutral-300 dark:bg-neutral-600 my-6' />

      <CardBody data={data} />
    </li>
  );
}
