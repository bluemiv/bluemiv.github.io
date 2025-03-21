import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Header } from '@/widgets/Header';

dayjs.extend(utc);

const pretendardFont = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
});

export const metadata: Metadata = {
  title: 'Bluemiv Tech Blog',
  description: '프론트엔드 개발자로서 배운 기술과 문제 해결 경험을 기록하는 블로그입니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendardFont.className} antialiased min-h-screen`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
