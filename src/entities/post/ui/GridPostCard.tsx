import Image from 'next/image';
import Link from 'next/link';
import dayjs from 'dayjs';
import { Post } from '@/entities/post/model';
import { ROUTE_PATH } from '@/shared/constants/route';
import clsx from 'clsx';
import { PropsWithClassName } from '@/shared/types/props';

interface Props {
  post: Post;
}

export default function GridPostCard({ post, className }: PropsWithClassName<Props>) {
  return (
    <Link
      href={[ROUTE_PATH.BLOG, post.metadata.category, post.metadata.slug].join('/')}
      className={clsx(
        'h-[380px] animate-fade-in flex flex-col rounded-lg overflow-hidden transition-all ease-in-out duration-300 group cursor-pointer border border-app-sub-bg dark:border-app-dark-sub-bg',
        className,
      )}
    >
      <div className="w-full min-h-[180px] max-h-[180px] bg-app-sub-bg dark:bg-app-dark-sub-bg overflow-hidden">
        {!!post.metadata.thumbnail && (
          <Image
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 duration-150 ease-in-out"
            width="320"
            height="280"
            src={post.metadata.thumbnail}
            alt={post.metadata.title}
          />
        )}
      </div>
      <div className="flex-1 flex flex-col gap-md p-md">
        <div className="line-clamp-2 font-semibold group-hover:text-app-primary dark:group-hover:text-app-dark-primary break-all">
          {post.metadata.title}
        </div>
        <div className="line-clamp-3 text-app-sub-text dark:text-app-dark-sub-text">
          {post.metadata.description}
        </div>
        <div className="flex-1 text-app-sub-text dark:text-app-dark-sub-text text-sm flex items-end justify-between gap-sm">
          <span className="bg-app-sub-bg dark:bg-app-dark-sub-bg px-xs rounded-md">
            {post.metadata.category}
          </span>
          <span>{dayjs(post.metadata.createdAt).format('YYYY-MM-DD HH:mm')}</span>
        </div>
      </div>
    </Link>
  );
}
