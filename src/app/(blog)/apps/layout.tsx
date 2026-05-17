import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apps :: Bluemiv Tech Blog',
  description: 'Bluemiv가 만들고 운영하는 앱을 소개합니다.',
};

export default function AppsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
