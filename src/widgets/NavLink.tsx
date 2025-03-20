import Link from 'next/link';
import clsx from 'clsx';
import { PropsWithComponent } from '@/shared/types';

interface Props {
  href: string;
}

export default function NavLink({ href, children, className }: PropsWithComponent<Props>) {
  return (
    <Link
      className={clsx(
        'font-semibold hover:bg-slate-50 active:bg-slate-100 p-sm rounded',
        className,
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
