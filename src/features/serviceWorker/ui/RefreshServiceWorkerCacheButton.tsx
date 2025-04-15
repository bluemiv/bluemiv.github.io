'use client';

import { useEffect, useState } from 'react';

export default function RefreshServiceWorkerCacheButton() {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'NEW_VERSION_AVAILABLE') {
          setShowTooltip(true);
        }
      });
    }
  }, []);

  return (
    <div className="relative inline-block">
      <button
        className="flex items-center justify-center w-[34px] h-[34px] rounded transition duration-150 ease-in-out cursor-pointer hover:bg-app-sub-bg dark:hover:bg-app-dark-sub-bg"
        onClick={() => {
          window.location.reload();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
          />
          <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
        </svg>
      </button>
      {showTooltip && (
        <div className="absolute left-1/2 -translate-x-1/2 w-[140px] mt-sm">
          <div className="animate-bounce flex flex-col items-center justify-center">
            <div className="rotate-45 bg-slate-200 dark:bg-slate-700 z-10 h-[1rem] w-[1rem] mb-[-0.75rem]" />
            <div className="px-sm py-xs rounded bg-slate-200 dark:bg-slate-700 text-xs shadow-lg z-10 text-center font-semibold">
              새로운 컨텐츠가 있습니다
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
