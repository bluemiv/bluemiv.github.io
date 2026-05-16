import clsx from 'clsx';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { CategoryTag } from '@/features/post/components/CategoryTag';
import { Post } from '@/features/post/model';
import { ROUTE_PATH } from '@/shared/constants/route';
import { PropsWithClassName } from '@/shared/types/props';

interface Props {
  post: Post;
}

export default function GridPostCard({ post, className }: PropsWithClassName<Props>) {
  return (
    <Link
      href={[ROUTE_PATH.BLOG, post.metadata.category, post.metadata.slug].join('/')}
      className={clsx(
        'animate-fade-in flex flex-col rounded-xl overflow-hidden transition-all ease-out duration-150 group cursor-pointer border border-app-border dark:border-app-dark-border bg-app-surface/85 dark:bg-app-dark-surface/80 hover:border-app-border-strong dark:hover:border-app-dark-border-strong hover:-translate-y-0.5',
        className,
      )}
    >
      <div className="w-full min-h-[168px] max-h-[168px] bg-app-surface-muted dark:bg-app-dark-surface-muted overflow-hidden">
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
        <div className="flex items-center justify-between gap-sm text-xs text-app-text-subtle dark:text-app-dark-text-subtle">
          <CategoryTag category={post.metadata.category} />
          <span>{dayjs(post.metadata.createdAt).format('YYYY-MM-DD')}</span>
        </div>
        <div className="line-clamp-2 text-lg leading-7 font-bold group-hover:text-app-primary dark:group-hover:text-app-dark-primary break-all transition-colors">
          {post.metadata.title}
        </div>
        <div className="line-clamp-3 text-sm leading-6 text-app-text-muted dark:text-app-dark-text-muted">
          {post.metadata.description}
        </div>
        <div className="flex-1 flex items-end gap-xs flex-wrap">
          {post.metadata.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-app-surface-muted dark:bg-app-dark-surface-muted px-xs py-[2px] text-xs font-semibold text-app-text-subtle dark:text-app-dark-text-subtle"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
