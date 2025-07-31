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
      className='group outline-none border-l-2 border-l-white cursor-pointer w-full h-9 py-1.5 px-3 rounded-lg hover:bg-gray-100/25 focus-visible:bg-gray-100/25 hover:shadow-lg focus-visible:shadow-lg transition-all duration-500'
      onClick={toggleTheme}
      aria-label={themeConfig.ariaLabel}
    >
      <div className='flex items-center gap-3 text-base tracking-wide text-white transition-all duration-500'>
        <span
          className='text-lg text-white transition-all duration-500'
          aria-hidden='true'
        >
          {themeConfig.icon}
        </span>
        {!isNavCollapsed && (
          <span className='truncate'>{themeConfig.label}</span>
        )}
      </div>
    </button>
  );
}

export default memo(ThemeToggle);
