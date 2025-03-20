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
        'hover:bg-slate-100 active:bg-slate-200 px-[0.75rem] py-sm rounded',
        className,
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
