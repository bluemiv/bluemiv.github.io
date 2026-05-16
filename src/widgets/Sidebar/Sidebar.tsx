import { RSSLink } from '@/features/post/components';
import { ProfileSection } from '@/widgets/Sidebar/ProfileSection';
import { CategorySection } from './CategorySection';
import { TagSection } from './TagSection';

export default function Sidebar() {
  return (
    <aside className="min-w-[264px] w-[264px] hidden lg:flex px-md py-lg sticky top-[50px] left-0 overflow-x-hidden border-r border-app-border dark:border-app-dark-border h-[calc(100vh-50px)] overflow-hidden hover:overflow-y-auto flex-col gap-lg bg-app-bg dark:bg-app-dark-bg [scrollbar-gutter:stable]">
      <ProfileSection />
      <CategorySection />
      <TagSection />
      <div className="mt-auto pt-md border-t border-app-border dark:border-app-dark-border flex items-center justify-end gap-sm">
        <RSSLink />
      </div>
    </aside>
  );
}
