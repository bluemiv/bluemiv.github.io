import clsx from 'clsx';
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
  return (
    <li>
      {isNotLink ? (
        <span className="flex items-center justify-between h-8 rounded-md px-sm text-sm font-semibold text-app-text-muted dark:text-app-dark-text-muted">
          {label}
        </span>
      ) : (
        <Link
          className={clsx(
            'flex items-center justify-between h-8 rounded-md px-sm text-sm font-medium transition-colors',
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
          <span className="truncate">{label}</span>
          <span className="ml-sm text-xs text-app-text-subtle dark:text-app-dark-text-subtle">
            {count || 0}
          </span>
        </Link>
      )}
    </li>
  );
};
