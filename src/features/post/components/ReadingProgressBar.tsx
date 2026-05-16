'use client';

import { useEffect, useRef, useState } from 'react';

const clamp = (value: number) => Math.min(Math.max(value, 0), 1);

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    const updateProgress = () => {
      const article = document.querySelector<HTMLElement>('article.post-body');

      if (!article) {
        setProgress(0);
        tickingRef.current = false;
        return;
      }

      const articleTop = article.getBoundingClientRect().top + window.scrollY;
      const articleHeight = article.offsetHeight;
      const readableDistance = Math.max(articleHeight - window.innerHeight + 120, 1);
      const currentProgress = clamp((window.scrollY - articleTop) / readableDistance);

      setProgress(currentProgress);
      tickingRef.current = false;
    };

    const requestUpdate = () => {
      if (tickingRef.current) return;

      tickingRef.current = true;
      window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[60] h-[3px] w-full bg-transparent"
    >
      <div
        className="h-full origin-left bg-gradient-to-r from-app-primary via-app-accent to-app-primary dark:from-app-dark-primary dark:via-app-dark-accent dark:to-app-dark-primary shadow-[0_0_18px_rgb(37_99_235_/_0.35)] transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
