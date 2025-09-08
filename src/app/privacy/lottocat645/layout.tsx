import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '로또켓645 개인정보처리 방침',
  description: '"로또켓645" 앱의 개인정보처리 방침을 설명합니다.',
};

export default function PrivacyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="p-md">{children}</div>;
}
