import type { Metadata } from 'next';
import { LOTTOCAT645_APP } from '@/features/apps/lottocat645';
import { ROUTE_PATH } from '@/shared/constants/route';
import { SITE_METADATA } from '@/shared/constants/site';
import Lottocat645Landing from './Lottocat645Landing';

const title = '로또켓645 - 로또 번호 추천, QR 당첨 확인, 세금 계산 앱';
const description = LOTTOCAT645_APP.description;
const url = `${SITE_METADATA.baseUrl}${ROUTE_PATH.APPS_LOTTOCAT645}`;

export const metadata: Metadata = {
  title,
  description,
  applicationName: LOTTOCAT645_APP.name,
  keywords: [
    '로또켓645',
    '로또 번호 추천',
    '로또 QR 확인',
    '로또 당첨 확인',
    '로또 세금 계산기',
    '로또 6/45',
    '로또 분석',
  ],
  alternates: {
    canonical: url,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url,
    siteName: SITE_METADATA.title,
    title,
    description,
    images: [
      {
        url: LOTTOCAT645_APP.icon,
        width: 512,
        height: 512,
        alt: '로또켓645 앱 아이콘',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title,
    description,
    images: [
      {
        url: LOTTOCAT645_APP.icon,
        alt: '로또켓645 앱 아이콘',
      },
    ],
  },
  other: {
    'google-play-app': 'app-id=com.berryfy.lottocat645',
  },
};

export default function Lottocat645Page() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: LOTTOCAT645_APP.name,
    alternateName: LOTTOCAT645_APP.alternateName,
    description,
    url,
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Android',
    image: `${SITE_METADATA.baseUrl}${LOTTOCAT645_APP.icon}`,
    downloadUrl: LOTTOCAT645_APP.googlePlayUrl,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'KRW',
    },
    author: {
      '@type': 'Person',
      name: SITE_METADATA.author,
    },
    publisher: {
      '@type': 'Person',
      name: SITE_METADATA.author,
    },
    sameAs: [LOTTOCAT645_APP.googlePlayUrl],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Lottocat645Landing />
    </>
  );
}
