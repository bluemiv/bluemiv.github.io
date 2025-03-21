'use client';

import Link from 'next/link';
import { ROUTE_PATH } from '@/shared/constants/route';
import NavLink from '@/widgets/NavLink';

export default function Header() {
  return (
    <header className="w-full px-md h-[50px] sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-slate-100">
      <nav className="w-full h-full mx-auto flex items-center justify-between">
        <Link href={ROUTE_PATH.ROOT} className="font-semibold italic">
          Bluemiv.
        </Link>
        <ul className="flex gap-md">
          {[
            { href: ROUTE_PATH.ABOUT, label: 'ABOUT' },
            { href: ROUTE_PATH.BLOG, label: 'BLOG' },
          ].map(({ href, label }) => (
            <li key={href}>
              <NavLink href={href}>{label}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
