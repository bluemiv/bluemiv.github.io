import type { ReactNode } from 'react';
import dayjs from 'dayjs';
import { ExternalLink, Home, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  BERRY_VOCA_STARTER_APP,
  BerryVocaStarterPrivacyContent,
} from '@/features/apps/berry-voca-starter';
import { ROUTE_PATH } from '@/shared/constants/route';
import { SITE_METADATA } from '@/shared/constants/site';

const appName = BERRY_VOCA_STARTER_APP.name;
const startDate = dayjs(BERRY_VOCA_STARTER_APP.privacyStartDate);
const pageTitle = `${appName} 개인정보 처리방침`;
const pageDescription = `${appName} 앱의 로컬 학습 데이터, AdMob 광고와 Android TTS 처리 방침입니다.`;
const pageUrl = `${SITE_METADATA.baseUrl}${ROUTE_PATH.APPS_BERRY_VOCA_STARTER_PRIVACY}`;
const appIcon = BERRY_VOCA_STARTER_APP.icon;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: pageUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'article',
    locale: 'ko_KR',
    siteName: SITE_METADATA.title,
    url: pageUrl,
    title: pageTitle,
    description: pageDescription,
    images: [{ url: appIcon, width: 192, height: 192, alt: `${appName} 앱 아이콘` }],
  },
  twitter: {
    card: 'summary',
    title: pageTitle,
    description: pageDescription,
    images: [{ url: appIcon, alt: `${appName} 앱 아이콘` }],
  },
};

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="scroll-mt-24 border-t border-slate-200 py-lg dark:border-slate-800">
    <h2 className="text-xl font-bold tracking-normal text-slate-950 dark:text-white">{title}</h2>
    <div className="mt-md space-y-md text-sm leading-7 text-slate-600 dark:text-slate-300">
      {children}
    </div>
  </section>
);

const Notice = ({ children }: { children: ReactNode }) => (
  <div className="rounded-lg border border-rose-200 bg-rose-50 p-md text-sm leading-7 text-rose-950 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-100">
    {children}
  </div>
);

const List = ({ children, ordered = false }: { children: ReactNode; ordered?: boolean }) => {
  const Component = ordered ? 'ol' : 'ul';
  return (
    <Component
      className={[
        'ml-md list-outside space-y-sm pl-md',
        ordered ? 'list-decimal' : 'list-disc',
      ].join(' ')}
    >
      {children}
    </Component>
  );
};

const PolicyLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <Link
    className="inline-flex items-center gap-[3px] font-semibold text-rose-700 underline underline-offset-4 dark:text-rose-300"
    href={href}
    {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
  >
    {children}
    {href.startsWith('http') && <ExternalLink size={12} strokeWidth={2.3} />}
  </Link>
);

export default function BerryVocaStarterPrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/85">
        <nav className="mx-auto flex h-16 w-full max-w-[960px] items-center justify-between px-md">
          <div className="flex items-center gap-sm font-bold">
            <Image
              src={appIcon}
              alt={`${appName} 앱 아이콘`}
              width={36}
              height={36}
              className="h-9 w-9 rounded-xl"
              priority
            />
            <span>{appName}</span>
          </div>
          <Link
            href={ROUTE_PATH.ROOT}
            className="inline-flex h-9 items-center gap-xs rounded-lg px-sm text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <Home size={16} strokeWidth={2.3} />
            개발자 사이트
          </Link>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-[960px] px-md py-xl md:py-2xl">
        <section className="flex flex-col gap-lg border-b border-slate-200 pb-xl dark:border-slate-800 md:flex-row md:items-start md:justify-between">
          <div className="flex max-w-[720px] flex-col gap-md">
            <div className="flex items-center gap-sm text-rose-700 dark:text-rose-300">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-100 dark:bg-rose-950">
                <ShieldCheck size={20} strokeWidth={2.3} />
              </span>
              <span className="text-sm font-semibold">Privacy Policy</span>
            </div>
            <div className="flex flex-col gap-sm">
              <h1 className="text-4xl font-bold leading-tight md:text-5xl">개인정보 처리방침</h1>
              <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
                기기에 저장되는 학습 정보, 광고와 음성 합성 기능에서 처리될 수 있는 정보를
                안내합니다.
              </p>
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-md text-sm text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
            시행일자
            <div className="mt-xs text-lg font-bold text-slate-950 dark:text-white">
              {startDate.format('YYYY-MM-DD')}
            </div>
          </div>
        </section>

        <BerryVocaStarterPrivacyContent
          components={{ Section, List, Notice, PolicyLink }}
          effectiveDate={startDate.format('YYYY-MM-DD')}
        />
      </main>
    </div>
  );
}
