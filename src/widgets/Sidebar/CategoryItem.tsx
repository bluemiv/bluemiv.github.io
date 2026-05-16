import clsx from 'clsx';
import { ChevronRight, Folder } from 'lucide-react';
import Link from 'next/link';
import { ROUTE_PATH } from '@/shared/constants/route';

export const CategoryItem = ({
  label,
  category,
  count,
  isSubList,
  isNotLink,
}: {
  label: string;
  category: string;
  count: number;
  isSubList?: boolean;
  isNotLink?: boolean;
}) => {
  const hasPosts = count > 0;

  return (
    <li>
      {isNotLink ? (
        <span className="flex items-center justify-between h-8 rounded-md px-sm text-xs font-bold uppercase text-app-text-subtle dark:text-app-dark-text-subtle">
          <span>{label}</span>
          <ChevronRight size={13} strokeWidth={2.4} className="opacity-50" />
        </span>
      ) : !hasPosts ? (
        <span
          aria-disabled="true"
          className={clsx(
            'flex items-center justify-between h-9 rounded-lg px-sm text-sm font-semibold',
            'text-app-text-subtle/65 dark:text-app-dark-text-subtle/65',
            isSubList
              ? 'ml-md border-l border-app-border dark:border-app-dark-border rounded-l-none pl-sm'
              : '',
          )}
        >
          <span className="min-w-0 inline-flex items-center gap-xs">
            {!isSubList && <Folder size={14} strokeWidth={2.2} className="shrink-0 opacity-45" />}
            <span className="truncate">{label}</span>
          </span>
          <span className="ml-sm rounded-full bg-app-surface-muted/70 dark:bg-app-dark-surface-muted/70 px-xs py-[1px] text-xs">
            0
          </span>
        </span>
      ) : (
        <Link
          className={clsx(
            'motion-chip group flex items-center justify-between h-9 rounded-lg px-sm text-sm font-semibold transition-colors',
            'text-app-text-muted dark:text-app-dark-text-muted hover:bg-app-primary-soft dark:hover:bg-app-dark-primary-soft',
            'hover:text-app-primary dark:hover:text-app-dark-primary',
            isSubList
              ? 'ml-md border-l border-app-border dark:border-app-dark-border rounded-l-none pl-sm'
              : '',
          )}
          href={[ROUTE_PATH.BLOG_CATEGORY, encodeURIComponent(category.toLowerCase()), '1'].join(
            '/',
          )}
        >
          <span className="min-w-0 inline-flex items-center gap-xs">
            {!isSubList && <Folder size={14} strokeWidth={2.2} className="shrink-0 opacity-70" />}
            <span className="truncate">{label}</span>
          </span>
          <span className="ml-sm rounded-full bg-app-surface-muted dark:bg-app-dark-surface-muted px-xs py-[1px] text-xs text-app-text-subtle dark:text-app-dark-text-subtle group-hover:bg-app-surface dark:group-hover:bg-app-dark-surface">
            {count || 0}
          </span>
        </Link>
      )}
    </li>
  );
};
