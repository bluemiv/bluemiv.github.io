import { AdSenseSlot } from "@/features/adsense/AdSenseSlot";
import type { ArticleCategorySummary } from "@/features/article/articleCollection";
import type { ArticleCategory, ArticleTopic } from "@/features/article/articleTaxonomy";
import type { Locale } from "@/features/i18n/localeConfig";

import { ArticleTaxonomyNavigation } from "./ArticleTaxonomyNavigation";

type PropsWithArticleSidebar = {
  activeCategory: ArticleCategory | null;
  activeTopic: ArticleTopic | null;
  locale: Locale;
  taxonomy: readonly ArticleCategorySummary[];
  totalArticleCount: number;
};

export function ArticleSidebar(props: PropsWithArticleSidebar) {
  return (
    <aside className="hidden w-[300px] xl:block" aria-label="글 분류와 광고">
      <ArticleTaxonomyNavigation {...props} />

      <div className="mt-12">
        <AdSenseSlot format="sidebar" />
      </div>
    </aside>
  );
}
