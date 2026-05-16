'use client';

import { RotateCw } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function RefreshServiceWorkerCacheButton() {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const handleMessage = (event: MessageEvent) => {
        if (event.data?.type === 'NEW_VERSION_AVAILABLE') {
          console.log(`[APP] 새로운 컨텐츠가 있습니다.`);
          setShowTooltip(true);
        }
      };
      navigator.serviceWorker.addEventListener('message', handleMessage);
      return () => {
        navigator.serviceWorker.removeEventListener('message', handleMessage);
      };
    }
  }, []);

  return (
    <div className="relative inline-block">
      <button
        className="motion-chip flex items-center justify-center w-8 h-8 rounded-full transition duration-150 ease-in-out cursor-pointer hover:bg-app-surface dark:hover:bg-app-dark-surface hover:text-app-primary dark:hover:text-app-dark-primary"
        aria-label="새로고침"
        onClick={() => {
          window.location.reload();
        }}
      >
        <RotateCw size={16} strokeWidth={2.2} />
      </button>
      {showTooltip && (
        <div className="absolute right-0 w-[150px] mt-sm">
          <div className="animate-bounce flex flex-col items-center justify-center">
            <div className="rotate-45 bg-app-surface-muted dark:bg-app-dark-surface-muted z-10 h-[1rem] w-[1rem] mb-[-0.75rem]" />
            <div className="px-sm py-xs rounded-lg bg-app-surface-muted dark:bg-app-dark-surface-muted text-xs shadow-lg z-10 text-center font-semibold">
              새로운 컨텐츠가 있습니다
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
