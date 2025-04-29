import { getTags } from '@/entities/post/api';
import { TagLink } from '@/features/tag/ui';
import SectionTitle from '@/widgets/Sidebar/SectionTitle';

export const TagSection = () => {
  const tags = getTags();
  return (
    <section>
      <SectionTitle>Tags</SectionTitle>
      <ul className="flex gap-sm flex-wrap">
        {tags.map((entry) => {
          const tag = entry[0];
          return <TagLink key={tag} tag={tag} />;
        })}
      </ul>
    </section>
  );
};
