'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

// PAS 1: Definesc tipurile/interfaţa - ce date vreau să partajez in aplicaţie
interface ThemeContextTypes {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

// PAS 2: Creez Context-ul (cutia goală)
const ThemeContext = createContext<ThemeContextTypes | undefined>(undefined);

// PAS 3: Creez Provider-ul (cutia cu date + logică)
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Detectarea preferinței sistemului la prima încărcare
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  // Aplicarea clasei dark pe DOM element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className='flex flex-col'>{children}</div>
    </ThemeContext.Provider>
  );
};

// PAS 4: Creez hook-ul custom (modalitatea ușoară de acces)
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) throw new Error('useTheme must be used within ThemeProvider');

  return context;
};
