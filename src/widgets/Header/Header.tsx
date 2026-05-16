import { getAllShortPosts } from '@/features/post/api';
import RefreshServiceWorkerCacheButton from '@/features/serviceWorker/components/RefreshServiceWorkerCacheButton';
import { ThemeToggleButton } from '@/features/theme/components';
import { ROUTE_PATH } from '@/shared/constants/route';
import Logo from '@/widgets/Header/Logo';
import NavLink from '@/widgets/Header/NavLink';

export default function Header() {
  const shortPostsLength = getAllShortPosts().length;
  return (
    <header className="w-full px-md h-[56px] sticky inset-0 z-20 bg-app-surface-raised/85 dark:bg-app-dark-surface-raised/85 backdrop-blur-xl border-b border-app-border/80 dark:border-app-dark-border/80">
      <nav className="w-full h-full mx-auto flex items-center justify-between gap-md">
        <Logo />
        <ul className="flex-1 flex justify-end gap-xs">
          {[
            // { href: ROUTE_PATH.ABOUT, label: 'ABOUT' },
            { href: ROUTE_PATH.ROOT, label: 'HOME' },
            { href: [ROUTE_PATH.BLOG_SHORT, shortPostsLength].join('/'), label: '짧은 글' },
            // { href: ROUTE_PATH.BLOG_TAGS, label: 'TAGS' },
          ].map(({ href, label }) => (
            <li key={href}>
              <NavLink href={href}>{label}</NavLink>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-xs rounded-full border border-app-border dark:border-app-dark-border bg-app-surface-muted/70 dark:bg-app-dark-surface-muted/70 p-1">
          <RefreshServiceWorkerCacheButton />
          <ThemeToggleButton />
        </div>
      </nav>
    </header>
  );
}
