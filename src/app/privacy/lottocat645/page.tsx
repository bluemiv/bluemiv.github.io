import type { ReactNode } from 'react';
import dayjs from 'dayjs';
import Link from 'next/link';
import { LOTTOCAT645_APP, Lottocat645PrivacyContent } from '@/features/apps/lottocat645';
import { DEVELOPER, PrivacySection } from '@/features/privacy';

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <PrivacySection title={title}>{children}</PrivacySection>
);

const Notice = ({ children }: { children: ReactNode }) => (
  <div className="border-l-4 border-app-sub-bg pl-md dark:border-app-sub-bg">{children}</div>
);

const List = ({ children, ordered = false }: { children: ReactNode; ordered?: boolean }) => {
  const Component = ordered ? 'ol' : 'ul';

  return (
    <Component className={ordered ? 'ml-xl list-decimal' : 'ml-xl list-disc'}>{children}</Component>
  );
};

const PolicyLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <Link className="text-app-primary underline dark:text-app-dark-primary" href={href}>
    {children}
  </Link>
);

// TODO: Google Play Console의 개인정보 처리방침 URL을 /apps/lottocat645/privacy로 변경한 뒤 이 레거시 라우트를 제거한다.
export default function Page() {
  const startDate = dayjs(LOTTOCAT645_APP.privacyStartDate);

  return (
    <main>
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-md leading-8">
        <h1 className="mb-md text-2xl font-semibold">개인정보 처리방침</h1>
        <p>시행일자: {startDate.format('YYYY-MM-DD')}</p>

        <Lottocat645PrivacyContent
          components={{ Section, List, Notice, PolicyLink }}
          effectiveDate={startDate.format('YYYY-MM-DD')}
          externalSiteLink={
            <Link
              className="text-app-primary underline dark:text-app-dark-primary"
              href={DEVELOPER.SITE_URL}
            >
              {DEVELOPER.SITE_URL}
            </Link>
          }
        />
      </div>
    </main>
  );
}
