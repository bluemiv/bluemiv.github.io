'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from '@/features/toggleTheme/hooks';

export const Comments = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.setAttribute('repo', process.env.NEXT_PUBLIC_COMMENTS_REPO!);
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('theme', theme === 'light' ? 'github-light' : 'dark-blue');
    script.setAttribute('cross-origin', 'anonymous');
    script.setAttribute('async', '');
    ref.current?.appendChild(script);
  }, [theme]);

  return (
    <div ref={ref} className="w-full min-h-[280px] [&_.utterances_.markdown-body]:bg-transparent" />
  );
};
