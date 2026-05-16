'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks';

export const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  if (theme === null) return <div className="w-[34px] h-[34px]" />;
  return (
    <button
      className="flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-150 ease-in-out cursor-pointer hover:bg-app-surface dark:hover:bg-app-dark-surface hover:text-app-primary dark:hover:text-app-dark-primary"
      onClick={toggleTheme}
      aria-label="테마 변경"
    >
      {theme === 'dark' ? <Sun size={17} strokeWidth={2.2} /> : <Moon size={17} strokeWidth={2.2} />}
    </button>
  );
};
