import type { ReactNode } from 'react';
import dayjs from 'dayjs';
import { ChevronLeft, ExternalLink, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  POTION_SORT_QUEST_APP,
  PotionSortQuestPrivacyContentEn,
} from '@/features/apps/potion-sort-quest';
import { DEVELOPER } from '@/features/privacy';
import { ROUTE_PATH } from '@/shared/constants/route';
import { SITE_METADATA } from '@/shared/constants/site';

const appName = POTION_SORT_QUEST_APP.name;
const startDate = dayjs(POTION_SORT_QUEST_APP.privacyStartDate);
const pageTitle = `${appName} Privacy Policy`;
const pageDescription = `Privacy Policy for the ${appName} app.`;
const pageUrl = `${SITE_METADATA.baseUrl}${ROUTE_PATH.APPS_POTION_SORT_QUEST_PRIVACY_EN}`;
const appIcon = POTION_SORT_QUEST_APP.icon;

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
    locale: 'en_US',
    siteName: SITE_METADATA.title,
    url: pageUrl,
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: appIcon,
        width: 512,
        height: 512,
        alt: `${appName} app icon`,
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: appIcon,
        alt: `${appName} app icon`,
      },
    ],
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
  <div className="rounded-lg border border-blue-200 bg-blue-50 p-md text-sm leading-7 text-blue-950 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-100">
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

export default function PotionSortQuestPrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/85">
        <nav className="mx-auto flex h-16 w-full max-w-[960px] items-center justify-between px-md">
          <Link
            href={ROUTE_PATH.APPS}
            className="flex items-center gap-sm font-bold text-slate-950 dark:text-white"
          >
            <Image
              src={appIcon}
              alt={`${appName} app icon`}
              width={36}
              height={36}
              className="h-9 w-9 rounded-xl"
              priority
            />
            <span>{appName}</span>
          </Link>
          <Link
            href={ROUTE_PATH.APPS}
            className="inline-flex h-9 items-center gap-xs rounded-lg px-sm text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <ChevronLeft size={16} strokeWidth={2.3} />
            Back to apps
          </Link>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-[960px] px-md py-xl md:py-2xl">
        <section className="flex flex-col gap-lg border-b border-slate-200 pb-xl dark:border-slate-800 md:flex-row md:items-start md:justify-between">
          <div className="flex max-w-[720px] flex-col gap-md">
            <div className="flex items-center gap-sm text-blue-700 dark:text-blue-300">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950">
                <ShieldCheck size={20} strokeWidth={2.3} />
              </span>
              <span className="text-sm font-semibold">Privacy Policy</span>
            </div>
            <div className="flex flex-col gap-sm">
              <h1 className="text-4xl font-bold leading-tight text-slate-950 dark:text-white md:text-5xl">
                Privacy Policy
              </h1>
              <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
                This page explains what data {appName} handles, how the advertising SDK is used,
                what is stored on your device, and how you can contact us.
              </p>
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-md text-sm text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
            Effective date
            <div className="mt-xs text-lg font-bold text-slate-950 dark:text-white">
              {startDate.format('YYYY-MM-DD')}
            </div>
          </div>
        </section>

        <div className="flex justify-end pt-md">
          <Link
            href={ROUTE_PATH.APPS_POTION_SORT_QUEST_PRIVACY}
            className="inline-flex rounded-lg bg-slate-100 px-sm py-xs text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            한국어
          </Link>
        </div>

        <PotionSortQuestPrivacyContentEn
          components={{ Section, List, Notice, PolicyLink }}
          effectiveDate={startDate.format('YYYY-MM-DD')}
          externalSiteLink={
            <Link
              className="font-semibold underline underline-offset-4"
              href={DEVELOPER.SITE_URL}
              target="_blank"
              rel="noreferrer"
            >
              {DEVELOPER.SITE_URL}
            </Link>
          }
        />
      </main>
    </div>
  );
}

const PolicyLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <Link
    className="inline-flex items-center gap-[3px] font-semibold text-blue-700 underline underline-offset-4 dark:text-blue-300"
    href={href}
    {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
  >
    {children}
    {href.startsWith('http') && <ExternalLink size={12} strokeWidth={2.3} />}
  </Link>
);
