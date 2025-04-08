'use client';

import { useEffect, useRef } from 'react';

export default function ResponsiveAd() {
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src =
      'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9462926197232794';
    script.crossOrigin = 'anonymous';
    divRef.current?.appendChild(script);

    try {
      ((window as Window & typeof globalThis & { adsbygoogle: unknown[] }).adsbygoogle =
        (
          window as Window &
            typeof globalThis & {
              adsbygoogle: unknown[];
            }
        ).adsbygoogle || []).push({});
    } catch (e) {
      console.error('Adsense error', e);
    }
  }, []);

  return (
    <div ref={divRef}>
      <ins
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
