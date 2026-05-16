'use client';

import { type ReactNode, useEffect, useState } from 'react';

import { Menu, X } from 'lucide-react';
import clsx from 'clsx';

interface Props {
  children: ReactNode;
}

export default function MobileSidebarMenu({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        aria-label={isOpen ? '사이드바 닫기' : '사이드바 열기'}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="motion-chip flex h-9 w-9 items-center justify-center rounded-full text-app-text-muted dark:text-app-dark-text-muted hover:bg-app-primary-soft dark:hover:bg-app-dark-primary-soft hover:text-app-primary dark:hover:text-app-dark-primary lg:hidden"
      >
        {isOpen ? (
          <X size={18} strokeWidth={2.3} aria-hidden="true" />
        ) : (
          <Menu size={18} strokeWidth={2.3} aria-hidden="true" />
        )}
      </button>
      <div
        className={clsx(
          'fixed inset-0 z-[80] lg:hidden',
          isOpen ? 'pointer-events-auto' : 'pointer-events-none',
        )}
        aria-hidden={!isOpen}
      >
        <button
          type="button"
          aria-label="사이드바 닫기"
          onClick={() => setIsOpen(false)}
          className={clsx(
            'absolute inset-0 bg-slate-950/30 backdrop-blur-sm transition-opacity duration-200 dark:bg-black/45',
            isOpen ? 'opacity-100' : 'opacity-0',
          )}
        />
        <aside
          onClickCapture={(event) => {
            if ((event.target as HTMLElement).closest('a')) setIsOpen(false);
          }}
          className={clsx(
            'motion-stagger absolute left-0 top-0 flex h-dvh w-[min(86vw,360px)] flex-col gap-xl overflow-y-auto bg-app-bg dark:bg-app-dark-bg px-md py-lg shadow-[18px_0_48px_rgb(15_23_42_/_0.18)] transition-transform duration-250 ease-out dark:shadow-[18px_0_48px_rgb(0_0_0_/_0.35)]',
            isOpen ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-app-text dark:text-app-dark-text">Menu</span>
            <button
              type="button"
              aria-label="사이드바 닫기"
              onClick={() => setIsOpen(false)}
              className="motion-chip flex h-9 w-9 items-center justify-center rounded-full text-app-text-muted dark:text-app-dark-text-muted hover:bg-app-primary-soft dark:hover:bg-app-dark-primary-soft hover:text-app-primary dark:hover:text-app-dark-primary"
            >
              <X size={18} strokeWidth={2.3} aria-hidden="true" />
            </button>
          </div>
          {children}
        </aside>
      </div>
    </>
  );
}
