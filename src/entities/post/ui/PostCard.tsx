import { Post } from '@/entities/post/model';

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  return (
    <div className="animate-fade-in flex gap-md p-md shadow rounded-lg">
      <div className="flex flex-col gap-md">
        <div className="font-semibold">{post.metadata.title}</div>
        <div className="line-clamp-3">{post.metadata.description}</div>
      </div>
      <div></div>
    </div>
  );
}
