'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks';

export const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  if (theme === null) return <div className="h-9 w-9 sm:h-10 sm:w-10" />;
  return (
    <button
      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-colors duration-150 ease-in-out hover:bg-app-surface hover:text-app-primary dark:hover:bg-app-dark-surface dark:hover:text-app-dark-primary sm:h-10 sm:w-10"
      onClick={toggleTheme}
      aria-label="테마 변경"
      title="테마 변경"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5" strokeWidth={2.4} />
      ) : (
        <Moon className="h-5 w-5" strokeWidth={2.4} />
      )}
    </button>
  );
};
