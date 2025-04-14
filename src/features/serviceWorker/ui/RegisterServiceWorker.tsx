'use client';

import useRegisterServiceWorker from '@/features/serviceWorker/hooks/useRegisterServiceWorker';

export default function RegisterServiceWorker() {
  useRegisterServiceWorker();
  return null;
}
