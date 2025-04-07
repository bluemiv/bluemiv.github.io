import dayjs from 'dayjs';
import ArticleThumbnail from './ArticleThumbnail';
import { Post } from '../model';
import { Tag } from '@/features/post/ui';

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
      <div className="flex flex-wrap gap-sm">
        {Array.from(new Set(post.metadata.tags))
          .filter((v) => !!v?.trim())
          .map((tag) => (
            <Tag key={tag} tag={tag} />
          ))}
      </div>
      <div className="flex flex-col gap-xs text-sm text-app-sub-text dark:text-app-dark-sub-text">
        <div>{post.metadata.author}</div>
        <div className="flex gap-md">
          {post.metadata.updatedAt &&
            !dayjs(post.metadata.createdAt).isSame(dayjs(post.metadata.updatedAt), 'minutes') && (
              <div>최종 수정일: {dayjs(post.metadata.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</div>
            )}
          <div>작성일: {dayjs(post.metadata.createdAt).format('YYYY-MM-DD HH:mm:ss')}</div>
        </div>
      </div>
    </div>
  );
}
