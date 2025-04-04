import { ROUTE_PATH } from '@/shared/constants/route';
import NavLink from '@/widgets/Header/NavLink';
import Logo from '@/widgets/Header/Logo';
import { ThemeToggleButton } from '@/features/toggleTheme';

export default function Header() {
  return (
    <header className="w-full px-md h-[50px] sticky top-0 z-10 bg-white/80 dark:bg-app-dark-bg/20 backdrop-blur-sm">
      <nav className="w-full h-full mx-auto flex items-center justify-between gap-md">
        <Logo />
        <ul className="flex-1 flex justify-end gap-md">
          {[
            { href: ROUTE_PATH.ABOUT, label: 'ABOUT' },
            { href: ROUTE_PATH.BLOG, label: 'BLOG' },
          ].map(({ href, label }) => (
            <li key={href}>
              <NavLink href={href}>{label}</NavLink>
            </li>
          ))}
        </ul>
        <div>
          <ThemeToggleButton />
        </div>
      </nav>
    </header>
  );
}
