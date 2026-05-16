import clsx from 'clsx';
import Link from 'next/link';
import { PropsWithComponent } from '@/shared/types/props';

interface Props {
  href: string;
}

export default function NavLink({ href, children, className }: PropsWithComponent<Props>) {
  return (
    <Link
      className={clsx(
        'hover:bg-app-primary-soft dark:hover:bg-app-dark-primary-soft hover:text-app-primary dark:hover:text-app-dark-primary px-md h-9 rounded-full transition duration-150 ease-in-out flex items-center justify-center gap-xs text-sm font-semibold text-app-text-muted dark:text-app-dark-text-muted',
        className,
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
