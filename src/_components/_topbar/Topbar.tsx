import { auth } from '@/_lib/auth';
import Logo from './Logo';
import Search from './Search';
import Logout from './Logout';
import Cart from './Cart';
import Profile from './Profile';

export default async function Topbar() {
  const session = await auth();

  return (
    <div className='py-0 px-3 xl:px-9 2xl:px-12 w-full h-20 flex items-center justify-between border-b border-neutral-400 dark:border-neutral-700 bg-gray-100 dark:bg-neutral-900 transition-colors duration-500'>
      <Logo />

      <Search />

      <div className='flex items-center gap-1.5 2xl:gap-3'>
        {session?.user ? <Logout /> : null}

        <Cart userId={session?.user?.user_id ?? null} />

        <Profile />
      </div>
    </div>
  );
}
