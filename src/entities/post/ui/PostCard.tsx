import { Post } from '@/entities/post/model';
import Link from 'next/link';

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  return (
    <Link
      className="animate-fade-in flex gap-md p-md shadow rounded-lg"
      href={['/blog', post.metadata.category, post.metadata.slug].join('/')}
    >
      <div className="flex flex-col gap-md">
        <div className="font-semibold">{post.metadata.title}</div>
        <div className="line-clamp-3">{post.metadata.description}</div>
      </div>
      <div></div>
    </Link>
  );
}
