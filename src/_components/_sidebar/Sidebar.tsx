'use client';

import React, { useState, useCallback, memo } from 'react';
import SidebarLink from './SidebarLink';
import ThemeToggle from './ThemeToggle';

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

import {
  BsHouse,
  BsBuildings,
  BsFileEarmarkText,
  BsPerson,
  BsPersonPlus,
  BsBoxArrowInRight,
  BsCart3,
} from 'react-icons/bs';

interface AuthSession {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  expires?: string;
}

interface ComponentProps {
  session: AuthSession | null;
}

interface LinkItem {
  id: number;
  label: string;
  value: string;
  icon: React.ReactElement;
}

const publicLinksNotAuth: LinkItem[] = [
  { id: 0, label: 'Home', value: '/', icon: <BsHouse /> },
  { id: 1, label: 'Restaurants', value: '/restaurants', icon: <BsBuildings /> },
  { id: 2, label: 'Cart', value: '/cart', icon: <BsCart3 /> },
  {
    id: 3,
    label: 'Log In',
    value: '/login',
    icon: <BsBoxArrowInRight />,
  },
  {
    id: 4,
    label: 'Register',
    value: '/register',
    icon: <BsPersonPlus />,
  },
];

const publicLinksAuth: LinkItem[] = [
  { id: 0, label: 'Home', value: '/', icon: <BsHouse /> },
  { id: 1, label: 'Restaurants', value: '/restaurants', icon: <BsBuildings /> },
  { id: 2, label: 'Cart', value: '/cart', icon: <BsCart3 /> },
];

const privateLinks: LinkItem[] = [
  {
    id: 0,
    label: 'Logs',
    value: '/logs',
    icon: <BsFileEarmarkText />,
  },
  { id: 1, label: 'Account', value: '/account', icon: <BsPerson /> },
];

function Sidebar({ session }: ComponentProps) {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  const toggleNav = useCallback(() => {
    setIsNavCollapsed((prev) => !prev);
  }, []);

  return (
    <aside
      className={`${
        isNavCollapsed ? 'w-full xl:w-35.25' : 'w-full xl:w-sm'
      } h-full flex flex-row items-center justify-start xl:flex-col xl:items-start xl:justify-start py-3 xl:py-0 border-r-0 xl:border-r xl:border-neutral-400 dark:border-neutral-700 bg-gray-950 dark:bg-black transition-all duration-500 relative`}
      aria-label='Main navigation'
    >
      <button
        type='button'
        className='hidden outline-none border border-neutral-400 dark:border-neutral-700 w-8 h-8 xl:flex xl:items-center xl:justify-center absolute xl:top-6 xl:-right-4 z-50 rounded-full shadow-sm text-white bg-orange-500 cursor-pointer hover:bg-orange-700 focus-visible:bg-orange-700 hover:border-gray-950 focus-visible:border-gray-950 transition-all duration-500'
        onClick={toggleNav}
        title={isNavCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        aria-label={isNavCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        aria-expanded={!isNavCollapsed}
      >
        <span>
          {isNavCollapsed ? (
            <FaChevronRight aria-hidden='true' />
          ) : (
            <FaChevronLeft aria-hidden='true' />
          )}
        </span>
      </button>

      <div className='w-auto xl:w-full py-0 px-3 xl:py-6 xl:px-12 flex flex-col items-start gap-4.5'>
        <h6
          className={`hidden xl:block text-sm text-gray-400 dark:text-stone-400 font-medium transition-opacity duration-250 ${
            isNavCollapsed ? 'opacity-0 invisible' : 'opacity-100 visible'
          }`}
          aria-hidden={isNavCollapsed}
        >
          NAVIGATION
        </h6>

        <ul
          className='w-auto xl:w-full h-auto flex flex-row xl:flex-col xl:items-start xl:justify-start gap-4.5'
          role='list'
        >
          {session?.user
            ? publicLinksAuth.map((link) => (
                <SidebarLink
                  key={link.id}
                  linkData={link}
                  isNavCollapsed={isNavCollapsed}
                />
              ))
            : publicLinksNotAuth.map((link) => (
                <SidebarLink
                  key={link.id}
                  linkData={link}
                  isNavCollapsed={isNavCollapsed}
                />
              ))}
        </ul>
      </div>

      {!session?.user ? null : (
        <div className='w-auto xl:w-full h-auto py-0 px-3 xl:py-0 xl:px-12 flex flex-col items-start gap-4.5'>
          <h6
            className={`hidden xl:block text-sm text-gray-400 dark:text-stone-400 font-medium transition-opacity duration-250 ${
              isNavCollapsed ? 'opacity-0 invisible' : 'opacity-100 visible'
            }`}
            aria-hidden={isNavCollapsed}
          >
            ACCOUNT
          </h6>

          <ul
            className='w-auto xl:w-full h-auto flex flex-row xl:flex-col items-start gap-4.5'
            role='list'
          >
            {privateLinks.map((link) => (
              <SidebarLink
                key={link.id}
                linkData={link}
                isNavCollapsed={isNavCollapsed}
              />
            ))}
          </ul>
        </div>
      )}

      <div className='w-auto xl:w-full h-auto py-0 px-3 xl:py-6 xl:px-12 ml-auto xl:mt-auto border-t-0 xl:border-t xl:border-neutral-400 dark:border-neutral-700'>
        <ThemeToggle isNavCollapsed={isNavCollapsed} />
      </div>
    </aside>
  );
}

export default memo(Sidebar);
