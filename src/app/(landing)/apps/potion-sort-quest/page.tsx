import {
  ArrowRight,
  Coins,
  Languages,
  Music,
  RotateCcw,
  Sparkles,
  WifiOff,
} from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { POTION_SORT_QUEST_APP } from '@/features/apps/potion-sort-quest';
import { ThemeToggleButton } from '@/features/theme/components';
import { ROUTE_PATH } from '@/shared/constants/route';
import { SITE_METADATA } from '@/shared/constants/site';

const title = 'Potion Sort Quest - Offline Water Sort Puzzle';
const description =
  'Sort colorful potion layers into matching bottles in a relaxing offline water sort puzzle game for Android.';
const url = `${SITE_METADATA.baseUrl}${ROUTE_PATH.APPS_POTION_SORT_QUEST}`;

const features = [
  {
    title: 'Offline puzzle play',
    description: 'Play short color sorting levels without an account or server connection.',
    Icon: WifiOff,
  },
  {
    title: 'Undo and hints',
    description: 'Try different pour orders, undo mistakes, and use hints when a level gets tricky.',
    Icon: RotateCcw,
  },
  {
    title: 'Level progress',
    description: 'Clear bottle puzzles, earn coins, and continue through calm logic challenges.',
    Icon: Coins,
  },
  {
    title: '18 languages',
    description: 'Choose a supported language from settings and play with optional background music.',
    Icon: Languages,
  },
];

const screenshots = [
  {
    src: POTION_SORT_QUEST_APP.screenshots[0],
    alt: 'Potion Sort Quest gameplay screen with colorful bottles',
  },
  {
    src: POTION_SORT_QUEST_APP.screenshots[1],
    alt: 'Potion Sort Quest hint screen',
  },
  {
    src: POTION_SORT_QUEST_APP.screenshots[2],
    alt: 'Potion Sort Quest level clear reward screen',
  },
  {
    src: POTION_SORT_QUEST_APP.screenshots[3],
    alt: 'Potion Sort Quest undo gameplay screen',
  },
  {
    src: POTION_SORT_QUEST_APP.screenshots[4],
    alt: 'Potion Sort Quest language settings screen',
  },
];

