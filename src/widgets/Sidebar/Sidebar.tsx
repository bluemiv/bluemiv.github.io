import CategorySection from './CategorySection';
import TagSection from './TagSection';
import RSSLink from '@/features/post/ui/RSSLink';

export default function Sidebar() {
  return (
    <aside className="min-w-[280px] w-[280px] hidden md:flex p-md sticky top-[50px] left-0 overflow-x-hidden border-r border-app-sub-bg dark:border-app-dark-sub-bg h-[calc(100vh-50px)] hover:overscroll-y-auto flex-col gap-lg">
      <CategorySection />
      <TagSection />
      <div className="flex items-center gap-md">
        <RSSLink />
      </div>
    </aside>
  );
}
