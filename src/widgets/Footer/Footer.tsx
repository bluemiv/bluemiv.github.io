import { ExternalLink, Rss, Shield } from 'lucide-react';
import Link from 'next/link';
import { ROUTE_PATH } from '@/shared/constants/route';
import { SITE_METADATA } from '@/shared/constants/site';

const footerLinks = [
  { href: '/rss.xml', label: 'RSS', Icon: Rss },
  { href: '/privacy', label: 'Privacy', Icon: Shield },
  { href: 'https://github.com/bluemiv', label: 'GitHub', Icon: ExternalLink, external: true },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-3xl border-t border-app-border/80 dark:border-app-dark-border/80 bg-app-bg/80 dark:bg-app-dark-bg/80 lg:ml-[264px]">
      <div className="mx-auto flex w-full max-w-[1000px] flex-col gap-md px-md py-xl md:flex-row md:items-center md:justify-between">
        <div className="space-y-xs">
          <Link
            href={ROUTE_PATH.ROOT}
            className="inline-flex text-sm font-bold italic text-app-text dark:text-app-dark-text"
          >
            Bluemiv.
          </Link>
          <p className="max-w-[520px] text-sm leading-6 text-app-text-muted dark:text-app-dark-text-muted">
            Java, Spring, React, Next.js, 알고리즘을 중심으로 다시 찾기 좋은 기술 기록을
            정리합니다.
          </p>
        </div>
        <div className="flex flex-col gap-sm text-sm text-app-text-subtle dark:text-app-dark-text-subtle md:items-end">
          <nav aria-label="푸터 링크" className="flex flex-wrap gap-xs">
            {footerLinks.map(({ href, label, Icon, external }) => (
              <Link
                key={href}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer' : undefined}
                className="motion-chip inline-flex h-8 items-center gap-xs rounded-full px-sm font-semibold hover:bg-app-primary-soft hover:text-app-primary dark:hover:bg-app-dark-primary-soft dark:hover:text-app-dark-primary"
              >
                <Icon size={14} strokeWidth={2.2} aria-hidden="true" />
                {label}
              </Link>
            ))}
          </nav>
          <p>
            © {year} {SITE_METADATA.nickname}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
