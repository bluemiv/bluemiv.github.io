import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
import RegisterServiceWorker from '@/features/serviceWorker/ui/RegisterServiceWorker';
import { Header } from '@/widgets/Header';
import './globals.css';

dayjs.extend(utc);

const pretendardFont = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
});

export const metadata: Metadata = {
  title: process.env.METADATA_TITLE,
  description: process.env.METADATA_DESCRIPTION,
  icons: {
    icon: '/favicon.ico',
  },
  manifest: '/manifest.webmanifest',
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
        <Script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
        <script
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
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {
  console.warn('Failed to load theme');
  }
})();`,
          }}
        />
        <Header />
        {children}
        <RegisterServiceWorker />
      </body>
    </html>
  );
}
