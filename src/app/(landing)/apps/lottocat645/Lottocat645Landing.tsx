'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Calculator,
  Camera,
  ChartNoAxesColumnIncreasing,
  Heart,
  ShieldCheck,
  Sparkles,
  Store,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { LOTTOCAT645_APP } from '@/features/apps/lottocat645';
import { ThemeToggleButton } from '@/features/theme/components';
import { ROUTE_PATH } from '@/shared/constants/route';

const GOOGLE_PLAY_URL = LOTTOCAT645_APP.googlePlayUrl;
const GOOGLE_PLAY_QR_IMAGE = LOTTOCAT645_APP.googlePlayQr;
const APP_ICON_IMAGE = LOTTOCAT645_APP.icon;

const HERO_SCREENSHOTS = [
  {
    src: '/r/apps/lottocat645/screenshots/home-light.webp',
    alt: '로또켓645 홈 화면',
  },
  {
    src: '/r/apps/lottocat645/screenshots/result.webp',
    alt: '로또켓645 번호 생성 결과 화면',
  },
];

const STORY = [
  {
    id: 'generate',
    Icon: Sparkles,
    eyebrow: 'Number recommendation',
    title: '오늘 번호를 간편하게 추천받으세요.',
    description:
      '스마트, 빈출, 희소 방식으로 1게임부터 5게임까지 생성하고 원하는 번호는 고정수로 포함할 수 있습니다.',
    src: '/r/apps/lottocat645/screenshots/generate.webp',
    alt: '로또켓645 번호 추천 화면',
  },
  {
    id: 'result',
    Icon: Heart,
    eyebrow: 'Save numbers',
    title: '마음에 드는 조합만 저장하세요.',
    description:
      '추천받은 번호는 전체 저장하거나 하나씩 저장할 수 있고, 즐겨찾기에서 다시 확인할 수 있습니다.',
    src: '/r/apps/lottocat645/screenshots/result.webp',
    alt: '로또켓645 생성 결과 저장 화면',
  },
  {
    id: 'qr',
    Icon: Camera,
    eyebrow: 'QR check',
    title: 'QR로 당첨 결과까지 빠르게 확인하세요.',
    description:
      '복권 QR을 스캔해 당첨 결과 페이지로 이동합니다. 직접 번호를 입력하는 번거로움을 줄입니다.',
    src: '/r/apps/lottocat645/screenshots/qr-check.webp',
    alt: '로또켓645 QR 당첨 확인 화면',
  },
  {
    id: 'analysis',
    Icon: ChartNoAxesColumnIncreasing,
    eyebrow: 'Data analysis',
    title: '복잡한 통계는 쉽게 읽히게 정리했습니다.',
    description:
      '최근 흐름, 자주 보인 번호, 뜸했던 번호, 번호대별 분포를 최근 10회부터 전체 기준까지 살펴볼 수 있습니다.',
    src: '/r/apps/lottocat645/screenshots/analysis.webp',
    alt: '로또켓645 번호 분석 화면',
  },
  {
    id: 'frequency',
    Icon: ChartNoAxesColumnIncreasing,
    eyebrow: 'Frequency chart',
    title: '번호별 빈도도 한눈에 비교하세요.',
    description:
      '번호별 출현 횟수를 막대 그래프로 보여줘 최근 번호 흐름을 빠르게 파악할 수 있습니다.',
    src: '/r/apps/lottocat645/screenshots/frequency.webp',
    alt: '로또켓645 빈도 차트 화면',
  },
  {
    id: 'tax',
    Icon: Calculator,
    eyebrow: 'Tax calculator',
    title: '당첨금 실수령액도 바로 계산합니다.',
    description:
      '당첨금 입력만으로 예상 세금, 세율, 세후 수령액을 카드 형태로 보기 쉽게 계산합니다.',
    src: '/r/apps/lottocat645/screenshots/tax.webp',
    alt: '로또켓645 세금 계산기 화면',
  },
];

const SUMMARY = [
  ['추천 방식', '스마트 · 빈출 · 희소'],
  ['분석 기준', '최근 10회부터 전체까지'],
  ['알림', '구매 전 · 결과 확인'],
];

const FloatingGooglePlayButton = () => (
  <Link
    href={GOOGLE_PLAY_URL}
    target="_blank"
    rel="noreferrer"
    className="fixed bottom-4 left-4 right-4 z-40 inline-flex h-12 items-center justify-center gap-sm rounded-xl bg-blue-600 px-md text-sm font-bold text-white shadow-2xl shadow-blue-950/25 transition-colors hover:bg-blue-700 sm:left-auto sm:right-6 sm:w-auto"
  >
    <Store size={17} strokeWidth={2.2} />
    <span>Google Play에서 받기</span>
    <span className="rounded-full bg-white/15 px-xs py-[2px] text-[11px] font-semibold">
      Android
    </span>
  </Link>
);

