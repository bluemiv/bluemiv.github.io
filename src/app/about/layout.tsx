import type { Metadata } from 'next';
import dayjs from 'dayjs';

export const metadata: Metadata = {
  title: 'About :: Bluemiv Tech Blog',
  description: `${dayjs().year() - 2018}년차 프론트엔드 개발자 김태홍입니다. 기술과 도전을 통해 지속적인 성장을 추구합니다.`,
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
