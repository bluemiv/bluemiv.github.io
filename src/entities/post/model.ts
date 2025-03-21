export type PostMetadata = {
  category: string;
  slug: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  release: boolean;
  author: string;
  thumbnail?: string;
};

export type Post = {
  metadata: PostMetadata;
  content: string;
};
