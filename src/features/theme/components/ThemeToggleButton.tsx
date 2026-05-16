'use client';

import { useRef, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks';

export const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();
  const [isFadeOut, setIsFadeOut] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const onClick = () => {
    if (timeoutRef.current) return;
    setIsFadeOut(true);
    timeoutRef.current = setTimeout(() => {
      toggleTheme();
      setIsFadeOut(false);
      clearTimeout(timeoutRef.current!);
      timeoutRef.current = null;
    }, 150);
  };

  if (theme === null) return <div className="w-[34px] h-[34px]" />;
  return (
    <button
      className="flex items-center justify-center w-8 h-8 rounded-full transition duration-150 ease-in-out cursor-pointer hover:bg-app-surface dark:hover:bg-app-dark-surface hover:text-app-primary dark:hover:text-app-dark-primary"
      onClick={onClick}
      aria-label="테마 변경"
    >
      <div className={isFadeOut ? 'animate-theme-icon-fade-out' : 'animate-theme-icon-fade-in'}>
        {theme === 'dark' ? (
          <Sun size={17} strokeWidth={2.2} />
        ) : (
          <Moon size={17} strokeWidth={2.2} />
        )}
      </div>
    </button>
  );
};
