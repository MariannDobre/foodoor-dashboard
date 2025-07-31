// src/app/layout.tsx (Updated version matching your existing structure)
import type { Metadata } from 'next';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Lexend } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

import Topbar from '@/_components/_topbar/Topbar';
import SidebarWrapper from '@/_components/_sidebar/SidebarWrapper';

import './globals.css';

const lexend = Lexend({
  variable: '--font-lexend',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: 'Foodoor | %s',
    default: 'Foodoor',
  },
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${lexend?.className} h-auto xl:h-screen w-screen xl:overflow-hidden antialiased`}
      >
        <ThemeProvider>
          <Toaster
            position='bottom-right'
            gutter={12}
            containerStyle={{ margin: '16px' }}
            toastOptions={{
              success: {
                duration: 6500,
              },
              error: {
                duration: 6500,
              },
              style: {
                fontSize: '16px',
                maxWidth: '720px',
                textAlign: 'center',
                padding: '12px',
                backgroundColor: 'oklch(13% 0.028 261.692)',
                color: '#fff',
                borderRadius: '8px',
                letterSpacing: '1px',
                wordSpacing: '0.25px',
              },
            }}
          />

          <Topbar />

          <div className='flex flex-col h-auto xl:flex-row xl:h-[calc(100vh-80px)]'>
            <SidebarWrapper />

            <main className='bg-gray-100 dark:bg-neutral-900 flex-1 h-auto xl:h-full p-3 xl:p-6 xl:overflow-y-auto transition-colors duration-500'>
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
