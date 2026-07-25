import type { Metadata } from 'next';
import { KpopTubeAccountDeletionPage } from '@/features/apps/kpop-tube';
import { ROUTE_PATH } from '@/shared/constants/route';
import { SITE_METADATA } from '@/shared/constants/site';

const pageUrl = `${SITE_METADATA.baseUrl}${ROUTE_PATH.APPS_KPOP_TUBE_ACCOUNT_DELETION}`;

export const metadata: Metadata = {
  title: 'KPOP Tube Apps Account and Data Deletion',
  description: 'How to delete a KPOP Tube app account and associated data.',
  alternates: { canonical: pageUrl },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <KpopTubeAccountDeletionPage />;
}
