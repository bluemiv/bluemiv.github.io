import { ExternalLink, Rss, Sparkles, Target, Wrench } from 'lucide-react';
import Link from 'next/link';
import AboutProfile from '@/app/(blog)/about/_components/AboutProfile';
import { SplitText } from '@/shared/components';
import { ROUTE_PATH } from '@/shared/constants/route';
import { SITE_METADATA } from '@/shared/constants/site';
import { Sidebar } from '@/widgets/Sidebar';

const TECH_STACK = ['Java', 'Spring', 'TypeScript', 'React', 'Next.js', 'Algorithm'];

const VALUES = [
  {
    Icon: Target,
    title: '끊임없는 도전',
    description: '익숙함에 머무르지 않고 새로운 문제와 기술에 도전합니다.',
  },
  {
    Icon: Sparkles,
    title: '높은 완성도',
    description: '결과뿐 아니라 과정에서도 완성도와 디테일을 추구합니다.',
  },
  {
    Icon: Wrench,
    title: '꾸준한 기록',
    description: '학습한 내용을 정리하고 공유하여 함께 성장합니다.',
  },
];

export default function AboutPage() {
  return (
    <div className="flex items-start justify-start w-full">
      <Sidebar />
      <div className="w-full md:w-[calc(100%-280px)]">
        <main className="max-w-[1000px] p-md lg:p-xl mx-auto w-full flex flex-col gap-xl justify-start items-start">
          <section className="motion-enter motion-shine relative w-full overflow-hidden rounded-2xl border border-app-border/80 dark:border-app-dark-border/80 bg-app-surface/80 dark:bg-app-dark-surface/70 p-lg md:p-xl flex flex-col lg:flex-row lg:items-center gap-xl">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-app-primary via-app-accent to-transparent dark:from-app-dark-primary dark:via-app-dark-accent" />
            <AboutProfile />
            <div className="flex flex-col gap-md min-w-0 flex-1">
              <div className="flex items-center gap-sm">
                <Sparkles
                  size={16}
                  strokeWidth={2.4}
                  className="text-app-primary dark:text-app-dark-primary"
                />
                <span className="text-sm font-semibold text-app-primary dark:text-app-dark-primary">
                  About Me
                </span>
              </div>
              <div className="text-2xl md:text-3xl leading-tight font-bold text-app-text dark:text-app-dark-text">
                <SplitText text="Front-End 개발자 " />
                <SplitText className="text-app-primary dark:text-app-dark-primary" text="김태홍 " startIndex={2} />
                <SplitText text="입니다." startIndex={3} />
              </div>
              <div className="text-base md:text-lg leading-8 text-app-text-muted dark:text-app-dark-text-muted">
                <div>
                  <SplitText text="포기하지 않고 끊임없는 " startIndex={4} />
                  <SplitText
                    className="font-semibold text-app-text dark:text-app-dark-text"
                    text="도전"
                    startIndex={7}
                  />
                  <SplitText text="을 이어가며," startIndex={8} />
                </div>
                <div>
                  <SplitText text="결과뿐 아니라 과정에서도 " startIndex={9} />
                  <SplitText
                    className="font-semibold text-app-text dark:text-app-dark-text"
                    startIndex={12}
                    text="높은 완성도"
                  />
                  <SplitText text="를 추구하는 개발자입니다." startIndex={13} />
                </div>
              </div>
              <div className="flex flex-wrap gap-sm pt-xs">
                {TECH_STACK.map((label) => (
                  <span
                    key={label}
                    className="motion-chip rounded-full border border-app-border dark:border-app-dark-border bg-app-surface-muted/70 dark:bg-app-dark-surface-muted/70 px-sm py-xs text-xs font-semibold text-app-text-subtle dark:text-app-dark-text-subtle"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section className="w-full flex flex-col gap-md">
            <header className="flex flex-col gap-xs">
              <p className="text-sm font-semibold text-app-primary dark:text-app-dark-primary">
                Values
              </p>
              <h2 className="text-xl md:text-2xl font-bold text-app-text dark:text-app-dark-text">
                개발자로서 지향하는 가치
              </h2>
              <p className="text-sm md:text-base text-app-text-muted dark:text-app-dark-text-muted">
                일상에서 코드를 마주할 때 잊지 않으려는 세 가지 원칙입니다.
              </p>
            </header>
            <div className="motion-stagger grid grid-cols-1 md:grid-cols-3 gap-md w-full">
              {VALUES.map(({ Icon, title, description }) => (
                <div
                  key={title}
                  className="motion-card rounded-2xl border border-app-border/80 dark:border-app-dark-border/80 bg-app-surface/80 dark:bg-app-dark-surface/70 p-lg flex flex-col gap-sm transition-all duration-150 ease-out hover:border-app-border-strong dark:hover:border-app-dark-border-strong"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-app-primary-soft dark:bg-app-dark-primary-soft text-app-primary dark:text-app-dark-primary">
                    <Icon size={18} strokeWidth={2.2} />
                  </div>
                  <h3 className="font-bold text-lg text-app-text dark:text-app-dark-text">
                    {title}
                  </h3>
                  <p className="text-sm leading-6 text-app-text-muted dark:text-app-dark-text-muted">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="w-full flex flex-col gap-md">
            <header className="flex flex-col gap-xs">
              <p className="text-sm font-semibold text-app-primary dark:text-app-dark-primary">
                Connect
              </p>
              <h2 className="text-xl md:text-2xl font-bold text-app-text dark:text-app-dark-text">
                더 알아보기
              </h2>
              <p className="text-sm md:text-base text-app-text-muted dark:text-app-dark-text-muted">
                새로운 글이 올라오면 RSS로 받아보거나 GitHub에서 활동을 확인할 수 있습니다.
              </p>
            </header>
            <div className="flex flex-col sm:flex-row gap-sm">
              <Link
                href={ROUTE_PATH.RSS}
                prefetch={false}
                className="motion-chip motion-shine h-11 px-md rounded-lg bg-app-primary dark:bg-app-dark-primary text-white dark:text-[#020617] font-semibold flex items-center justify-center gap-sm transition-colors hover:bg-app-primary-hover dark:hover:bg-app-dark-primary-hover"
              >
                <Rss size={17} strokeWidth={2.2} />
                RSS 구독
              </Link>
              <Link
                href={`https://github.com/${SITE_METADATA.nickname}`}
                target="_blank"
                rel="noreferrer"
                className="motion-chip h-11 px-md rounded-lg border border-app-border dark:border-app-dark-border bg-app-surface-muted dark:bg-app-dark-surface-muted text-app-text-muted dark:text-app-dark-text-muted font-semibold flex items-center justify-center gap-sm transition-colors hover:border-app-border-strong dark:hover:border-app-dark-border-strong hover:text-app-text dark:hover:text-app-dark-text"
              >
                GitHub
                <ExternalLink size={15} strokeWidth={2.2} />
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
