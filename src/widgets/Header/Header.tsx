import { Home, NotebookText, UserRound } from 'lucide-react';

import { getAllPosts, getAllShortPosts } from '@/features/post/api';
import RefreshServiceWorkerCacheButton from '@/features/serviceWorker/components/RefreshServiceWorkerCacheButton';
import { ThemeToggleButton } from '@/features/theme/components';
import { ROUTE_PATH } from '@/shared/constants/route';
import HeaderVisibility from '@/widgets/Header/HeaderVisibility';
import HeaderSearch, { type HeaderSearchPost } from '@/widgets/Header/HeaderSearch';
import Logo from '@/widgets/Header/Logo';
import NavLink from '@/widgets/Header/NavLink';
import MobileSidebarMenu from '@/widgets/Sidebar/MobileSidebarMenu';
import SidebarContent from '@/widgets/Sidebar/SidebarContent';

const formatSearchPostCreatedAt = (createdAt: unknown) => {
  if (createdAt instanceof Date) return createdAt.toISOString();
  return String(createdAt);
};

export default function Header() {
  const shortPostsLength = getAllShortPosts().length;
  const searchPosts: HeaderSearchPost[] = getAllPosts().map((post) => ({
    category: post.metadata.category,
    createdAt: formatSearchPostCreatedAt(post.metadata.createdAt),
    description: post.metadata.description,
    slug: post.metadata.slug,
    tags: post.metadata.tags,
    title: post.metadata.title,
  }));

  return (
    <HeaderVisibility>
      <nav className="w-full h-full mx-auto flex items-center justify-between gap-md">
        <Logo />
        <MobileSidebarMenu>
          <SidebarContent />
        </MobileSidebarMenu>
        <ul className="flex-1 flex justify-end gap-[2px] sm:gap-xs">
          {[
            { href: ROUTE_PATH.ROOT, label: 'HOME', Icon: Home },
            { href: ROUTE_PATH.ABOUT, label: 'ABOUT', Icon: UserRound },
            {
              href: [ROUTE_PATH.BLOG_SHORT, shortPostsLength].join('/'),
              label: '짧은 글',
              Icon: NotebookText,
            },
            // { href: ROUTE_PATH.BLOG_TAGS, label: 'TAGS' },
          ].map(({ href, label, Icon }) => (
            <li key={href}>
              <NavLink
                ariaLabel={label === 'HOME' ? '홈으로 이동' : `${label} 보기`}
                className="h-10 w-10 px-0 sm:px-0"
                href={href}
                title={label}
              >
                <Icon className="h-[1.375rem] w-[1.375rem]" strokeWidth={2.4} />
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-[2px] rounded-full border border-app-border bg-app-surface-muted/70 p-[3px] dark:border-app-dark-border dark:bg-app-dark-surface-muted/70 sm:gap-xs sm:p-1">
          <HeaderSearch posts={searchPosts} />
          <RefreshServiceWorkerCacheButton />
          <ThemeToggleButton />
        </div>
      </nav>
    </HeaderVisibility>
  );
}
