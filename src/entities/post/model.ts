export type CommonPostMetadata = {
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

export type PostMetadata = CommonPostMetadata & {
  category: string;
};

export type ShortPostMetadata = CommonPostMetadata;

export type Post = {
  metadata: PostMetadata;
  content: string;
};

export type ShortPost = {
  metadata: ShortPostMetadata;
  content: string;
};
