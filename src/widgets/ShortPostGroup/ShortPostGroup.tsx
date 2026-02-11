import {
  getShortPageNumber,
  getShortPostCurrentPageNumber,
  getShortPosts,
} from '@/features/post/api';
import { Pagination } from '@/features/post/components';
import { ShortPostItem } from '@/features/post/components';
import { ResponsiveAd } from '@/shared/components';
import { ROUTE_PATH } from '@/shared/constants/route';

interface Props {
  slug: string;
}

export const ShortPostGroup = ({ slug }: Props) => {
  const posts = getShortPosts(slug);
  const totalPageNum = getShortPageNumber();
  const currentPageNum = getShortPostCurrentPageNumber(slug);

  return (
    <div className="w-full py-md sticky top-[50px] flex flex-col gap-md">
      <div>
        {posts.map((post) => {
          const active = post.metadata.slug === slug;
          return <ShortPostItem key={post.metadata.slug} active={active} post={post} />;
        })}
      </div>
      <Pagination
        prefix={ROUTE_PATH.BLOG_SHORT}
        currentPageNum={currentPageNum}
        totalPageNum={totalPageNum}
      />
      <div className="overflow-hidden w-full">
        <ResponsiveAd />
      </div>
    </div>
  );
};
