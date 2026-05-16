'use client';

import { RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';

const CONFIRMED_VERSION_STORAGE_KEY = 'bluemiv:confirmed-app-version';

export default function RefreshServiceWorkerCacheButton() {
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [pendingVersion, setPendingVersion] = useState<string | null>(null);

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
      className="relative flex h-8 items-center justify-center gap-1.5 rounded-full border border-app-primary/30 dark:border-app-dark-primary/40 bg-app-primary-soft/80 dark:bg-app-dark-primary-soft/70 px-2.5 text-xs font-semibold text-app-primary dark:text-app-dark-primary transition-colors duration-150 ease-in-out hover:border-app-primary/50 dark:hover:border-app-dark-primary/60 hover:bg-app-primary-soft dark:hover:bg-app-dark-primary-soft"
      aria-label="새 버전으로 새로고침"
      title="새 버전으로 새로고침"
      onClick={() => {
        if (pendingVersion) {
          window.localStorage.setItem(CONFIRMED_VERSION_STORAGE_KEY, pendingVersion);
        }
        window.location.reload();
      }}
    >
      <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-app-primary/70 dark:bg-app-dark-primary/70 opacity-75" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-app-primary dark:bg-app-dark-primary" />
      </span>
      <RefreshCw size={14} strokeWidth={2.3} aria-hidden="true" />
      <span className="hidden sm:inline">업데이트</span>
    </button>
  );
}