const LandingHeader = () => (
  <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/85">
    <nav className="mx-auto flex h-16 w-full max-w-[1120px] items-center justify-between px-md">
      <Link
        href={ROUTE_PATH.APPS_LOTTOCAT645}
        className="flex items-center gap-sm font-bold text-slate-950 dark:text-white"
      >
        <Image
          src={APP_ICON_IMAGE}
          alt="로또켓645 앱 아이콘"
          width={36}
          height={36}
          className="h-9 w-9 rounded-xl"
          priority
        />
        <span>로또켓645</span>
      </Link>
      <div className="flex items-center gap-xs text-sm font-semibold">
        <Link
          href={ROUTE_PATH.APPS}
          className="hidden h-9 items-center rounded-lg px-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white sm:inline-flex"
        >
          앱 목록
        </Link>
        <Link
          href="#features"
          className="inline-flex h-9 items-center rounded-lg px-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
        >
          기능
        </Link>
        <ThemeToggleButton
          className="relative inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          fallbackBackgroundColor={{ dark: '#020617', light: '#F8FAFC' }}
          iconClassName="h-[17px] w-[17px]"
          placeholderClassName="h-9 w-9"
        />
      </div>
    </nav>
  </header>
);

const LandingFooter = () => (
  <footer className="border-t border-slate-200 bg-white pb-20 dark:border-slate-800 dark:bg-slate-950">
    <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-lg px-md py-xl md:flex-row md:items-start md:justify-between">
      <div className="flex max-w-[520px] flex-col gap-sm">
        <Link
          href={ROUTE_PATH.APPS_LOTTOCAT645}
          className="flex w-fit items-center gap-sm font-bold text-slate-950 dark:text-white"
        >
          <Image
            src={APP_ICON_IMAGE}
            alt="로또켓645 앱 아이콘"
            width={36}
            height={36}
            className="h-9 w-9 rounded-xl"
          />
          <span>로또켓645</span>
        </Link>
        <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
          로또 6/45 번호 추천, QR 당첨 확인, 번호 분석, 세금 계산을 한 번에 관리하는 Android 편의
          앱입니다.
        </p>
        <p className="text-xs leading-6 text-slate-500 dark:text-slate-400">
          로또켓645는 동행복권 공식 앱이 아니며, 번호 추천과 분석은 참고용입니다.
        </p>
      </div>

      <nav className="flex flex-wrap gap-md text-sm font-semibold text-slate-600 dark:text-slate-300 md:justify-end">
        <Link
          href={ROUTE_PATH.APPS}
          className="transition-colors hover:text-slate-950 dark:hover:text-white"
        >
          앱 목록
        </Link>
        <Link
          href={ROUTE_PATH.APPS_LOTTOCAT645_PRIVACY}
          className="transition-colors hover:text-slate-950 dark:hover:text-white"
        >
          개인정보 처리방침
        </Link>
        <Link
          href={GOOGLE_PLAY_URL}
          target="_blank"
          rel="noreferrer"
          className="text-blue-700 transition-colors hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200"
        >
          Google Play
        </Link>
        <Link
          href={ROUTE_PATH.ROOT}
          className="transition-colors hover:text-slate-950 dark:hover:text-white"
        >
          Bluemiv
        </Link>
      </nav>
    </div>
  </footer>
);

