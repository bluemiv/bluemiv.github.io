'use client';

import Icons from '@/widgets/Icons';
import { useEffect, useRef, useState } from 'react';

export default function ThemeToggleButton() {
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null);
  const [isFadeOut, setIsFadeOut] = useState<boolean>(false);
  const timeoutRef = useRef<null | NodeJS.Timeout>(null);

  useEffect(() => {
    const isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const curTheme =
      localStorage.getItem('theme')?.toLowerCase() ?? (isDarkTheme ? 'dark' : 'light');
    setThemeValue(curTheme as 'light' | 'dark');
  }, []);

  const setThemeValue = (nextTheme: 'light' | 'dark') => {
    localStorage.setItem('theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
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
      className="flex items-center justify-center w-[34px] h-[34px] rounded transition duration-150 ease-in-out hover:bg-slate-100 active:bg-slate-200 cursor-pointer"
      onClick={toggleTheme}
    >
      <div className={isFadeOut ? 'animate-theme-icon-fade-out' : 'animate-theme-icon-fade-in'}>
        {theme === 'dark' ? <Icons.SunIcon /> : <Icons.MoonIcon />}
      </div>
    </button>
  );
}
