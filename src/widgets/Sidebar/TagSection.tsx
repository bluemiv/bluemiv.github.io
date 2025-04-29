import { getTags } from '@/entities/post/api';
import { Tag } from '@/features/post/ui';
import SectionTitle from '@/widgets/Sidebar/SectionTitle';

export const TagSection = () => {
  const tags = getTags();
  return (
    <section>
      <SectionTitle>Tags</SectionTitle>
      <ul className="flex gap-sm flex-wrap">
        {tags.map((entry) => {
          const tag = entry[0];
          // const count = entry[1];
          return <Tag key={tag} tag={tag} />;
        })}
      </ul>
    </section>
  );
};
