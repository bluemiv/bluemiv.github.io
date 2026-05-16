'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks';

export const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  if (theme === null) return <div className="h-10 w-10" />;
  return (
    <button
      className="motion-chip flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-app-text-muted transition-colors duration-150 ease-in-out hover:bg-app-primary-soft hover:text-app-primary dark:text-app-dark-text-muted dark:hover:bg-app-dark-primary-soft dark:hover:text-app-dark-primary"
      onClick={toggleTheme}
      aria-label="테마 변경"
      title="테마 변경"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5" strokeWidth={2.2} />
      ) : (
        <Moon className="h-5 w-5" strokeWidth={2.2} />
      )}
    </button>
  );
};
