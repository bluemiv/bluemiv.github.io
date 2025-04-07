'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';

export default function TableOfContent() {
  const [tocItems, setTocItems] = useState<{ level: string; id: string; label: string }[]>([]);
  const [activeTocItemId, setActiveTocItemId] = useState<string | null>(null);

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
    const nextTocItems = [];
    for (const heading of headingTags) {
      nextTocItems.push({
        id: heading.id,
        level: heading.tagName.toLowerCase(),
        label: heading.innerHTML,
      });
      observer.observe(heading);
    }
    setTocItems(nextTocItems);
    setActiveTocItemId(nextTocItems[0]?.id);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="hidden w-full sticky top-[50px] h-auto lg:inline-block lg:max-w-[250px] md:sticky md:right-0 md:top-header">
      <div className="font-semibold pb-md mb-md">목차</div>
      <ul className="flex flex-col gap-md text-sm max-h-[75vh] overflow-y-auto pb-md border-b md:pb-0 md:border-none">
        {tocItems.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                const targetElement = document.getElementById(item.id);
                if (targetElement) {
                  targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className={clsx(
                'hover:text-primary-hover',
                activeTocItemId === item.id ? 'md:text-primary md:font-semibold' : '',
                {
                  'ml-0': item.level === 'h1' || item.level === 'h2',
                  'ml-[0.5rem]': item.level === 'h3',
                  'ml-[1rem]': item.level === 'h4',
                  'ml-[1.5rem]': item.level === 'h5',
                  'ml-[2rem]': item.level === 'h6',
                },
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
