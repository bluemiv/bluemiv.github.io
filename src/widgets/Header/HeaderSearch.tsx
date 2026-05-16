'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { CalendarDays, FileText, Hash, Search, X } from 'lucide-react';
import Link from 'next/link';
import { ROUTE_PATH } from '@/shared/constants/route';

export type HeaderSearchPost = {
  category: string;
  createdAt: string;
  description: string;
  slug: string;
  tags: string[];
  title: string;
};

interface Props {
  posts: HeaderSearchPost[];
}

const normalize = (value: string) => value.trim().toLowerCase();

export default function HeaderSearch({ posts }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const normalizedQuery = normalize(query);
    if (!normalizedQuery) return posts.slice(0, 8);

    return posts
      .map((post) => {
        const title = normalize(post.title);
        const description = normalize(post.description);
        const category = normalize(post.category);
        const tags = post.tags.map(normalize);
        const searchableText = [title, description, category, ...tags].join(' ');

        let score = 0;
        if (title.includes(normalizedQuery)) score += 8;
        if (tags.some((tag) => tag.includes(normalizedQuery))) score += 5;
        if (category.includes(normalizedQuery)) score += 3;
        if (description.includes(normalizedQuery)) score += 2;
        if (searchableText.includes(normalizedQuery)) score += 1;

        return { post, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map(({ post }) => post);
  }, [posts, query]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.isContentEditable;

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsOpen(true);
        return;
      }

      if (event.key === '/' && !isTyping) {
        event.preventDefault();
        setIsOpen(true);
        return;
      }

      if (event.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const frameId = requestAnimationFrame(() => inputRef.current?.focus());
    document.body.style.overflow = 'hidden';

    return () => {
      cancelAnimationFrame(frameId);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const closeSearch = () => {
    setIsOpen(false);
    setQuery('');
  };

  return (
    <>
      <button
        type="button"
        aria-label="글 검색"
        onClick={() => setIsOpen(true)}
        className="motion-chip flex h-8 items-center justify-center gap-1.5 rounded-full px-2.5 text-sm font-semibold text-app-text-muted dark:text-app-dark-text-muted hover:bg-app-primary-soft dark:hover:bg-app-dark-primary-soft hover:text-app-primary dark:hover:text-app-dark-primary"
      >
        <Search size={16} strokeWidth={2.2} aria-hidden="true" />
        <span className="hidden sm:inline">검색</span>
      </button>
      {isOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div className="fixed inset-0 z-[90] flex items-start justify-center bg-slate-950/35 px-md pt-[12vh] backdrop-blur-sm dark:bg-black/55">
            <button
              type="button"
              aria-label="검색 닫기"
              className="absolute inset-0 cursor-default"
              onClick={closeSearch}
            />
            <section
              role="dialog"
              aria-modal="true"
              aria-label="글 검색"
              className="motion-enter relative w-full max-w-[720px] overflow-hidden rounded-2xl border border-app-border dark:border-app-dark-border bg-app-surface/95 dark:bg-app-dark-surface/95 shadow-[0_28px_80px_rgb(15_23_42_/_0.22)] backdrop-blur-xl dark:shadow-[0_28px_80px_rgb(0_0_0_/_0.45)]"
            >
              <div className="flex items-center gap-sm border-b border-app-border dark:border-app-dark-border px-md py-sm">
                <Search
                  size={18}
                  strokeWidth={2.2}
                  aria-hidden="true"
                  className="text-app-primary dark:text-app-dark-primary"
                />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="제목, 설명, 태그로 검색"
                  className="h-11 min-w-0 flex-1 bg-transparent text-base font-semibold text-app-text outline-none placeholder:text-app-text-subtle dark:text-app-dark-text dark:placeholder:text-app-dark-text-subtle"
                />
                <button
                  type="button"
                  aria-label="검색 닫기"
                  onClick={closeSearch}
                  className="motion-chip flex h-9 w-9 items-center justify-center rounded-full text-app-text-muted dark:text-app-dark-text-muted hover:bg-app-surface-muted dark:hover:bg-app-dark-surface-muted"
                >
                  <X size={18} strokeWidth={2.2} aria-hidden="true" />
                </button>
              </div>
              <div className="max-h-[58vh] overflow-y-auto p-sm">
                {results.length > 0 ? (
                  <ul className="flex flex-col gap-xs">
                    {results.map((post) => (
                      <li key={`${post.category}-${post.slug}`}>
                        <Link
                          href={[ROUTE_PATH.BLOG, post.category, post.slug].join('/')}
                          onClick={closeSearch}
                          className="motion-card flex flex-col gap-xs rounded-xl border border-transparent px-md py-sm hover:border-app-border dark:hover:border-app-dark-border hover:bg-app-surface-muted/70 dark:hover:bg-app-dark-surface-muted/70"
                        >
                          <div className="flex items-center gap-xs text-xs font-semibold text-app-text-subtle dark:text-app-dark-text-subtle">
                            <FileText size={13} strokeWidth={2.2} aria-hidden="true" />
                            <span>{post.category}</span>
                            <span className="inline-flex items-center gap-[3px]">
                              <CalendarDays size={12} strokeWidth={2.2} aria-hidden="true" />
                              {post.createdAt.slice(0, 10)}
                            </span>
                          </div>
                          <strong className="line-clamp-1 text-base text-app-text dark:text-app-dark-text">
                            {post.title}
                          </strong>
                          <p className="line-clamp-2 text-sm leading-6 text-app-text-muted dark:text-app-dark-text-muted">
                            {post.description}
                          </p>
                          <div className="flex flex-wrap gap-xs">
                            {post.tags.slice(0, 4).map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center gap-[2px] rounded-full bg-app-primary-soft/70 dark:bg-app-dark-primary-soft/70 px-xs py-[2px] text-xs font-semibold text-app-primary dark:text-app-dark-primary"
                              >
                                <Hash size={11} strokeWidth={2.3} aria-hidden="true" />
                                {tag}
                              </span>
                            ))}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-md py-xl text-center text-sm font-semibold text-app-text-subtle dark:text-app-dark-text-subtle">
                    검색 결과가 없습니다.
                  </div>
                )}
              </div>
            </section>
          </div>,
          document.body,
        )}
    </>
  );
}
