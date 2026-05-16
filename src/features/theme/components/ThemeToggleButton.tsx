'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks';

export const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  if (theme === null) return <div className="h-10 w-10" />;
  return (
    <button
      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-colors duration-150 ease-in-out hover:bg-app-surface hover:text-app-primary dark:hover:bg-app-dark-surface dark:hover:text-app-dark-primary"
      onClick={toggleTheme}
      aria-label="테마 변경"
      title="테마 변경"
    >
      {theme === 'dark' ? (
        <Sun className="h-[1.375rem] w-[1.375rem]" strokeWidth={2.4} />
      ) : (
        <Moon className="h-[1.375rem] w-[1.375rem]" strokeWidth={2.4} />
      )}
    </button>
  );
};
