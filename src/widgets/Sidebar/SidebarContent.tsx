import { RSSLink } from '@/features/post/components';
import { CategorySection } from '@/widgets/Sidebar/CategorySection';
import { ProfileSection } from '@/widgets/Sidebar/ProfileSection';
import { TagSection } from '@/widgets/Sidebar/TagSection';

export default function SidebarContent() {
  return (
    <>
      <ProfileSection />
      <CategorySection />
      <TagSection />
      <div className="mt-auto pt-md border-t border-app-border dark:border-app-dark-border flex items-center justify-end gap-sm">
        <RSSLink />
      </div>
    </>
  );
}
