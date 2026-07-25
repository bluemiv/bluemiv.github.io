import type { Metadata } from 'next';
import { KpopTubePrivacyPage } from '@/features/apps/kpop-tube';
import { ROUTE_PATH } from '@/shared/constants/route';
import { SITE_METADATA } from '@/shared/constants/site';

const pageUrl = `${SITE_METADATA.baseUrl}${ROUTE_PATH.APPS_KPOP_TUBE_PRIVACY_EN}`;

export const metadata: Metadata = {
  title: 'KPOP Tube Apps Privacy Policy',
  description: 'Privacy Policy for the KPOP Tube family of apps.',
  alternates: {
    canonical: pageUrl,
    languages: { ko: `${SITE_METADATA.baseUrl}${ROUTE_PATH.APPS_KPOP_TUBE_PRIVACY}` },
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <KpopTubePrivacyPage language="en" />;
}
