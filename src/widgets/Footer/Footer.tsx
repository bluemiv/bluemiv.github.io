import { ExternalLink, Rss } from 'lucide-react';
import Link from 'next/link';

const footerLinks = [
  { href: '/rss.xml', label: 'RSS', Icon: Rss },
  { href: 'https://github.com/bluemiv', label: 'GitHub', Icon: ExternalLink, external: true },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-3xl border-t border-app-border/80 dark:border-app-dark-border/80 bg-app-bg/80 dark:bg-app-dark-bg/80 lg:ml-[264px]">
      <div className="mx-auto flex w-full max-w-[1000px] flex-col gap-md px-md py-xl md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-app-text-subtle dark:text-app-dark-text-subtle">
          © {year}. All rights reserved.
        </p>
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
        </div>
      </div>
    </footer>
  );
}