export const metadata: Metadata = {
  title,
  description,
  applicationName: POTION_SORT_QUEST_APP.name,
  keywords: [
    'Potion Sort Quest',
    'water sort puzzle',
    'offline water sort puzzle',
    'color sorting game',
    'bottle puzzle game',
    'potion puzzle',
    'logic puzzle Android',
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
    locale: 'en_US',
    url,
    siteName: SITE_METADATA.title,
    title,
    description,
    images: [
      {
        url: POTION_SORT_QUEST_APP.featureGraphic,
        width: 1024,
        height: 500,
        alt: 'Potion Sort Quest feature graphic',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [
      {
        url: POTION_SORT_QUEST_APP.featureGraphic,
        alt: 'Potion Sort Quest feature graphic',
      },
    ],
  },
  other: {
    'google-play-app': `app-id=${POTION_SORT_QUEST_APP.packageName}`,
  },
};

export default function PotionSortQuestPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: POTION_SORT_QUEST_APP.name,
    alternateName: POTION_SORT_QUEST_APP.alternateName,
    description,
    url,
    applicationCategory: 'GameApplication',
    gameApplicationCategory: 'PuzzleGame',
    operatingSystem: 'Android',
    image: `${SITE_METADATA.baseUrl}${POTION_SORT_QUEST_APP.icon}`,
    screenshot: POTION_SORT_QUEST_APP.screenshots.map((src) => `${SITE_METADATA.baseUrl}${src}`),
    downloadUrl: POTION_SORT_QUEST_APP.googlePlayUrl,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Person',
      name: SITE_METADATA.author,
    },
    publisher: {
      '@type': 'Person',
      name: SITE_METADATA.author,
    },
    sameAs: [POTION_SORT_QUEST_APP.googlePlayUrl],
  };

  return (
    <main className="min-h-screen bg-[#fff8ed] text-slate-950 dark:bg-[#15091f] dark:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <header className="sticky top-0 z-50 border-b border-amber-950/10 bg-[#fff8ed]/88 backdrop-blur-xl dark:border-white/10 dark:bg-[#15091f]/88">
        <nav className="mx-auto flex h-16 w-full max-w-[1120px] items-center justify-between px-md">
          <Link href={ROUTE_PATH.APPS_POTION_SORT_QUEST} className="flex items-center gap-sm">
            <Image
              src={POTION_SORT_QUEST_APP.icon}
              alt="Potion Sort Quest app icon"
              width={36}
              height={36}
              className="h-9 w-9 rounded-xl"
              priority
            />
            <span className="text-sm font-bold tracking-normal sm:text-base">
              Potion Sort Quest
            </span>
          </Link>

          <div className="flex items-center gap-xs text-sm font-semibold">
            <Link
              href={ROUTE_PATH.APPS}
              className="hidden rounded-lg px-sm py-xs text-slate-700 transition-colors hover:bg-amber-950/10 hover:text-slate-950 dark:text-white/72 dark:hover:bg-white/10 dark:hover:text-white sm:inline-flex"
            >
              Apps
            </Link>
            <Link
              href={ROUTE_PATH.APPS_POTION_SORT_QUEST_PRIVACY_EN}
              className="rounded-lg px-sm py-xs text-slate-700 transition-colors hover:bg-amber-950/10 hover:text-slate-950 dark:text-white/72 dark:hover:bg-white/10 dark:hover:text-white"
            >
              Privacy
            </Link>
            <ThemeToggleButton
              className="relative inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-slate-700 transition-colors hover:bg-amber-950/10 hover:text-slate-950 dark:text-white/72 dark:hover:bg-white/10 dark:hover:text-white"
              fallbackBackgroundColor={{ light: '#FFF8ED', dark: '#15091F' }}
              iconClassName="h-[17px] w-[17px]"
              placeholderClassName="h-9 w-9"
            />
          </div>
        </nav>
      </header>

      <section className="relative overflow-hidden border-b border-amber-950/10 dark:border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_30%,rgba(20,184,166,0.18),transparent_36%),radial-gradient(circle_at_78%_16%,rgba(251,191,36,0.2),transparent_28%),linear-gradient(135deg,#fff8ed_0%,#eefbf7_55%,#fdf2f8_100%)] dark:bg-[radial-gradient(circle_at_24%_30%,rgba(20,184,166,0.34),transparent_36%),radial-gradient(circle_at_78%_16%,rgba(250,204,21,0.13),transparent_28%),linear-gradient(135deg,#15091f_0%,#10243a_55%,#12091c_100%)]" />
        <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(15,23,42,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.08)_1px,transparent_1px)] [background-size:72px_72px] dark:opacity-20 dark:[background-image:linear-gradient(rgba(255,255,255,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.09)_1px,transparent_1px)]" />

        <div className="relative mx-auto grid w-full max-w-[1120px] gap-xl px-md py-2xl lg:grid-cols-[minmax(0,0.95fr)_minmax(340px,0.72fr)] lg:items-center">
          <div className="flex flex-col gap-lg">
            <div className="flex w-fit items-center gap-xs rounded-full border border-emerald-700/20 bg-emerald-100/80 px-sm py-xs text-sm font-semibold text-emerald-800 dark:border-emerald-300/30 dark:bg-emerald-300/10 dark:text-emerald-100">
              <Sparkles size={16} strokeWidth={2.3} />
              Offline water sort puzzle
            </div>

            <div className="flex flex-col gap-md">
              <h1 className="max-w-[760px] text-5xl font-black leading-[1.02] tracking-normal text-slate-950 dark:text-white md:text-7xl">
                Sort magical potions into matching bottles.
              </h1>
              <p className="max-w-[640px] text-lg leading-8 text-slate-700 dark:text-white/72 md:text-xl md:leading-9">
                Potion Sort Quest is a relaxing Android puzzle game where every move is about
                planning, pouring, and finishing each bottle cleanly by color.
              </p>
            </div>

            <div className="flex flex-col gap-sm sm:flex-row">
              <Link
                href={POTION_SORT_QUEST_APP.googlePlayUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center gap-sm rounded-lg bg-amber-400 px-lg text-sm font-black text-slate-950 shadow-2xl shadow-amber-950/25 transition-colors hover:bg-amber-300"
              >
                Get it on Google Play
                <ArrowRight size={17} strokeWidth={2.4} />
              </Link>
              <Link
                href="#screenshots"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-slate-950/15 px-lg text-sm font-bold text-slate-950 transition-colors hover:bg-slate-950/10 dark:border-white/16 dark:text-white dark:hover:bg-white/10"
              >
                View screenshots
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 rounded-[2rem] bg-cyan-300/30 blur-3xl dark:bg-cyan-400/20" />
            <Image
              src={POTION_SORT_QUEST_APP.featureGraphic}
              alt="Potion Sort Quest potion sorting gameplay artwork"
              width={1024}
              height={500}
              priority
              className="relative w-full rounded-2xl border border-slate-950/10 shadow-2xl shadow-amber-950/15 dark:border-white/16 dark:shadow-black/30"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1120px] gap-md px-md py-xl sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ title: featureTitle, description: featureDescription, Icon }) => (
          <article
            key={featureTitle}
            className="rounded-lg border border-amber-950/10 bg-white/70 p-md shadow-sm shadow-amber-950/5 dark:border-white/10 dark:bg-white/[0.045] dark:shadow-none"
          >
            <Icon className="mb-md text-emerald-700 dark:text-emerald-300" size={24} strokeWidth={2.2} />
            <h2 className="text-lg font-bold">{featureTitle}</h2>
            <p className="mt-xs text-sm leading-7 text-slate-600 dark:text-white/64">
              {featureDescription}
            </p>
          </article>
        ))}
      </section>

      <section
        id="screenshots"
        className="border-y border-amber-950/10 bg-white/55 py-2xl dark:border-white/10 dark:bg-white/[0.035]"
      >
        <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-xl px-md">
          <div className="flex max-w-[700px] flex-col gap-sm">
            <div className="flex items-center gap-xs text-sm font-semibold text-emerald-800 dark:text-emerald-200">
              <Music size={16} strokeWidth={2.4} />
              Calm puzzle sessions
            </div>
            <h2 className="text-3xl font-black leading-tight md:text-5xl">
              Simple rules, clean decisions, colorful progress.
            </h2>
            <p className="text-base leading-8 text-slate-600 dark:text-white/64">
              Start a level, choose a bottle, pour matching colors, and use empty bottles wisely.
              There are no timers or account requirements for normal gameplay.
            </p>
          </div>

          <div className="grid gap-md sm:grid-cols-2 lg:grid-cols-5">
            {screenshots.map((screenshot, index) => (
              <div
                key={screenshot.src}
                className="overflow-hidden rounded-[1.5rem] border border-slate-950/10 bg-slate-950 p-1.5 shadow-2xl shadow-amber-950/10 dark:border-white/12 dark:bg-black dark:shadow-black/25"
              >
                <Image
                  src={screenshot.src}
                  alt={screenshot.alt}
                  width={1080}
                  height={1920}
                  className="h-auto w-full rounded-[1.1rem]"
                  priority={index < 2}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-[1120px] flex-col gap-lg px-md py-2xl md:flex-row md:items-center md:justify-between">
        <div className="max-w-[680px]">
          <h2 className="text-3xl font-black leading-tight md:text-5xl">
            Ready for a quiet bottle puzzle?
          </h2>
          <p className="mt-sm text-base leading-8 text-slate-600 dark:text-white/64">
            Download Potion Sort Quest for Android and enjoy offline potion sorting with undo,
            hints, coins, language settings, and optional music.
          </p>
        </div>
        <div className="flex flex-col gap-sm sm:flex-row md:flex-col">
          <Link
            href={POTION_SORT_QUEST_APP.googlePlayUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center justify-center gap-sm rounded-lg bg-amber-400 px-lg text-sm font-black text-slate-950 transition-colors hover:bg-amber-300"
          >
            Google Play
            <ArrowRight size={17} strokeWidth={2.4} />
          </Link>
          <Link
            href={ROUTE_PATH.APPS_POTION_SORT_QUEST_PRIVACY_EN}
            className="inline-flex h-12 items-center justify-center rounded-lg border border-slate-950/15 px-lg text-sm font-bold text-slate-950 transition-colors hover:bg-slate-950/10 dark:border-white/16 dark:text-white dark:hover:bg-white/10"
          >
            Privacy Policy
          </Link>
        </div>
      </section>
    </main>
  );
}
