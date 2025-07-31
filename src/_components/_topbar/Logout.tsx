import { signOutAction } from '@/_lib/actions';
import { BsBoxArrowLeft } from 'react-icons/bs';

export default function Logout() {
  return (
    <form
      action={signOutAction}
      className='w-12 h-12 bg-transparent flex items-center justify-center rounded-2xl'
    >
      <button className='group outline-none border-none w-full h-full rounded-2xl flex items-center justify-center cursor-pointer bg-transparent hover:bg-orange-500 focus-visible:bg-orange-500 hover:shadow-lg focus-visible:shadow-lg transition-all duration-500'>
        <span className='text-xl text-neutral-500 dark:text-stone-400 group-hover:text-white group-focus-visible:text-white transition-all duration-500'>
          <BsBoxArrowLeft />
        </span>
      </button>
    </form>
  );
}
