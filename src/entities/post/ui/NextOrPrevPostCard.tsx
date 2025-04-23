import dayjs from 'dayjs';
import Link from 'next/link';
import Image from 'next/image';

import { Post } from '@/entities/post/model';
import { CategoryTag } from '@/entities/post/ui/CategoryTag';
import { ROUTE_PATH } from '@/shared/constants/route';
import clsx from 'clsx';

export const NextOrPrevPostCard = ({
  type,
  post,
}: {
  type: 'next' | 'prev';
  post?: Post | null;
}) => {
  if (!post) return null;
  return (
    <Link
      className="w-full border border-app-sub-bg dark:border-app-dark-sub-bg rounded-lg p-md block h-[200px] hover:border-app-primary dark:hover:border-app-dark-primary duration-150 ease-in-out group"
      href={[ROUTE_PATH.BLOG, post.metadata.category, post.metadata.slug].join('/')}
    >
      <div className="flex flex-col gap-md justify-between h-full">
        <div
          className={clsx(
            'capitalize text-sm font-semibold',
            type === 'next' ? 'text-right' : 'text-left',
          )}
        >
          {type}
        </div>
        <div
          className={clsx(
            'flex justify-between gap-md',
            type === 'next' ? 'flex-row-reverse' : 'flex-row',
          )}
        >
          {post.metadata.thumbnail && (
            <div className="rounded-full overflow-hidden min-w-[80px] min-h-[80px] w-[80px] h-[80px]">
              <Image
                width={80}
                height={80}
                src={post.metadata.thumbnail}
                alt={post.metadata.title}
                className="w-full h-full object-cover group-hover:scale-125 duration-150 ease-in-out"
              />
            </div>
          )}
          <div className="flex flex-col gap-sm">
            <div className="text-lg line-clamp-1 group-hover:text-app-primary dark:group-hover:text-app-dark-primary duration-150 ease-in-out">
              {post.metadata.title}
            </div>
            <div className="text-sm text-app-sub-text dark:text-app-dark-sub-text line-clamp-2">
              {post.metadata.description}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <CategoryTag category={post.metadata.category} />
          <div className="text-sm text-app-sub-text dark:text-app-dark-sub-text">
            {dayjs(post.metadata.createdAt).format('YYYY-MM-DD HH:mm:ss')}
          </div>
        </div>
      </div>
    </Link>
  );
};
