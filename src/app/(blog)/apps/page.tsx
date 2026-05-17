import { Smartphone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { LOTTOCAT645_APP } from '@/features/apps/lottocat645';
import { ROUTE_PATH } from '@/shared/constants/route';
import { Sidebar } from '@/widgets/Sidebar';

const APPS = [
  {
    name: LOTTOCAT645_APP.name,
    description: LOTTOCAT645_APP.shortDescription,
    href: ROUTE_PATH.APPS_LOTTOCAT645,
    icon: LOTTOCAT645_APP.iconWebp,
  },
  { name: 'Blim', description: '상세 소개를 준비 중입니다.' },
  { name: 'Musepiece', description: '상세 소개를 준비 중입니다.' },
  { name: 'Pixel Blur', description: '상세 소개를 준비 중입니다.' },
  { name: 'Pomodoro Flow', description: '상세 소개를 준비 중입니다.' },
  { name: 'Easy Dots', description: '상세 소개를 준비 중입니다.' },
  { name: 'AI Wallpaper', description: '상세 소개를 준비 중입니다.' },
  { name: 'Luna', description: '상세 소개를 준비 중입니다.' },
];

export default function AppsPage() {
  return (
    <div className="flex items-start justify-start w-full">
      <Sidebar />
      <div className="w-full md:w-[calc(100%-280px)]">
        <main className="max-w-[1000px] p-md lg:p-xl mx-auto w-full flex flex-col gap-xl justify-start items-start">
          <section className="article-hero motion-enter w-full flex flex-col gap-md border-b border-app-border/80 dark:border-app-dark-border/80 pb-xl">
            <div className="flex items-center gap-sm text-app-primary dark:text-app-dark-primary">
              <Smartphone size={18} strokeWidth={2.4} />
              <span className="text-sm font-semibold">Apps</span>
            </div>
            <div className="flex flex-col gap-sm">
              <h1 className="article-hero-title text-2xl md:text-3xl leading-tight font-bold text-app-text dark:text-app-dark-text">
                만들고 운영하는 앱
              </h1>
              <p className="article-hero-description text-base md:text-lg leading-8 text-app-text-muted dark:text-app-dark-text-muted">
                작게 시작해 계속 다듬고 있는 앱들을 모아두는 공간입니다.
              </p>
            </div>
          </section>

          <section className="w-full flex flex-col gap-md">
            <header className="flex flex-col gap-xs">
              <h2 className="text-xl md:text-2xl font-bold text-app-text dark:text-app-dark-text">
                앱 목록
              </h2>
              <p className="text-sm md:text-base text-app-text-muted dark:text-app-dark-text-muted">
                상세 랜딩페이지는 순차적으로 공개할 예정입니다.
              </p>
            </header>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-sm w-full">
              {APPS.map((app) => (
                <li key={app.name}>
                  {app.href ? (
                    <Link
                      href={app.href}
                      target="_blank"
                      rel="noreferrer"
                      className="motion-card flex h-full gap-md rounded-lg border border-app-border/80 bg-app-surface/70 p-md transition-colors hover:border-app-primary hover:text-app-primary dark:border-app-dark-border/80 dark:bg-app-dark-surface/60 dark:hover:border-app-dark-primary dark:hover:text-app-dark-primary"
                    >
                      {app.icon && (
                        <Image
                          src={app.icon}
                          alt={`${app.name} 앱 아이콘`}
                          width={52}
                          height={52}
                          className="h-[52px] w-[52px] shrink-0 rounded-xl"
                        />
                      )}
                      <span className="flex min-w-0 flex-col gap-xs">
                        <span className="text-sm font-semibold text-app-text dark:text-app-dark-text">
                          {app.name}
                        </span>
                        <span className="text-sm leading-6 text-app-text-muted dark:text-app-dark-text-muted">
                          {app.description}
                        </span>
                      </span>
                    </Link>
                  ) : (
                    <div className="motion-card flex h-full flex-col gap-xs rounded-lg border border-app-border/80 bg-app-surface/70 p-md dark:border-app-dark-border/80 dark:bg-app-dark-surface/60">
                      <span className="text-sm font-semibold text-app-text dark:text-app-dark-text">
                        {app.name}
                      </span>
                      <span className="text-sm leading-6 text-app-text-muted dark:text-app-dark-text-muted">
                        {app.description}
                      </span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}
