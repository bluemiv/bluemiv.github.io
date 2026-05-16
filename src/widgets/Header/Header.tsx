import { Home, NotebookText } from 'lucide-react';

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

export default function Header() {
  const shortPostsLength = getAllShortPosts().length;
  const searchPosts: HeaderSearchPost[] = getAllPosts().map((post) => ({
    category: post.metadata.category,
    createdAt: post.metadata.createdAt,
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
        <ul className="flex-1 flex justify-end gap-xs">
          {[
            // { href: ROUTE_PATH.ABOUT, label: 'ABOUT' },
            { href: ROUTE_PATH.ROOT, label: 'HOME', Icon: Home },
            { href: [ROUTE_PATH.BLOG_SHORT, shortPostsLength].join('/'), label: '짧은 글', Icon: NotebookText },
            // { href: ROUTE_PATH.BLOG_TAGS, label: 'TAGS' },
          ].map(({ href, label, Icon }) => (
            <li key={href}>
              <NavLink href={href}>
                <Icon size={15} strokeWidth={2.2} />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-xs rounded-full border border-app-border dark:border-app-dark-border bg-app-surface-muted/70 dark:bg-app-dark-surface-muted/70 p-1">
          <HeaderSearch posts={searchPosts} />
          <RefreshServiceWorkerCacheButton />
          <ThemeToggleButton />
        </div>
      </nav>
    </HeaderVisibility>
  );
}
