'use client';

import { useMemo, memo } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface LinkProps {
  linkData: {
    id: number;
    label: string;
    value: string;
    icon: React.ReactElement;
  };
  isNavCollapsed: boolean;
}

function SidebarLink({ linkData, isNavCollapsed }: LinkProps) {
  const pathname = usePathname();

  // Logica îmbunătățită pentru a detecta starea activă
  const isActive = useMemo(() => {
    // Pentru homepage, verifică exact
    if (linkData.value === '/') {
      return pathname === '/';
    }

    // Pentru alte linkuri, verifică dacă pathname începe cu valoarea linkului
    return pathname.startsWith(linkData.value);
  }, [pathname, linkData.value]);

  const linkClasses = useMemo(() => {
    const baseClasses = `${
      isNavCollapsed ? 'w-11.25' : 'w-auto xl:w-full'
    } cursor-pointer h-full group outline-none border-l-0 lg:border-l-2 flex items-center gap-3 text-xs lg:text-base tracking-wider lg:tracking-wide py-0 px-0 lg:py-1.5 lg:px-3 rounded-sm lg:rounded-md xl:rounded-lg transition-all duration-500`;

    const stateClasses = isActive
      ? 'lg:border-l-orange-500 bg-transparent text-orange-500 lg:hover:bg-gray-100/15 lg:focus-visible:bg-gray-100/15'
      : 'lg:border-l-white bg-transparent text-white hover:text-orange-300 focus-visible:text-orange-300 lg:hover:text-white lg:focus-visible:text-white lg:hover:bg-gray-100/25 lg:focus-visible:bg-gray-100/25 hover:shadow-lg focus-visible:shadow-lg';

    return `${baseClasses} ${stateClasses}`;
  }, [isNavCollapsed, isActive]);

  const iconClasses = useMemo(
    () =>
      `hidden xl:inline-block text-lg transition-all duration-500 ${
        isActive ? 'text-orange-500' : 'text-white'
      }`,
    [isActive]
  );

  return (
    <li className='w-full h-9'>
      <Link
        className={linkClasses}
        href={linkData.value}
        aria-current={isActive ? 'page' : undefined}
        aria-label={`Navigate to ${linkData.label}`}
        tabIndex={isActive ? -1 : 0}
      >
        <span
          className={iconClasses}
          aria-hidden='true'
        >
          {linkData.icon}
        </span>
        {!isNavCollapsed && <span className='truncate'>{linkData.label}</span>}
      </Link>
    </li>
  );
}

export default memo(SidebarLink);
