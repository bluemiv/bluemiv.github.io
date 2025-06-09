import { getCategories } from '@/entities/post/api';
import SectionTitle from '@/widgets/Sidebar/SectionTitle';
import { CategoryItem } from './CategoryItem';

export const CategorySection = () => {
  const categories = getCategories();
  const categoriesMap: Record<string, number> = categories.reduce(
    (acc, [key, value]) => ({ ...acc, [key]: value }),
    {},
  );
  return (
    <section>
      <SectionTitle>Category</SectionTitle>
      <ul className="flex flex-col">
        <CategoryItem
          label="Language"
          category="language"
          count={categoriesMap['language'] ?? 0}
          isNotLink
        />
        <li>
          <ul className="flex flex-col">
            {[
              { label: 'JavaScript', category: 'javascript' },
              { label: 'Go', category: 'go' },
            ].map(({ label, category }) => (
              <CategoryItem
                isSubList
                key={category}
                label={label}
                category={category}
                count={categoriesMap[category]}
              />
            ))}
          </ul>
        </li>
        <CategoryItem label="Web" category="web" count={categoriesMap['web']} />
        <li>
          <ul className="flex flex-col">
            {[
              { label: 'React', category: 'react' },
              { label: 'Next.js', category: 'nextjs' },
            ].map(({ label, category }) => (
              <CategoryItem
                isSubList
                key={category}
                label={label}
                category={category}
                count={categoriesMap[category]}
              />
            ))}
          </ul>
        </li>
        <CategoryItem label="Algorithm" category="algorithm" count={categoriesMap['algorithm']} />
      </ul>
    </section>
  );
};
