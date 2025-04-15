import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Header } from '@/widgets/Header';
import RegisterServiceWorker from '@/features/serviceWorker/ui/RegisterServiceWorker';

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
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${pretendardFont.className} antialiased min-h-screen`}>
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
