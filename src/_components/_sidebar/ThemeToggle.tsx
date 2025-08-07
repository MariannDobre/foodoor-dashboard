'use client';

import { useMemo, memo } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

interface ThemeToggleProps {
  isNavCollapsed: boolean;
}

function ThemeToggle({ isNavCollapsed }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  const themeConfig = useMemo(
    () => ({
      icon: theme === 'light' ? <FaSun /> : <FaMoon />,
      label: theme === 'light' ? 'Light Theme' : 'Dark Theme',
      ariaLabel: `Switch to ${theme === 'light' ? 'dark' : 'light'} theme`,
    }),
    [theme]
  );

  return (
    <button
      type='button'
      className='group outline-none border-l-0 lg:border-l-2 lg:border-l-white cursor-pointer w-full h-9 py-0 px-0 lg:py-1.5 lg:px-3 rounded-lg lg:hover:bg-gray-100/25 lg:focus-visible:bg-gray-100/25 hover:shadow-lg focus-visible:shadow-lg transition-all duration-500'
      onClick={toggleTheme}
      aria-label={themeConfig.ariaLabel}
    >
      <div className='flex items-center gap-3 text-base tracking-wide text-white transition-all duration-500'>
        <span
          className='text-base lg:text-lg text-white hover:text-orange-300 focus-visible:text-orange-300 lg:hover:text-white lg:focus-visible:text-white transition-all duration-500'
          aria-hidden='true'
        >
          {themeConfig.icon}
        </span>
        {!isNavCollapsed && (
          <span className='truncate hidden xl:inline-block'>
            {themeConfig.label}
          </span>
        )}
      </div>
    </button>
  );
}

export default memo(ThemeToggle);
