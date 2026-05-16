import { ReactNode } from 'react';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { getAllShortPosts, getCategories } from '@/features/post/api';
import { GridPostCard, Pagination } from '@/features/post/components';
import { Post, ShortPost } from '@/features/post/model';
import { ResponsiveAd } from '@/shared/components';
import { ROUTE_PATH } from '@/shared/constants/route';
import { Sidebar } from '@/widgets/Sidebar';

interface Props {
  mainAreaTitle?: ReactNode;
  posts: Post[];
  currentPageNum: number;
  totalPageNum: number;
}

export const BlogHomeLayout = ({ mainAreaTitle, posts, currentPageNum, totalPageNum }: Props) => {
  const isHome = !mainAreaTitle && currentPageNum === 1;
  const featuredPost = isHome ? posts[0] : null;
  const recentPosts = featuredPost ? posts.slice(1) : posts;
  const categories = isHome ? getCategories() : [];
  const shortPosts = isHome ? getAllShortPosts().slice(0, 4) : [];

  return (
    <div className="flex items-start justify-start w-full">
      <Sidebar />
      <div className="w-full md:w-[calc(100%-280px)]">
        <main className="max-w-[1280px] p-md lg:p-xl mx-auto w-full flex flex-col gap-xl justify-start items-start">
          {isHome && <HomeIntro />}
          {featuredPost && <FeaturedPostCard post={featuredPost} />}
          {isHome && categories.length > 0 && <CategoryStrip categories={categories} />}
          {mainAreaTitle ? (
            <header className="w-full flex flex-col gap-xs">
              <p className="text-sm font-semibold text-app-primary dark:text-app-dark-primary">
                Archive
              </p>
              <h1 className="font-bold text-2xl md:text-3xl text-app-text dark:text-app-dark-text">
                {mainAreaTitle}
              </h1>
            </header>
          ) : (
            <div id="recent-posts">
              <SectionHeader
                title="최근 글"
                description="새로 정리한 개발 기록과 문제 해결 노트입니다."
              />
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-md lg:gap-lg w-full">
            {recentPosts.map((post) => (
              <GridPostCard
                key={[post.metadata.category, post.metadata.slug].join('/')}
                className="min-h-[360px]"
                post={post}
              />
            ))}
          </div>
          {isHome && shortPosts.length > 0 && <ShortPostsPreview posts={shortPosts} />}
          <div className="overflow-hidden w-full">
            <ResponsiveAd />
          </div>
          <Pagination prefix="" currentPageNum={currentPageNum} totalPageNum={totalPageNum} />
        </main>
      </div>
    </div>
  );
};

const HomeIntro = () => {
  return (
    <section className="w-full rounded-xl border border-app-border dark:border-app-dark-border bg-app-surface dark:bg-app-dark-surface p-lg md:p-xl flex flex-col lg:flex-row lg:items-end justify-between gap-lg">
      <div className="flex flex-col gap-md max-w-[760px]">
        <div className="flex items-center gap-sm">
          <span className="h-2 w-2 rounded-full bg-app-primary dark:bg-app-dark-primary" />
          <span className="text-sm font-semibold text-app-primary dark:text-app-dark-primary">
            Bluemiv Tech Blog
          </span>
        </div>
        <div className="flex flex-col gap-sm">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight text-app-text dark:text-app-dark-text">
            개발 문제를 오래 읽기 좋게 정리합니다.
          </h1>
          <p className="text-base md:text-lg leading-8 text-app-text-muted dark:text-app-dark-text-muted">
            Java, Spring, React, Next.js, 알고리즘을 중심으로 실무에서 다시 찾게 되는
            기술 기록을 모읍니다.
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row lg:flex-col gap-sm lg:min-w-[240px]">
        <Link
          href={ROUTE_PATH.RSS}
          prefetch={false}
          className="h-11 px-md rounded-lg bg-app-primary dark:bg-app-dark-primary text-white dark:text-[#020617] font-semibold flex items-center justify-center transition-colors hover:bg-app-primary-hover dark:hover:bg-app-dark-primary-hover"
        >
          RSS 구독
        </Link>
        <Link
          href="#recent-posts"
          className="h-11 px-md rounded-lg border border-app-border dark:border-app-dark-border bg-app-surface-muted dark:bg-app-dark-surface-muted text-app-text-muted dark:text-app-dark-text-muted font-semibold flex items-center justify-center transition-colors hover:border-app-border-strong dark:hover:border-app-dark-border-strong hover:text-app-text dark:hover:text-app-dark-text"
        >
          최근 글 보기
        </Link>
      </div>
    </section>
  );
};

const FeaturedPostCard = ({ post }: { post: Post }) => {
  return (
    <Link
      href={[ROUTE_PATH.BLOG, post.metadata.category, post.metadata.slug].join('/')}
      className="group w-full overflow-hidden rounded-xl border border-app-border dark:border-app-dark-border bg-app-surface dark:bg-app-dark-surface transition-all duration-150 ease-out hover:border-app-border-strong dark:hover:border-app-dark-border-strong hover:-translate-y-0.5"
    >
      <article className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] min-h-[320px]">
        <div className="p-lg md:p-xl flex flex-col gap-lg">
          <div className="flex flex-wrap items-center gap-sm text-sm">
            <span className="rounded-full bg-app-primary-soft dark:bg-app-dark-primary-soft px-sm py-xs font-semibold text-app-primary dark:text-app-dark-primary">
              최신 글
            </span>
            <span className="text-app-text-subtle dark:text-app-dark-text-subtle">
              {post.metadata.category}
            </span>
            <span className="text-app-text-subtle dark:text-app-dark-text-subtle">
              {dayjs(post.metadata.createdAt).format('YYYY-MM-DD')}
            </span>
          </div>
          <div className="flex flex-col gap-md">
            <h2 className="text-2xl md:text-4xl font-bold leading-tight text-app-text dark:text-app-dark-text group-hover:text-app-primary dark:group-hover:text-app-dark-primary transition-colors">
              {post.metadata.title}
            </h2>
            <p className="text-base leading-8 text-app-text-muted dark:text-app-dark-text-muted line-clamp-3">
              {post.metadata.description}
            </p>
          </div>
          <div className="mt-auto flex flex-wrap gap-sm">
            {post.metadata.tags.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-app-surface-muted dark:bg-app-dark-surface-muted px-sm py-xs text-sm font-semibold text-app-text-muted dark:text-app-dark-text-muted"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
        <div className="relative min-h-[220px] bg-app-surface-muted dark:bg-app-dark-surface-muted overflow-hidden">
          {post.metadata.thumbnail ? (
            <Image
              src={post.metadata.thumbnail}
              alt={post.metadata.title}
              fill
              priority
              className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          ) : (
            <div className="h-full w-full p-lg flex items-end bg-[linear-gradient(135deg,#DBEAFE,#CFFAFE)] dark:bg-[linear-gradient(135deg,#172554,#164E63)]">
              <span className="text-6xl font-bold text-white/70 dark:text-white/20">
                {post.metadata.category.slice(0, 2).toUpperCase()}
              </span>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
};

const CategoryStrip = ({ categories }: { categories: [string, number][] }) => {
  return (
    <section className="w-full flex flex-col gap-md">
      <SectionHeader title="카테고리" description="관심 있는 주제로 바로 이동하세요." />
      <div className="w-full flex gap-sm overflow-x-auto pb-xs">
        {categories.map(([category, count]) => (
          <Link
            key={category}
            href={[ROUTE_PATH.BLOG_CATEGORY, category.toLowerCase(), '1'].join('/')}
            className="min-w-fit rounded-lg border border-app-border dark:border-app-dark-border bg-app-surface dark:bg-app-dark-surface px-md py-sm transition-colors hover:border-app-primary dark:hover:border-app-dark-primary"
          >
            <span className="font-semibold text-app-text dark:text-app-dark-text">{category}</span>
            <span className="ml-sm text-sm text-app-text-subtle dark:text-app-dark-text-subtle">
              {count}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

const ShortPostsPreview = ({ posts }: { posts: ShortPost[] }) => {
  return (
    <section className="w-full flex flex-col gap-md">
      <div className="flex items-end justify-between gap-md">
        <SectionHeader title="짧은 글" description="가볍게 남긴 생각과 작은 기록입니다." />
        <Link
          href={[ROUTE_PATH.BLOG_SHORT, posts[0].metadata.slug].join('/')}
          className="hidden sm:inline-flex text-sm font-semibold text-app-primary dark:text-app-dark-primary hover:underline"
        >
          모두 보기
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-md w-full">
        {posts.map((post) => (
          <ShortPostPreviewCard key={post.metadata.slug} post={post} />
        ))}
      </div>
    </section>
  );
};

const ShortPostPreviewCard = ({ post }: { post: ShortPost }) => {
  return (
    <Link
      href={[ROUTE_PATH.BLOG_SHORT, post.metadata.slug].join('/')}
      className="rounded-lg border border-app-border dark:border-app-dark-border bg-app-surface dark:bg-app-dark-surface p-md flex flex-col gap-sm min-h-[180px] transition-all duration-150 ease-out hover:border-app-border-strong dark:hover:border-app-dark-border-strong hover:-translate-y-0.5"
    >
      <div className="text-xs font-semibold text-app-text-subtle dark:text-app-dark-text-subtle">
        {dayjs(post.metadata.createdAt).format('YYYY-MM-DD')}
      </div>
      <h3 className="font-bold text-lg leading-7 text-app-text dark:text-app-dark-text line-clamp-2">
        {post.metadata.title}
      </h3>
      <p className="text-sm leading-6 text-app-text-muted dark:text-app-dark-text-muted line-clamp-2">
        {post.metadata.description}
      </p>
      <div className="mt-auto flex flex-wrap gap-xs">
        {post.metadata.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-app-surface-muted dark:bg-app-dark-surface-muted px-xs py-[2px] text-xs font-semibold text-app-text-subtle dark:text-app-dark-text-subtle"
          >
            #{tag}
          </span>
        ))}
      </div>
    </Link>
  );
};

const SectionHeader = ({ title, description }: { title: string; description: string }) => {
  return (
    <header className="flex flex-col gap-xs">
      <h2 className="text-xl md:text-2xl font-bold text-app-text dark:text-app-dark-text">
        {title}
      </h2>
      <p className="text-sm md:text-base text-app-text-muted dark:text-app-dark-text-muted">
        {description}
      </p>
    </header>
  );
};
