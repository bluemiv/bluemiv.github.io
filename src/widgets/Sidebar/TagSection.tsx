import { getTags } from '@/features/post/api';
import { TagLink } from '@/features/tag/components';
import SectionTitle from '@/widgets/Sidebar/SectionTitle';

export const TagSection = () => {
  const tags = getTags().slice(0, 18);
  return (
    <section className="px-xs">
      <div className="flex items-center justify-between">
        <SectionTitle>Tags</SectionTitle>
        <span className="mb-sm text-[11px] font-semibold text-app-text-subtle dark:text-app-dark-text-subtle">
          Top {tags.length}
        </span>
      </div>
      <ul className="flex gap-xs flex-wrap">
        {tags.map((entry) => {
          const tag = entry[0];
          const count = entry[1];
          return <TagLink key={tag} tag={tag} count={count} />;
        })}
      </ul>
    </section>
  );
};
