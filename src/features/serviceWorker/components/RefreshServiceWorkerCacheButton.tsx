'use client';

import { RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function RefreshServiceWorkerCacheButton() {
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    const handleMessage = (event: MessageEvent) => {
      if (
        event.data?.type === 'CONTENT_UPDATE_AVAILABLE' ||
        event.data?.type === 'NEW_VERSION_AVAILABLE'
      ) {
        console.log('[APP] 새로운 콘텐츠가 있습니다.');
        setIsUpdateAvailable(true);
      }
    };

    navigator.serviceWorker.addEventListener('message', handleMessage);

    return () => {
      navigator.serviceWorker.removeEventListener('message', handleMessage);
    };
  }, []);

  if (!isUpdateAvailable) return null;

  return (
    <button
      type="button"
      className="motion-chip relative flex h-8 items-center justify-center gap-1.5 rounded-full border border-app-primary/30 dark:border-app-dark-primary/40 bg-app-primary-soft/80 dark:bg-app-dark-primary-soft/70 px-2.5 text-xs font-semibold text-app-primary dark:text-app-dark-primary transition duration-150 ease-in-out hover:-translate-y-0.5"
      aria-label="새 콘텐츠 보기"
      title="새 콘텐츠 보기"
      onClick={() => {
        window.location.reload();
      }}
    >
      <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-app-primary/70 dark:bg-app-dark-primary/70 opacity-75" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-app-primary dark:bg-app-dark-primary" />
      </span>
      <RefreshCw size={14} strokeWidth={2.3} aria-hidden="true" />
      <span className="hidden sm:inline">새 콘텐츠</span>
    </button>
  );
}
