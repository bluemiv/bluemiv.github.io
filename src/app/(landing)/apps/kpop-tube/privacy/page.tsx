import type { Metadata } from 'next';
import { KpopTubePrivacyPage } from '@/features/apps/kpop-tube';
import { ROUTE_PATH } from '@/shared/constants/route';
import { SITE_METADATA } from '@/shared/constants/site';

const pageUrl = `${SITE_METADATA.baseUrl}${ROUTE_PATH.APPS_KPOP_TUBE_PRIVACY}`;

export const metadata: Metadata = {
  title: 'KPOP Tube Apps 개인정보 처리방침',
  description: 'KPOP Tube 앱 제품군의 개인정보 처리방침입니다.',
  alternates: { canonical: pageUrl, languages: { en: `${pageUrl}/en` } },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <KpopTubePrivacyPage language="ko" />;
}
