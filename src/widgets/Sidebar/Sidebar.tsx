import { RSSLink } from '@/features/post/components';
import { ProfileSection } from '@/widgets/Sidebar/ProfileSection';
import { CategorySection } from './CategorySection';
import { TagSection } from './TagSection';

export default function Sidebar() {
  return (
    <aside className="motion-stagger relative min-w-[264px] w-[264px] hidden lg:flex px-md py-lg sticky top-[56px] left-0 overflow-x-hidden h-[calc(100vh-56px)] overflow-hidden hover:overflow-y-auto flex-col gap-xl bg-app-bg dark:bg-app-dark-bg [scrollbar-gutter:stable] before:pointer-events-none before:fixed before:left-[263px] before:top-0 before:bottom-0 before:w-px before:bg-app-border/80 dark:before:bg-app-dark-border/80">
      <ProfileSection />
      <CategorySection />
      <TagSection />
      <div className="mt-auto pt-md border-t border-app-border dark:border-app-dark-border flex items-center justify-end gap-sm">
        <RSSLink />
      </div>
    </aside>
  );
}
