import { ROUTE_PATH } from '@/shared/constants/route';
import NavLink from '@/widgets/Header/NavLink';
import Logo from '@/widgets/Header/Logo';
import { ThemeToggleButton } from '@/features/toggleTheme/ui';
import RefreshServiceWorkerCacheButton from '@/features/serviceWorker/ui/RefreshServiceWorkerCacheButton';

export default function Header() {
  return (
    <header className="w-full px-md h-[50px] sticky inset-0 z-10 bg-white/30 dark:bg-app-dark-bg/30 backdrop-blur-sm border-b border-app-sub-bg dark:border-app-dark-sub-bg">
      <nav className="w-full h-full mx-auto flex items-center justify-between gap-md">
        <Logo />
        <ul className="flex-1 flex justify-end gap-sm">
          {[
            // { href: ROUTE_PATH.ABOUT, label: 'ABOUT' },
            { href: ROUTE_PATH.ROOT, label: 'HOME' },
            { href: ROUTE_PATH.BLOG_TAGS, label: 'TAGS' },
          ].map(({ href, label }) => (
            <li key={href}>
              <NavLink href={href}>{label}</NavLink>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-sm">
          <RefreshServiceWorkerCacheButton />
          <ThemeToggleButton />
        </div>
      </nav>
    </header>
  );
}
