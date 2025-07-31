import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from '@/_lib/actions';

import Image from 'next/image';

import { BsTrash } from 'react-icons/bs';
import { FaPlus, FaMinus } from 'react-icons/fa6';

interface ComponentProps {
  item: {
    id: number;
    created_at: string;
    product_id: number;
    total_quantity: number;
    total_price: number;
    cart_id: string | null;
    user_id: number;
    products: {
      id: number;
      name: string;
      image: string;
      price: number;
      created_at: string;
      description: string;
      product_tag: string;
      restaurant_id: number;
      weight_in_grams: number;
      prep_time_in_seconds: number;
    };
  };
}

export default async function CartItem({ item }: ComponentProps) {
  const productId = item?.products?.id;
  const productPrice = item?.products?.price;

  async function handleIncrementQuantity() {
    'use server';

    await incrementQuantity(productId, productPrice);
  }

  async function handleDecrementQuantity() {
    'use server';

    await decrementQuantity(productId, productPrice);
  }

  async function handleRemoveProduct() {
    'use server';

    await removeItem(productId);
  }

  return (
    <div
      key={item.id}
      className='w-full h-auto p-3 flex items-center justify-between rounded-lg shadow-sm border border-neutral-400 dark:border-neutral-700'
    >
      <div className='flex items-center gap-4'>
        <div className='w-16 h-16 relative'>
          <Image
            src={item.products.image}
            alt={item.products.name}
            fill
            priority
            placeholder='blur'
            blurDataURL={item.products.image}
            className='object-cover rounded-lg drop-shadow-sm'
          />
        </div>

        <div className='flex flex-col gap-0.5'>
          <h3 className='text-lg text-black dark:text-white font-medium tracking-wide'>
            {item.products.name}&nbsp;
            {item.products.product_tag.toLowerCase().includes('spicy')
              ? '🌶️'
              : null}
          </h3>

          <p className='text-sm text-gray-500 dark:text-stone-400 font-normal tracking-wider'>
            ${item.products.price} per item
          </p>
        </div>
      </div>

      <div className='flex items-center gap-4.5'>
        <form
          action={handleDecrementQuantity}
          className='w-8 h-8 flex items-center justify-center'
        >
          <button
            type='submit'
            className='group outline-none border border-neutral-400 dark:border-neutral-700 cursor-pointer flex items-center justify-center rounded-lg shadow-sm w-8 h-8 hover:bg-orange-500 dark:hover:bg-stone-500/75 focus-visible:bg-orange-500 dark:focus-visible:bg-stone-500/75 hover:border-white dark:hover:border-neutral-400 focus-visible:border-white dark:focus-visible:border-neutral-400 transition-all duration-500'
            title={`Decrease the quantity by 1 for ${item.products.name}.`}
          >
            <span className='text-gray-500 dark:text-stone-400 text-base group-hover:text-white group-focus-visible:text-white transition-all duration-500'>
              <FaMinus />
            </span>
          </button>
        </form>

        <span className='text-sm text-black dark:text-stone-400 font-medium'>
          {item.total_quantity}
        </span>

        <form
          action={handleIncrementQuantity}
          className='w-8 h-8 flex items-center justify-center'
        >
          <button
            type='submit'
            className='group outline-none border border-neutral-400 dark:border-neutral-700 cursor-pointer flex items-center justify-center rounded-lg shadow-sm w-8 h-8 hover:bg-orange-500 dark:hover:bg-stone-500/75 focus-visible:bg-orange-500 dark:focus-visible:bg-stone-500/75 hover:border-white dark:hover:border-neutral-400 focus-visible:border-white dark:focus-visible:border-neutral-400 transition-all duration-500'
            title={`Increase the quantity by 1 for ${item.products.name}.`}
          >
            <span className='text-gray-500 dark:text-stone-400 text-base group-hover:text-white group-focus-visible:text-white transition-all duration-500'>
              <FaPlus />
            </span>
          </button>
        </form>

        <span className='text-sm text-gray-500 font-medium tracking-wide w-6 flex items-center justify-center'>
          ${item.total_quantity * item.products.price}
        </span>

        <form
          action={handleRemoveProduct}
          className='w-8 h-8 flex items-center justify-center'
        >
          <button
            type='submit'
            className='group outline-none border border-neutral-400 dark:border-neutral-700 cursor-pointer flex items-center justify-center rounded-lg shadow-sm w-8 h-8 hover:bg-red-500 dark:hover:bg-red-700/50 focus-visible:bg-red-500 dark:focus-visible:bg-red-700/50 hover:border-white dark:hover:border-neutral-400 focus-visible:border-white dark:focus-visible:border-neutral-400 transition-all duration-500'
            title={`Remove ${item.products.name} from cart.`}
          >
            <span className='text-red-500 text-base group-hover:text-white group-focus-visible:text-white transition-all duration-500'>
              <BsTrash />
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
