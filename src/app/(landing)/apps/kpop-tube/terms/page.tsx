import type { Metadata } from 'next';
import { KpopTubeTermsPage } from '@/features/apps/kpop-tube';

export const metadata: Metadata = {
  title: 'KPOP Tube 커뮤니티 이용약관',
  description: 'KPOP Tube 앱 커뮤니티 이용약관',
};

export default function Page() {
  return <KpopTubeTermsPage language="ko" />;
}
