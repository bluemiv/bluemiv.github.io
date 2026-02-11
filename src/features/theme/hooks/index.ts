'use client';

import { useCallback, useLayoutEffect } from 'react';
import { useThemeStore } from '../store';

type Theme = 'light' | 'dark';

export function useTheme() {
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);

  useLayoutEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial: Theme = stored
      ? stored.toLowerCase() === 'dark'
        ? 'dark'
        : 'light'
      : prefersDark
        ? 'dark'
        : 'light';

    document.documentElement.classList.toggle('dark', initial === 'dark');
    setTheme(initial);
  }, [setTheme]);

  const setThemeValue = useCallback(
    (next: Theme) => {
      localStorage.setItem('theme', next);
      document.documentElement.classList.toggle('dark', next === 'dark');
      setTheme(next);
    },
    [setTheme],
  );

  const toggleTheme = useCallback(() => {
    if (!theme) return;
    setThemeValue(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setThemeValue]);

  return { theme, setTheme: setThemeValue, toggleTheme };
}
