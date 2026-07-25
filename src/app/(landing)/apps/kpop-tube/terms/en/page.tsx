import type { Metadata } from 'next';
import { KpopTubeTermsPage } from '@/features/apps/kpop-tube';

export const metadata: Metadata = {
  title: 'KPOP Tube Community Terms',
  description: 'Community terms for the KPOP Tube family of apps.',
};

export default function Page() {
  return <KpopTubeTermsPage language="en" />;
}
