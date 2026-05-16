'use client';

import { useEffect, useRef, useState } from 'react';

import { ArrowUp } from 'lucide-react';
import clsx from 'clsx';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const tickingRef = useRef(false);

  useEffect(() => {
    const updateVisibility = () => {
      setIsVisible(window.scrollY > 520);
      tickingRef.current = false;
    };

    const handleScroll = () => {
      if (tickingRef.current) return;

      tickingRef.current = true;
      window.requestAnimationFrame(updateVisibility);
    };

    updateVisibility();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <button
      type="button"
      aria-label="맨 위로 이동"
      onClick={scrollToTop}
      className={clsx(
        'fixed bottom-5 right-5 z-30 flex h-11 w-11 items-center justify-center rounded-full',
        'border border-app-border/80 bg-app-surface-raised/90 text-app-text-muted shadow-[0_12px_36px_rgb(15_23_42_/_0.12)] backdrop-blur-xl',
        'transition-[opacity,transform,border-color,color,background-color] duration-200 ease-out',
        'hover:-translate-y-0.5 hover:border-app-primary hover:text-app-primary',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-app-primary/45 focus-visible:ring-offset-2 focus-visible:ring-offset-app-bg',
        'dark:border-app-dark-border/80 dark:bg-app-dark-surface-raised/90 dark:text-app-dark-text-muted dark:shadow-[0_12px_36px_rgb(0_0_0_/_0.28)]',
        'dark:hover:border-app-dark-primary dark:hover:text-app-dark-primary dark:focus-visible:ring-app-dark-primary/45 dark:focus-visible:ring-offset-app-dark-bg',
        isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
      )}
    >
      <ArrowUp size={18} strokeWidth={2.3} aria-hidden="true" />
    </button>
  );
}
