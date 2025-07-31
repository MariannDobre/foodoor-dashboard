import { auth } from '@/_lib/auth';
import LogsCard from './LogsCard';
import { getLogIdentifier, getLogsItems } from '@/_lib/actions';

export interface LogItemData {
  id: number;
  created_at: string;
  log_id: number;
  product_id: number;
  product_name: string;
  product_price: number;
  product_image: string;
  total_quantity: number;
  total_price: number;
  products: {
    id: number;
    restaurant_id: number;
    restaurants: {
      id: number;
      name: string;
      location: string;
    };
  };
}

export interface GroupedLogData {
  log_id: number;
  created_at: string;
  total_order_price: number;
  items: LogItemData[];
}

export default async function LogsList() {
  const session = await auth();
  const userId = session?.user?.user_id ?? null;

  const logs = await getLogIdentifier(userId);
  const logsIds = logs.map((log) => log.id);

  const logData = await getLogsItems(userId, logsIds);

  // Group log items by log_id
  const groupedLogsItems: GroupedLogData[] = logs
    .map((log) => {
      const items = logData.filter((item) => item.log_id === log.id);
      const totalOrderPrice = items.reduce(
        (sum, item) => sum + item.total_price,
        0
      );

      return {
        log_id: log.id,
        created_at: log.created_at,
        total_order_price: totalOrderPrice,
        items: items,
      };
    })
    .filter((log) => log.items.length > 0);

  return (
    <div className='relative border border-neutral-300 dark:border-neutral-600 flex flex-col items-center gap-6 p-6 rounded-lg shadow-sm w-full h-[calc(100%-62px-24px)] overflow-y-scroll'>
      <ul className='w-full h-auto flex flex-col gap-9'>
        {groupedLogsItems.map((groupedLogItem, index) => (
          <LogsCard
            key={index}
            data={groupedLogItem}
          />
        ))}
      </ul>

      {/* <button
        type='button'
        className='outline-none border-none cursor-pointer bg-orange-500 text-white rounded-lg shadow-sm py-1.5 px-6 text-base font-normal tracking-wide text-center hover:bg-orange-700 focus-visible:bg-orange-700 hover:shadow-lg focus-visible:shadow-lg transition-all duration-500'
      >
        Show More Logs
      </button> */}
    </div>
  );
}
