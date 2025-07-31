import Image from 'next/image';
import { GroupedLogData } from './LogsList';

interface ComponentProps {
  data: GroupedLogData;
}

export default function CardBody({ data }: ComponentProps) {
  // Group items by restaurant
  const itemsByRestaurant = new Map<number, typeof data.items>();

  data.items.forEach((item) => {
    const restaurantId = item.products.restaurant_id;
    if (!itemsByRestaurant.has(restaurantId)) {
      itemsByRestaurant.set(restaurantId, []);
    }
    itemsByRestaurant.get(restaurantId)!.push(item);
  });

  return (
    // <div className='w-full h-auto flex flex-col gap-4.5 p-4.5 bg-gray-200 rounded-lg shadow-xs'>
    //   <div className='flex flex-col gap-1'>
    //     <h6 className='text-black text-base font-medium tracking-wide'>
    //       {/* {data.orderBody[0].restaurantName} */}
    //       DaVinci
    //     </h6>

    //     <p className='text-sm text-gray-500 font-normal tracking-wide'>
    //       {/* {data.orderBody[0].restaurantAddress} */}
    //       Duzilor 222
    //     </p>
    //   </div>

    //   <div className='w-full h-auto flex flex-col gap-4.5'>
    //     {data.items.map((item, index) => (
    //       <div
    //         key={`${item.log_id}-${item.product_id}-${index}`}
    //         className='w-full h-auto flex items-center justify-between p-4.5 bg-gray-100 rounded-lg shadow-xs'
    //       >
    //         <div className='flex items-center gap-3'>
    //           {item?.product_image ? (
    //             <div className='w-15 h-15 rounded-lg relative'>
    //               <Image
    //                 src={item.product_image}
    //                 alt={`Avatar of the user ${item.product_name}`}
    //                 fill
    //                 priority
    //                 placeholder='blur'
    //                 blurDataURL={item.product_image}
    //                 referrerPolicy='no-referrer'
    //                 className='w-full h-full object-cover rounded-lg drop-shadow-sm'
    //               />
    //             </div>
    //           ) : (
    //             <div className='w-15 h-15 rounded-lg bg-gray-300' />
    //           )}

    //           <div className='flex flex-col gap-0.25'>
    //             <h6 className='text-black text-sm font-medium tracking-wider'>
    //               {item.product_name}
    //             </h6>

    //             <p className='flex items-center text-sm text-gray-500 font-normal tracking-wide'>
    //               Quantity:&nbsp;
    //               <span className='text-base text-orange-500'>
    //                 {item.total_quantity}
    //               </span>
    //             </p>
    //           </div>
    //         </div>

    //         <div className='flex flex-col gap-0.25'>
    //           <p className='self-end text-lg text-black font-medium tracking-wide'>
    //             ${item.product_price.toFixed(2)}
    //           </p>

    //           <span className='self-end text-sm text-gray-500 font-normal tracking-wide'>
    //             each
    //           </span>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>

    <div className='w-full h-auto flex flex-col gap-6'>
      {Array.from(itemsByRestaurant.entries()).map(([restaurantId, items]) => {
        const restaurant = items[0].products.restaurants; // All items from same restaurant

        return (
          <div
            key={restaurantId}
            className='w-full h-auto flex flex-col gap-4.5 p-4.5 bg-gray-200 dark:bg-stone-500/75 rounded-lg shadow-xs'
          >
            <div className='flex flex-col gap-1'>
              <h6 className='text-black dark:text-white text-base font-medium tracking-wide'>
                {restaurant.name}
              </h6>

              <p className='text-sm text-gray-500 dark:text-stone-400 font-normal tracking-wide'>
                {restaurant.location}
              </p>
            </div>

            <div className='w-full h-auto flex flex-col gap-4.5'>
              {items.map((item, index) => (
                <div
                  key={`${item.log_id}-${item.product_id}-${index}`}
                  className='w-full h-auto flex items-center justify-between p-4.5 bg-gray-100 dark:bg-stone-400/75 rounded-lg shadow-xs'
                >
                  <div className='flex items-center gap-3'>
                    {item?.product_image ? (
                      <div className='w-15 h-15 rounded-lg relative'>
                        <Image
                          src={item.product_image}
                          alt={`Image of the product ${item.product_name}`}
                          fill
                          priority
                          placeholder='blur'
                          blurDataURL={item.product_image}
                          referrerPolicy='no-referrer'
                          className='w-full h-full object-cover rounded-lg drop-shadow-sm'
                        />
                      </div>
                    ) : (
                      <div className='w-15 h-15 rounded-lg bg-gray-300 dark:bg-neutral-600' />
                    )}

                    <div className='flex flex-col gap-0.25'>
                      <h6 className='text-black dark:text-white text-sm font-medium tracking-wider'>
                        {item.product_name}
                      </h6>

                      <p className='flex items-center text-sm text-gray-500 dark:text-white/75 font-normal tracking-wide'>
                        Quantity:&nbsp;
                        <span className='text-base text-orange-500'>
                          {item.total_quantity}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className='flex flex-col gap-0.25'>
                    <p className='self-end text-lg text-black dark:text-white font-medium tracking-wide'>
                      ${item.product_price.toFixed(2)}
                    </p>

                    <span className='self-end text-sm text-gray-500 dark:text-white/75 font-normal tracking-wide'>
                      each
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
