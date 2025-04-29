import clsx from 'clsx';
import dayjs from 'dayjs';
import Link from 'next/link';
import { ShortPost } from '@/entities/post/model';
import { ShortTagLink } from '@/features/tag/ui';
import { ROUTE_PATH } from '@/shared/constants/route';

interface Props {
  active?: boolean;
  post: ShortPost;
}

export const ShortPostItem = ({ active, post }: Props) => {
  return (
    <div
      className={clsx(
        'w-full border-b border-app-sub-bg dark:border-app-dark-sub-bg p-sm border-l-3 flex flex-col gap-sm',
        active
          ? 'border-l-app-primary dark:border-l-app-dark-primary'
          : 'border-l-transparent dark:border-l-transparent',
      )}
    >
      {active ? (
        <div className="font-semibold line-clamp-1 cursor-not-allowed text-app-primary dark:text-app-dark-primary">
          {post.metadata.title}
        </div>
      ) : (
        <Link
          href={[ROUTE_PATH.BLOG_SHORT, post.metadata.slug].join('/')}
          className="font-semibold line-clamp-1 cursor-pointer hover:text-app-primary dark:hover:text-app-dark-primary"
        >
          {post.metadata.title}
        </Link>
      )}
      <div className="text-sm text-app-sub-text dark:text-app-dark-sub-text line-clamp-1">
        {post.metadata.description}
      </div>
      <div className="w-full flex items-center justify-between gap-sm">
        <div className="flex items-center flex-wrap gap-xs">
          {post.metadata.tags.slice(0, 4).map((tag) => (
            <ShortTagLink key={tag} tag={tag} />
          ))}
        </div>
        <div className="text-xs text-app-sub-text dark:text-app-dark-sub-text">
          {dayjs(post.metadata.createdAt).format('YYYY-MM-DD')}
        </div>
      </div>
    </div>
  );
};
