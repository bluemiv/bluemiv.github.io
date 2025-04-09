'use client';

import { useEffect, useRef } from 'react';

type AdsWindow = Window &
  typeof globalThis & {
    adsbygoogle: unknown[];
  };

export default function ResponsiveAd() {
  const adRef = useRef<HTMLDivElement>(null);
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (!adRef.current || !insRef.current) return;

    // 이미 스크립트가 추가된 경우에는 다시 추가하지 않음
    if (!adRef.current.dataset.appended) {
      const script = document.createElement('script');
      script.async = true;
      script.src =
        'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9462926197232794';
      script.crossOrigin = 'anonymous';
      adRef.current?.insertBefore(script, adRef.current.firstChild);
      adRef.current.dataset.appended = 'true';
    }

    // 이미 load 된 경우에는 다시 로드하지 않음
    if (!insRef.current?.dataset.loaded) {
      try {
        ((window as AdsWindow).adsbygoogle = (window as AdsWindow).adsbygoogle || []).push({});
        insRef.current.dataset.loaded = 'true';
      } catch (e) {
        console.error('Adsense error', e);
      }
    }
  }, []);

  return (
    <div ref={adRef} className="w-full overflow-hidden">
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-9462926197232794"
        data-ad-slot="9216376708"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
