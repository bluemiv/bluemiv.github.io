'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import Icons from '@/widgets/Icons';

export default function ThemeToggleButton() {
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null);
  const [isFadeOut, setIsFadeOut] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useLayoutEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const setThemeValue = (nextTheme: 'light' | 'dark') => {
    localStorage.setItem('theme', nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    setTheme(nextTheme);
  };

  const toggleTheme = () => {
    if (timeoutRef.current) return;
    setIsFadeOut(true);
    timeoutRef.current = setTimeout(() => {
      setThemeValue(theme === 'dark' ? 'light' : 'dark');
      setIsFadeOut(false);
      clearTimeout(timeoutRef.current!);
      timeoutRef.current = null;
    }, 150);
  };

  if (theme === null) return <div className="w-[34px] h-[34px]" />;
  return (
    <button
      className="flex items-center justify-center w-[34px] h-[34px] rounded transition duration-150 ease-in-out cursor-pointer hover:bg-app-sub-bg dark:hover:bg-app-dark-sub-bg"
      onClick={toggleTheme}
    >
      <div className={isFadeOut ? 'animate-theme-icon-fade-out' : 'animate-theme-icon-fade-in'}>
        {theme === 'dark' ? <Icons.SunIcon /> : <Icons.MoonIcon />}
      </div>
    </button>
  );
}
