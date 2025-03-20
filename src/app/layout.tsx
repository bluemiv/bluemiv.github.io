import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Header from '@/widgets/Header';

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
      <body className={`${pretendardFont.className} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
