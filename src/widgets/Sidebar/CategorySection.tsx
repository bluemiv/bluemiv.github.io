import Link from 'next/link';
import { ROUTE_PATH } from '@/shared/constants/route';
import { getCategories } from '@/entities/post/api';
import SectionTitle from '@/widgets/Sidebar/SectionTitle';

export default function CategorySection() {
  const categories = getCategories();
  return (
    <section>
      <SectionTitle>Category</SectionTitle>
      <ul className="flex flex-col">
        {categories.map((entry) => {
          const category = entry[0];
          const count = entry[1];
          return (
            <li key={category}>
              <Link
                className="capitalize hover:text-app-primary dark:hover:text-app-dark-primary flex items-center px-sm h-[36px] hover:bg-app-sub-bg dark:hover:bg-app-dark-sub-bg rounded"
                href={[ROUTE_PATH.BLOG_CATEGORY, encodeURIComponent(category), '1'].join('/')}
              >
                {category}
                <span className="ml-sm text-sm text-app-sub-text dark:text-app-dark-sub-text">
                  ({count})
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
