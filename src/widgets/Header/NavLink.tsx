import Link from 'next/link';
import clsx from 'clsx';
import { PropsWithComponent } from '@/shared/types/props';

interface Props {
  href: string;
}

export default function NavLink({ href, children, className }: PropsWithComponent<Props>) {
  return (
    <Link
      className={clsx(
        'hover:bg-slate-100 active:bg-slate-200 px-[17px] h-[34px] rounded transition duration-150 ease-in-out flex items-center justify-center',
        className,
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
