import { useEffect } from 'react';

export default function useRegisterServiceWorker() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('서비스 워커 등록 성공:', registration);
          })
          .catch((error) => {
            console.error('서비스 워커 등록 실패:', error);
          });
      });
    }
  }, []);
}
