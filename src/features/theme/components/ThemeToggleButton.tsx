'use client';

import type { CSSProperties, MouseEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { createPortal, flushSync } from 'react-dom';
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
  const [isIconHidden, setIsIconHidden] = useState(false);
  const [fallbackReveal, setFallbackReveal] = useState<{
    x: number;
    y: number;
    radius: number;
    currentTheme: 'light' | 'dark';
  } | null>(null);
  const isAnimatingRef = useRef(false);
  const timeoutsRef = useRef<number[]>([]);

  const getRevealGeometry = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX || rect.left + rect.width / 2;
    const y = event.clientY || rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    return { x, y, radius };
  };

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(window.clearTimeout);
    };
  }, []);

  const toggleWithFallback = (event: MouseEvent<HTMLButtonElement>) => {
    const { x, y, radius } = getRevealGeometry(event);

    isAnimatingRef.current = true;
    flushSync(() => {
      setIsIconHidden(true);
      setFallbackReveal({ x, y, radius, currentTheme: theme });
    });
    toggleTheme();

    timeoutsRef.current = [
      window.setTimeout(() => {
        setIsIconHidden(false);
      }, 180),

      window.setTimeout(() => {
        setFallbackReveal(null);
        isAnimatingRef.current = false;
        timeoutsRef.current = [];
      }, 680),
    ];
  };

  const onClick = async (event: MouseEvent<HTMLButtonElement>) => {
    if (isAnimatingRef.current) return;
    if (!theme) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      toggleTheme();
      return;
    }

    const documentWithTransition = document as DocumentWithViewTransition;

    if (!documentWithTransition.startViewTransition) {
      toggleWithFallback(event);
      return;
    }

    const { x, y, radius } = getRevealGeometry(event);

    isAnimatingRef.current = true;
    setIsIconHidden(true);

    const transition = documentWithTransition.startViewTransition(() => {
      toggleTheme();
    });

    try {
      await transition.ready;
      const revealAnimation = document.documentElement.animate(
        {
          clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`],
        },
        {
          duration: 680,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          pseudoElement: '::view-transition-new(root)',
        },
      );
      await Promise.allSettled([revealAnimation.finished, transition.finished]);
    } finally {
      setIsIconHidden(false);
      isAnimatingRef.current = false;
    }
  };

  if (theme === null) return <div className="h-10 w-10" />;
  return (
    <>
      {fallbackReveal && (
        createPortal(
          <span
            className="pointer-events-none fixed inset-0 z-[999] animate-theme-reveal-fallback"
            style={
              {
                '--theme-reveal-x': `${fallbackReveal.x}px`,
                '--theme-reveal-y': `${fallbackReveal.y}px`,
                '--theme-reveal-radius': `${fallbackReveal.radius}px`,
                '--theme-reveal-size': '0px',
                backgroundColor: fallbackReveal.currentTheme === 'dark' ? '#0B1120' : '#F8FAFC',
              } as CSSProperties
            }
          />,
          document.body,
        )
      )}
      <button
        className="motion-chip relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-app-text-muted transition-colors duration-150 ease-in-out hover:bg-app-primary-soft hover:text-app-primary dark:text-app-dark-text-muted dark:hover:bg-app-dark-primary-soft dark:hover:text-app-dark-primary"
        onClick={onClick}
        aria-label="테마 변경"
        title="테마 변경"
      >
        <span key={theme} className={isIconHidden ? 'animate-theme-icon-out' : 'animate-theme-icon-in'}>
          {theme === 'dark' ? (
            <Sun className="h-5 w-5" strokeWidth={2.2} />
          ) : (
            <Moon className="h-5 w-5" strokeWidth={2.2} />
          )}
        </span>
      </button>
    </>
  );
};
