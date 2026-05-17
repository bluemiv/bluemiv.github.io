import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
import RegisterServiceWorker from '@/features/serviceWorker/components/RegisterServiceWorker';
import { SITE_METADATA } from '@/shared/constants/site';
import './globals.css';

dayjs.extend(utc);

const pretendardFont = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
});

export const metadata: Metadata = {
  title: SITE_METADATA.title,
  description: SITE_METADATA.description,
  icons: {
    icon: '/favicon.ico',
  },
  manifest: '/manifest.webmanifest',
  metadataBase: new URL(SITE_METADATA.baseUrl),
  alternates: { canonical: '/' },
  authors: [{ name: SITE_METADATA.author }],
  openGraph: {
    type: 'website',
    siteName: SITE_METADATA.title,
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.GA_ID;
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${pretendardFont.className} antialiased min-h-screen`}>
        {/*Google Analytics*/}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        />
        <Script
          id="ga-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`,
          }}
        />
        {/*Toggle Theme*/}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function() {
  try {
    const theme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = theme === 'dark' || (!theme && prefersDark);
    function setTheme(nextTheme) {
      localStorage.setItem('theme', nextTheme);
      document.documentElement.classList.toggle('dark', nextTheme === 'dark');
      window.dispatchEvent(new CustomEvent('bluemiv-theme-change', { detail: { theme: nextTheme } }));
    }
    window.__setBluemivTheme = setTheme;
    window.__toggleBluemivTheme = function() {
      setTheme(document.documentElement.classList.contains('dark') ? 'light' : 'dark');
    };
    if (isDark) setTheme('dark');
    document.addEventListener('click', function(event) {
      const target = event.target && event.target.closest ? event.target.closest('[data-theme-toggle]') : null;
      if (!target) return;
      event.preventDefault();
      window.__toggleBluemivTheme();
    });
  } catch (e) {
  console.warn('Failed to load theme');
  }
})();`,
          }}
        />
        {children}
        <RegisterServiceWorker />
      </body>
    </html>
  );
}
