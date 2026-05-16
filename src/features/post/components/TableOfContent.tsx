'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { ChevronRight, ListTree } from 'lucide-react';
import { RSSLink } from '@/features/post/components';

type TocItem = { level: string; id: string; label: string };

export default function TableOfContent() {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeTocItemId, setActiveTocItemId] = useState<string | null>(null);
  const activeIndex = Math.max(
    tocItems.findIndex((item) => item.id === activeTocItemId),
    0,
  );
  const progress = tocItems.length > 1 ? (activeIndex / (tocItems.length - 1)) * 100 : 0;

  useEffect(() => {
    const article = document.querySelector('article');
    if (!article) return;

    const observer = new IntersectionObserver(
      (e) => {
        const firstElement = e[0];
        if (firstElement.isIntersecting) {
          setActiveTocItemId(firstElement.target.id);
        }
      },
      { root: null, rootMargin: '0px 0px -50% 0px', threshold: 1 },
    );

    const headingTags = article.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const nextTocItems: TocItem[] = [];
    for (const heading of headingTags) {
      nextTocItems.push({
        id: heading.id,
        level: heading.tagName.toLowerCase(),
        label: heading.textContent ?? '',
      });
      observer.observe(heading);
    }

    const frameId = requestAnimationFrame(() => {
      setTocItems(nextTocItems);
      setActiveTocItemId(nextTocItems[0]?.id);
    });

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, []);

  return (
    <aside className="motion-enter hidden w-full sticky top-[72px] lg:inline-block lg:max-w-[250px] md:right-0 pt-md">
      <div className="pl-md">
        <div className="flex items-center justify-between gap-sm pb-md mb-md border-b border-app-border/80 dark:border-app-dark-border/80">
          <div className="inline-flex items-center gap-xs font-bold text-sm text-app-text dark:text-app-dark-text">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-app-primary-soft dark:bg-app-dark-primary-soft text-app-primary dark:text-app-dark-primary">
              <ListTree size={15} strokeWidth={2.3} />
            </span>
            목차
          </div>
          <span className="text-[11px] font-semibold text-app-text-subtle dark:text-app-dark-text-subtle">
            {tocItems.length}
          </span>
        </div>
        <div className="relative">
          <div className="absolute left-[5px] top-1 bottom-1 w-px rounded-full bg-app-border dark:bg-app-dark-border">
            <div
              className="w-px rounded-full bg-app-primary dark:bg-app-dark-primary transition-[height] duration-300 ease-out"
              style={{ height: `${progress}%` }}
            />
          </div>
          <ul className="motion-stagger flex flex-col gap-[3px] text-sm max-h-[58vh] overflow-hidden hover:overflow-y-auto pr-xs pb-xs">
            {tocItems.map((item) => {
              const isActive = activeTocItemId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const targetElement = document.getElementById(item.id);
                      if (targetElement) {
                        setActiveTocItemId(item.id);
                        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className={clsx(
                      'motion-chip group relative flex min-h-8 items-center gap-xs rounded-lg py-xs pr-sm text-app-text-muted dark:text-app-dark-text-muted hover:text-app-primary dark:hover:text-app-dark-primary',
                      isActive
                        ? 'text-app-primary dark:text-app-dark-primary font-semibold'
                        : '',
                      {
                        'pl-md': item.level === 'h1' || item.level === 'h2',
                        'pl-lg': item.level === 'h3',
                        'pl-xl': item.level === 'h4',
                        'pl-2xl': item.level === 'h5' || item.level === 'h6',
                      },
                    )}
                    title={item.label}
                  >
                    <span
                      className={clsx(
                        'absolute left-[1px] h-2 w-2 rounded-full border border-app-border dark:border-app-dark-border bg-app-surface dark:bg-app-dark-surface transition-colors',
                        isActive ? 'border-app-primary dark:border-app-dark-primary bg-app-primary dark:bg-app-dark-primary' : '',
                      )}
                    />
                    <span className="line-clamp-2 leading-5">{item.label}</span>
                    <ChevronRight
                      size={13}
                      strokeWidth={2.3}
                      className={clsx(
                        'ml-auto shrink-0 opacity-0 transition-opacity group-hover:opacity-70',
                        isActive ? 'opacity-80' : '',
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="pt-md mt-md border-t border-app-border/80 dark:border-app-dark-border/80 flex items-center justify-between gap-sm">
          <span className="text-[11px] font-semibold text-app-text-subtle dark:text-app-dark-text-subtle">
            읽기 지도
          </span>
          <RSSLink />
        </div>
      </div>
    </aside>
  );
}