const ScreenshotFrame = ({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) => (
  <div className="overflow-hidden rounded-[1.75rem] border border-slate-300 bg-slate-950 p-2 shadow-2xl shadow-slate-950/20 dark:border-slate-700">
    <div className="overflow-hidden rounded-[1.25rem] bg-slate-100">
      <Image
        src={src}
        alt={alt}
        width={720}
        height={1520}
        priority={priority}
        className="h-auto w-full"
      />
    </div>
  </div>
);

const HeroScreenshots = () => (
  <div className="relative mx-auto flex w-full max-w-[410px] items-center justify-center pt-lg lg:pt-0">
    <div className="w-[58%] translate-x-6 rotate-3 transition duration-700 ease-out hover:rotate-1">
      <ScreenshotFrame alt={HERO_SCREENSHOTS[1].alt} src={HERO_SCREENSHOTS[1].src} priority />
    </div>
    <div className="absolute left-0 top-0 hidden w-[50%] -rotate-6 opacity-95 transition duration-700 ease-out hover:-rotate-3 sm:block">
      <ScreenshotFrame alt={HERO_SCREENSHOTS[0].alt} src={HERO_SCREENSHOTS[0].src} priority />
    </div>
  </div>
);

const ScrollStory = () => {
  const [activeId, setActiveId] = useState(STORY[0].id);
  const activeIdRef = useRef(STORY[0].id);
  const activeIndex = useMemo(
    () =>
      Math.max(
        0,
        STORY.findIndex((item) => item.id === activeId),
      ),
    [activeId],
  );
  const active = STORY[activeIndex] ?? STORY[0];

  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  useEffect(() => {
    let animationFrame = 0;
    const updateActiveItem = () => {
      const viewportTarget = window.innerHeight * 0.52;
      const closest = STORY.map((item) => {
        const node = document.getElementById(`story-${item.id}`);
        if (!node) return null;

        const rect = node.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height * 0.42 - viewportTarget);
        return { id: item.id, distance };
      })
        .filter((item): item is { id: string; distance: number } => Boolean(item))
        .sort((a, b) => a.distance - b.distance)[0];

      if (closest?.id && closest.id !== activeIdRef.current) {
        activeIdRef.current = closest.id;
        setActiveId(closest.id);
      }
    };

    const requestUpdate = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateActiveItem);
    };

    updateActiveItem();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  return (
    <section
      id="features"
      className="border-y border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/50"
    >
      <div className="mx-auto grid w-full max-w-[1120px] gap-xl px-md py-2xl lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
        <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)]">
          <div className="flex h-full flex-col justify-center gap-lg">
            <header className="flex flex-col gap-xs">
              <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                Weekly routine
              </p>
              <h2 className="text-3xl font-bold leading-tight text-slate-950 dark:text-white md:text-5xl">
                로또를 사는 날부터 확인하는 날까지.
              </h2>
              <p className="text-sm leading-7 text-slate-600 dark:text-slate-300 md:text-base">
                번호를 고르고, 저장하고, 토요일에 결과를 확인하는 과정을 한 앱 안에서 자연스럽게
                이어갑니다.
              </p>
            </header>
            <div className="hidden lg:block">
              <div className="relative mx-auto max-w-[280px]">
                <div key={active.id} className="animate-fade-in transition duration-500 ease-out">
                  <ScreenshotFrame alt={active.alt} src={active.src} />
                </div>
              </div>
              <div className="mt-md flex justify-center gap-xs">
                {STORY.map((item, index) => (
                  <span
                    key={item.id}
                    className={[
                      'h-1.5 rounded-full transition-all duration-300',
                      index === activeIndex
                        ? 'w-8 bg-blue-600 dark:bg-blue-300'
                        : 'w-1.5 bg-slate-300 dark:bg-slate-700',
                    ].join(' ')}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-xl lg:gap-3xl">
          {STORY.map(({ id, Icon, eyebrow, title, description, src, alt }, index) => (
            <article
              id={`story-${id}`}
              data-story-id={id}
              key={id}
              className="min-h-[72vh] scroll-mt-24 rounded-lg border border-slate-200 bg-slate-50 p-lg transition-colors dark:border-slate-800 dark:bg-slate-950 lg:flex lg:flex-col lg:justify-center lg:border-0 lg:bg-transparent lg:p-0 lg:dark:bg-transparent"
            >
              <div className="mb-lg block lg:hidden">
                <ScreenshotFrame alt={alt} src={src} />
              </div>
              <div className="flex max-w-[560px] flex-col gap-md">
                <div className="flex items-center gap-sm text-blue-700 dark:text-blue-300">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950">
                    <Icon size={18} strokeWidth={2.2} />
                  </span>
                  <span className="text-sm font-semibold">{eyebrow}</span>
                </div>
                <h3 className="text-3xl font-bold leading-tight text-slate-950 dark:text-white md:text-5xl">
                  {title}
                </h3>
                <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
                  {description}
                </p>
                <p className="text-sm font-semibold text-slate-400 dark:text-slate-500">
                  {String(index + 1).padStart(2, '0')} / {String(STORY.length).padStart(2, '0')}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function Lottocat645Landing() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
      <LandingHeader />
      <main>
        <section className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-[1120px] gap-xl px-md pb-2xl pt-xl md:pb-3xl md:pt-2xl lg:grid-cols-[minmax(0,1fr)_380px] lg:items-center">
          <div className="motion-enter flex flex-col gap-lg">
            <div className="flex items-center gap-sm text-blue-700 dark:text-blue-300">
              <Image
                src={APP_ICON_IMAGE}
                alt=""
                width={20}
                height={20}
                className="h-5 w-5 rounded-md"
                aria-hidden="true"
              />
              <span className="text-sm font-semibold">로또 6/45 편의 앱</span>
            </div>
            <div className="flex flex-col gap-md">
              <h1 className="max-w-[720px] text-4xl font-bold leading-tight text-slate-950 dark:text-white md:text-6xl">
                로또 번호 추천부터 당첨 확인까지
              </h1>
              <p className="max-w-[680px] text-base leading-8 text-slate-600 dark:text-slate-300 md:text-lg">
                로또켓645로 번호 생성, QR 당첨 확인, 번호 분석, 세금 계산을 한 번에 관리하세요.
              </p>
            </div>
            <div className="flex flex-col gap-sm sm:flex-row">
              <Link
                href={GOOGLE_PLAY_URL}
                target="_blank"
                rel="noreferrer"
                className="motion-chip flex h-12 items-center justify-center rounded-lg bg-blue-600 px-md text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Google Play에서 받기
              </Link>
              <Link
                href="#features"
                className="motion-chip flex h-12 items-center justify-center rounded-lg border border-slate-300 px-md text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-950 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:text-white"
              >
                주요 기능 보기
              </Link>
            </div>
            <ul className="flex flex-wrap gap-sm text-sm font-semibold text-slate-600 dark:text-slate-300">
              {['번호 추천', 'QR 확인', '번호 분석', '세금 계산', '저장 관리'].map((label) => (
                <li
                  key={label}
                  className="rounded-full border border-slate-200 bg-white px-sm py-xs dark:border-slate-800 dark:bg-slate-900"
                >
                  {label}
                </li>
              ))}
            </ul>
          </div>
          <HeroScreenshots />
        </section>

        <ScrollStory />

        <section className="mx-auto grid w-full max-w-[1120px] gap-md px-md py-2xl md:grid-cols-3">
          {SUMMARY.map(([label, value]) => (
            <div key={label} className="border-l-2 border-blue-600 pl-md">
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{label}</p>
              <p className="mt-xs text-xl font-bold text-slate-950 dark:text-white">{value}</p>
            </div>
          ))}
        </section>

        <section className="bg-slate-100 dark:bg-slate-900">
          <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-md px-md py-xl">
            <div className="flex flex-col gap-md rounded-lg border border-slate-200 bg-white p-lg dark:border-slate-800 dark:bg-slate-950 md:flex-row md:items-start">
              <ShieldCheck
                className="shrink-0 text-blue-700 dark:text-blue-300"
                size={24}
                strokeWidth={2.3}
              />
              <div className="flex flex-col gap-sm">
                <h2 className="text-lg font-bold text-slate-950 dark:text-white">
                  이용 전 확인해 주세요
                </h2>
                <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                  로또켓645는 동행복권 공식 앱이 아닌 로또 6/45 이용 편의 앱입니다. 번호 추천과 분석
                  결과는 과거 데이터를 바탕으로 한 참고 정보이며, 당첨을 보장하지 않습니다. 무리한
                  구매는 피하고 건전하게 이용해 주세요.
                </p>
                <Link
                  href={ROUTE_PATH.APPS_LOTTOCAT645_PRIVACY}
                  className="w-fit text-sm font-semibold text-blue-700 underline underline-offset-4 dark:text-blue-300"
                >
                  개인정보 처리방침 보기
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="download" className="mx-auto w-full max-w-[1120px] px-md py-2xl">
          <div className="flex flex-col gap-lg rounded-lg bg-blue-600 p-lg text-white md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-xs">
              <h2 className="text-xl font-bold">로또켓645 시작하기</h2>
              <p className="text-sm leading-7 text-white/85">
                번호 추천, 저장, QR 확인, 세금 계산까지 한 앱에서 관리하세요.
              </p>
            </div>
            <div className="flex flex-col gap-sm sm:flex-row sm:items-center">
              <div className="w-fit rounded-lg bg-white p-2 shadow-sm">
                <Image
                  src={GOOGLE_PLAY_QR_IMAGE}
                  alt="로또켓645 Google Play QR 코드"
                  width={112}
                  height={112}
                  unoptimized
                />
              </div>
              <div className="flex flex-col gap-sm">
                <p className="text-sm font-semibold text-white/85">
                  Android 기기에서 QR로 설치하세요.
                </p>
                <Link
                  href={GOOGLE_PLAY_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center justify-center rounded-lg bg-white px-md text-sm font-bold text-blue-700 transition-colors hover:bg-blue-50"
                >
                  Google Play에서 받기
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
      <FloatingGooglePlayButton />
    </div>
  );
}
