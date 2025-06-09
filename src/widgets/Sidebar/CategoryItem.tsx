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
    <li className="h-[36px]">
      {isNotLink ? (
        <span className="flex items-center h-full cursor-not-allowed pl-[0.5rem]">{label}</span>
      ) : (
        <Link
          className={clsx(
            'flex items-center h-full hover:bg-app-sub-bg dark:hover:bg-app-dark-sub-bg',
            'hover:text-app-primary dark:hover:text-app-dark-primary pl-[0.5rem]',
            isSubList
              ? 'hover:border-app-primary dark:hover:border-app-dark-primary border-app-sub-text dark:border-b-app-dark-sub-text border-l ml-[1rem]'
              : '',
          )}
          href={[ROUTE_PATH.BLOG_CATEGORY, encodeURIComponent(category.toLowerCase()), '1'].join(
            '/',
          )}
        >
          {label}
          <span className="ml-sm text-sm text-app-sub-text dark:text-app-dark-sub-text">
            ({count})
          </span>
        </Link>
      )}
    </li>
  );
};
