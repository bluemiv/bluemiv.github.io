import dayjs from 'dayjs';
import { CalendarDays, Clock3, Folder, PencilLine } from 'lucide-react';
import { TagLink } from '@/features/tag/components';
import { Post } from '../model';
import ArticleThumbnail from './ArticleThumbnail';

interface Props {
  post: Post;
}

export default function ArticleMetadata({ post }: Props) {
  const createdAt = dayjs(post.metadata.createdAt);
  const updatedAt = dayjs(post.metadata.updatedAt);
  const isUpdated = post.metadata.updatedAt && !createdAt.isSame(updatedAt, 'minutes');

  return (
    <header className="motion-enter flex flex-col gap-lg pb-2xl mb-lg">
      {post.metadata.thumbnail && (
        <ArticleThumbnail thumbnail={post.metadata.thumbnail} alt={post.metadata.title} />
      )}
      <div className="border-b border-app-border/80 dark:border-app-dark-border/80 pb-xl">
        <div className="flex flex-wrap items-center gap-sm text-sm text-app-text-subtle dark:text-app-dark-text-subtle">
          <span className="inline-flex items-center gap-xs rounded-full bg-app-primary-soft dark:bg-app-dark-primary-soft px-sm py-xs font-semibold text-app-primary dark:text-app-dark-primary">
            <Folder size={14} strokeWidth={2.2} />
            {post.metadata.category}
          </span>
          <span className="inline-flex items-center gap-xs">
            <PencilLine size={14} strokeWidth={2.2} />
            {post.metadata.author}
          </span>
        </div>
        <h1 className="mt-md text-3xl md:text-5xl font-bold leading-tight tracking-normal text-app-text dark:text-app-dark-text">
          {post.metadata.title}
        </h1>
        <p className="mt-md text-base md:text-lg leading-8 text-app-text-muted dark:text-app-dark-text-muted">
          {post.metadata.description}
        </p>
        <div className="mt-lg flex flex-wrap gap-x-md gap-y-xs text-sm text-app-text-subtle dark:text-app-dark-text-subtle">
          <time
            className="inline-flex items-center gap-xs"
            dateTime={createdAt.format('YYYY-MM-DD HH:mm:ss')}
          >
            <CalendarDays size={14} strokeWidth={2.2} />
            작성일 {createdAt.format('YYYY.MM.DD HH:mm')}
          </time>
          {isUpdated && (
            <time
              className="inline-flex items-center gap-xs"
              dateTime={updatedAt.format('YYYY-MM-DD HH:mm:ss')}
            >
              <Clock3 size={14} strokeWidth={2.2} />
              수정일 {updatedAt.format('YYYY.MM.DD HH:mm')}
            </time>
          )}
        </div>
        <ul aria-label="tags" className="mt-lg flex flex-wrap gap-sm">
          {Array.from(new Set(post.metadata.tags))
            .filter((v) => !!v?.trim())
            .map((tag) => (
              <li key={tag}>
                <TagLink tag={tag} />
              </li>
            ))}
        </ul>
      </div>
    </header>
  );
}
