import clsx from 'clsx';
import Link from 'next/link';
import { PropsWithComponent } from '@/shared/types/props';

interface Props {
  ariaLabel: string;
  href: string;
  title?: string;
}

export default function NavLink({
  ariaLabel,
  href,
  title = ariaLabel,
  children,
  className,
}: PropsWithComponent<Props>) {
  return (
    <Link
      aria-label={ariaLabel}
      className={clsx(
        'motion-chip hover:bg-app-primary-soft dark:hover:bg-app-dark-primary-soft hover:text-app-primary dark:hover:text-app-dark-primary px-sm sm:px-md h-9 rounded-full transition duration-150 ease-in-out flex shrink-0 items-center justify-center gap-xs whitespace-nowrap text-sm font-semibold text-app-text-muted dark:text-app-dark-text-muted',
        className,
      )}
      href={href}
      title={title}
    >
      {children}
    </Link>
  );
}
