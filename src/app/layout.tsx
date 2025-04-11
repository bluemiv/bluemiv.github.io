import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Header } from '@/widgets/Header';
import Head from 'next/head';

dayjs.extend(utc);

const pretendardFont = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
});

export const metadata: Metadata = {
  title: process.env.METADATA_TITLE,
  description: process.env.METADATA_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
      </body>
    </html>
  );
}
