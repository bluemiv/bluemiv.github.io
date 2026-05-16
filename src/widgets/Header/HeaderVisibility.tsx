'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';

import clsx from 'clsx';

interface Props {
  children: ReactNode;
}

const HEADER_HIDE_THRESHOLD = 80;
const SCROLL_DELTA_THRESHOLD = 6;

export default function HeaderVisibility({ children }: Props) {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    const updateVisibility = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollYRef.current;

      if (currentScrollY <= HEADER_HIDE_THRESHOLD) {
        setIsVisible(true);
      } else if (Math.abs(scrollDelta) >= SCROLL_DELTA_THRESHOLD) {
        setIsVisible(scrollDelta < 0);
      }

      lastScrollYRef.current = currentScrollY;
      tickingRef.current = false;
    };

    const handleScroll = () => {
      if (tickingRef.current) return;

      tickingRef.current = true;
      window.requestAnimationFrame(updateVisibility);
    };

    lastScrollYRef.current = window.scrollY;
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      onFocusCapture={() => setIsVisible(true)}
      className={clsx(
        'motion-header sticky top-0 z-50 h-[60px] w-full px-md bg-app-surface-raised/85 dark:bg-app-dark-surface-raised/85 backdrop-blur-xl border-b border-app-border/80 dark:border-app-dark-border/80',
        'transition-transform duration-200 ease-out will-change-transform',
        isVisible ? 'translate-y-0' : '-translate-y-full',
      )}
    >
      {children}
    </header>
  );
}
