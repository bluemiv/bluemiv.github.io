'use client';

import type { CSSProperties } from 'react';
import { useRef, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks';

type ViewTransition = {
  ready: Promise<void>;
  finished: Promise<void>;
};

type DocumentWithViewTransition = Document & {
  startViewTransition?: (callback: () => void) => ViewTransition;
};

export const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();
  const [isFadeOut, setIsFadeOut] = useState(false);
  const [fallbackReveal, setFallbackReveal] = useState<{
    x: number;
    y: number;
    radius: number;
    nextTheme: 'light' | 'dark';
  } | null>(null);
  const isAnimatingRef = useRef(false);

  const toggleWithFallback = (
    event: React.MouseEvent<HTMLButtonElement>,
    prefersReducedMotion: boolean,
  ) => {
    isAnimatingRef.current = true;
    setIsFadeOut(true);

    if (!prefersReducedMotion && theme) {
      const x = event.clientX;
      const y = event.clientY;
      const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
      const nextTheme = theme === 'dark' ? 'light' : 'dark';

      setFallbackReveal({ x, y, radius, nextTheme });
      window.setTimeout(() => {
        toggleTheme();
        setIsFadeOut(false);
      }, 320);
      window.setTimeout(() => {
        setFallbackReveal(null);
        isAnimatingRef.current = false;
      }, 680);
      return;
    }

    window.setTimeout(() => {
      toggleTheme();
      setIsFadeOut(false);
      isAnimatingRef.current = false;
    }, 150);
  };

  const onClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isAnimatingRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const documentWithTransition = document as DocumentWithViewTransition;

    if (!documentWithTransition.startViewTransition || prefersReducedMotion) {
      toggleWithFallback(event, prefersReducedMotion);
      return;
    }

    isAnimatingRef.current = true;
    setIsFadeOut(true);

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = documentWithTransition.startViewTransition(() => {
      toggleTheme();
    });

    try {
      await transition.ready;
      document.documentElement.animate(
        {
          clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`],
        },
        {
          duration: 620,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          pseudoElement: '::view-transition-new(root)',
        },
      );
      await transition.finished;
    } finally {
      setIsFadeOut(false);
      isAnimatingRef.current = false;
    }
  };

  if (theme === null) return <div className="w-[34px] h-[34px]" />;
  return (
    <button
      className="flex items-center justify-center w-8 h-8 rounded-full transition duration-150 ease-in-out cursor-pointer hover:bg-app-surface dark:hover:bg-app-dark-surface hover:text-app-primary dark:hover:text-app-dark-primary"
      onClick={onClick}
      aria-label="테마 변경"
    >
      {fallbackReveal && (
        <span
          className="pointer-events-none fixed inset-0 z-50 animate-theme-reveal-fallback"
          style={{
            '--theme-reveal-x': `${fallbackReveal.x}px`,
            '--theme-reveal-y': `${fallbackReveal.y}px`,
            '--theme-reveal-radius': `${fallbackReveal.radius}px`,
            backgroundColor: fallbackReveal.nextTheme === 'dark' ? '#0B1120' : '#F8FAFC',
          } as CSSProperties}
        />
      )}
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
