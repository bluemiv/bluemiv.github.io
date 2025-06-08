import dayjs from 'dayjs';
import { TagLink } from '@/features/tag/ui';
import { Post } from '../model';
import ArticleThumbnail from './ArticleThumbnail';

interface Props {
  post: Post;
}

export default function ArticleMetadata({ post }: Props) {
  return (
    <div className="flex flex-col gap-md pb-2xl mb-lg">
      {post.metadata.thumbnail && (
        <ArticleThumbnail thumbnail={post.metadata.thumbnail} alt={post.metadata.title} />
      )}
      <h1 className="font-semibold text-4xl">{post.metadata.title}</h1>
      <ul aria-label="tags" className="flex flex-wrap gap-sm">
        {Array.from(new Set(post.metadata.tags))
          .filter((v) => !!v?.trim())
          .map((tag) => (
            <li key={tag}>
              <TagLink tag={tag} />
            </li>
          ))}
      </ul>
      <div className="flex flex-col gap-xs text-sm text-app-sub-text dark:text-app-dark-sub-text">
        <div>{post.metadata.author}</div>
        <div className="flex gap-md">
          {post.metadata.updatedAt &&
            !dayjs(post.metadata.createdAt).isSame(dayjs(post.metadata.updatedAt), 'minutes') && (
              <time dateTime={dayjs(post.metadata.updatedAt).format('YYYY-MM-DD HH:mm:ss')}>
                최종 수정일: {dayjs(post.metadata.updatedAt).format('YYYY-MM-DD HH:mm:ss')}
              </time>
            )}
          <time dateTime={dayjs(post.metadata.createdAt).format('YYYY-MM-DD HH:mm:ss')}>
            작성일: {dayjs(post.metadata.createdAt).format('YYYY-MM-DD HH:mm:ss')}
          </time>
        </div>
      </div>
    </div>
  );
}
