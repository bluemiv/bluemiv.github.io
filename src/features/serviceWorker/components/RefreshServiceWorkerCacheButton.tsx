'use client';

import { RefreshCw, Sparkles, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const CONFIRMED_VERSION_STORAGE_KEY = 'bluemiv:confirmed-app-version';

export default function RefreshServiceWorkerCacheButton() {
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [isNoticeVisible, setIsNoticeVisible] = useState(false);
  const [pendingVersion, setPendingVersion] = useState<string | null>(null);

  const refreshContent = () => {
    if (pendingVersion) {
      window.localStorage.setItem(CONFIRMED_VERSION_STORAGE_KEY, pendingVersion);
    }
    window.location.reload();
  };

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    const handleMessage = (event: MessageEvent) => {
      const version = event.data?.version;

      if (event.data?.type !== 'APP_UPDATE_AVAILABLE' || typeof version !== 'string') return;

      const confirmedVersion = window.localStorage.getItem(CONFIRMED_VERSION_STORAGE_KEY);
      if (confirmedVersion === version) return;

      console.log('[APP] 새 버전이 있습니다.');
      setPendingVersion(version);
      setIsUpdateAvailable(true);
      setIsNoticeVisible(true);
    };

    navigator.serviceWorker.addEventListener('message', handleMessage);

    return () => {
      navigator.serviceWorker.removeEventListener('message', handleMessage);
    };
  }, []);

  if (!isUpdateAvailable) return null;

  const notice = (
    <div className="fixed inset-x-md bottom-md z-[85] mx-auto flex max-w-[420px] items-start gap-sm rounded-2xl border border-app-primary/25 bg-app-surface/95 p-md shadow-[0_18px_54px_rgb(15_23_42_/_0.18)] backdrop-blur-xl dark:border-app-dark-primary/30 dark:bg-app-dark-surface/95 dark:shadow-[0_18px_54px_rgb(0_0_0_/_0.35)]">
      <div className="mt-[2px] flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-app-primary-soft text-app-primary dark:bg-app-dark-primary-soft dark:text-app-dark-primary">
        <Sparkles size={16} strokeWidth={2.4} aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold text-app-text dark:text-app-dark-text">
          새 콘텐츠가 도착했어요
        </p>
        <p className="mt-1 text-xs leading-5 text-app-text-muted dark:text-app-dark-text-muted">
          새 글과 변경사항을 보려면 페이지를 새로고침하세요.
        </p>
        <button
          type="button"
          className="mt-sm inline-flex h-8 items-center gap-xs rounded-full bg-app-primary px-sm text-xs font-bold text-white transition-colors hover:bg-app-primary-hover dark:bg-app-dark-primary dark:text-app-dark-bg dark:hover:bg-app-dark-primary-hover"
          onClick={refreshContent}
        >
          <RefreshCw size={13} strokeWidth={2.4} aria-hidden="true" />
          새로고침
        </button>
      </div>
      <button
        type="button"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-app-text-subtle transition-colors hover:bg-app-surface-muted hover:text-app-text dark:text-app-dark-text-subtle dark:hover:bg-app-dark-surface-muted dark:hover:text-app-dark-text"
        aria-label="새 콘텐츠 알림 닫기"
        onClick={() => setIsNoticeVisible(false)}
      >
        <X size={16} strokeWidth={2.3} aria-hidden="true" />
      </button>
    </div>
  );

  return (
    <>
      <button
        type="button"
        className="relative flex h-8 w-8 items-center justify-center rounded-full border border-app-primary/30 bg-app-primary-soft/80 text-app-primary transition-colors duration-150 ease-in-out hover:border-app-primary/50 hover:bg-app-primary-soft dark:border-app-dark-primary/40 dark:bg-app-dark-primary-soft/70 dark:text-app-dark-primary dark:hover:border-app-dark-primary/60 dark:hover:bg-app-dark-primary-soft"
        aria-label="새 콘텐츠로 새로고침"
        title="새 콘텐츠로 새로고침"
        onClick={refreshContent}
      >
        <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-app-primary/70 dark:bg-app-dark-primary/70 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-app-primary dark:bg-app-dark-primary" />
        </span>
        <Sparkles size={14} strokeWidth={2.3} aria-hidden="true" />
      </button>
      {isNoticeVisible && typeof document !== 'undefined' && createPortal(notice, document.body)}
    </>
  );
}
