import { Rss } from 'lucide-react';
import Link from 'next/link';
import { ROUTE_PATH } from '@/shared/constants/route';

export const RSSLink = () => {
  return (
    <Link
      href={ROUTE_PATH.RSS}
      prefetch={false}
      aria-label="RSS 구독"
      className="motion-chip inline-flex h-9 w-9 items-center justify-center rounded-lg border border-app-border dark:border-app-dark-border bg-app-surface dark:bg-app-dark-surface hover:bg-app-primary-soft dark:hover:bg-app-dark-primary-soft hover:text-app-primary dark:hover:text-app-dark-primary duration-100 ease-in-out"
    >
      <Rss size={17} strokeWidth={2.2} />
    </Link>
  );
};
