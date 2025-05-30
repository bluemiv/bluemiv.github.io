'use client';

import { useRef, useState } from 'react';
import { useTheme } from '../hooks';
import MoonIcon from './MoonIcon';
import SunIcon from './SunIcon';

export default function ThemeToggleButton() {
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
      className="flex items-center justify-center w-[34px] h-[34px] rounded transition duration-150 ease-in-out cursor-pointer hover:bg-app-sub-bg dark:hover:bg-app-dark-sub-bg"
      onClick={onClick}
    >
      <div className={isFadeOut ? 'animate-theme-icon-fade-out' : 'animate-theme-icon-fade-in'}>
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </div>
    </button>
  );
}
