import Script from "next/script";

import { ADSENSE_CONFIG } from "./adSenseConfig";

export function AdSenseScript() {
  if (!ADSENSE_CONFIG.enabled) return null;

  return (
    <Script
      id="google-adsense"
      async
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CONFIG.client}`}
      crossOrigin="anonymous"
    />
  );
}
