import Link from "next/link";

import { AdSenseSlot } from "@/features/adsense/AdSenseSlot";
import type { ArticleCategorySummary } from "@/features/article/articleCollection";
import {
  getArticleCategoryLabel,
  getArticleTopicLabel,
  type ArticleCategory,
  type ArticleTopic,
} from "@/features/article/articleTaxonomy";
import { getLocalizedPath, type Locale } from "@/features/i18n/localeConfig";
import { NAVIGATION_TRANSITION_TYPES } from "@/features/navigation/navigationTransition";

import { ArticleTaxonomyAccordion } from "./ArticleTaxonomyAccordion";

type PropsWithArticleTaxonomyNavigation = {
  activeCategory: ArticleCategory | null;
  activeTopic: ArticleTopic | null;
  locale: Locale;
  taxonomy: readonly ArticleCategorySummary[];
  totalArticleCount: number;
};

type ArticleTaxonomyNavigationItem = {
  href: string;
  label: string;
  count: number;
  isActive: boolean;
};

function getCategoryPath(locale: Locale, category: ArticleCategory): string {
  return getLocalizedPath(locale, `categories/${category}`);
}

function getTopicPath(locale: Locale, topic: ArticleTopic): string {
  return getLocalizedPath(locale, `topics/${topic}`);
}

function getMobileItems({
  activeCategory,
  activeTopic,
  locale,
  taxonomy,
  totalArticleCount,
}: PropsWithArticleTaxonomyNavigation): ArticleTaxonomyNavigationItem[] {
  const allItem = {
    href: getLocalizedPath(locale, "articles"),
    label: "All articles",
    count: totalArticleCount,
    isActive: activeCategory === null && activeTopic === null,
  };
  const categoryItems = taxonomy.flatMap((categorySummary) => {
    const categoryLabel = getArticleCategoryLabel(categorySummary.category);
    const categoryItem = {
      href: getCategoryPath(locale, categorySummary.category),
      label: categoryLabel,
      count: categorySummary.count,
      isActive: activeCategory === categorySummary.category && activeTopic === null,
    };
    const topicItems = categorySummary.topics.map(({ topic, count }) => ({
      href: getTopicPath(locale, topic),
      label: `${categoryLabel} / ${getArticleTopicLabel(topic)}`,
      count,
      isActive: topic === activeTopic,
    }));

    return [categoryItem, ...topicItems];
  });
  const items = [allItem, ...categoryItems];
  const activeCategoryItem = categoryItems.find(
    (item) => item.href === (activeCategory ? getCategoryPath(locale, activeCategory) : ""),
  );
  const activeTopicItem = categoryItems.find((item) => item.isActive);
  const priorityItems = [allItem, activeCategoryItem, activeTopicItem].filter(
    (item): item is ArticleTaxonomyNavigationItem => Boolean(item),
  );
  const priorityHrefs = new Set(priorityItems.map(({ href }) => href));

  return [...priorityItems, ...items.filter(({ href }) => !priorityHrefs.has(href))];
}

export function MobileTaxonomyIndex(props: PropsWithArticleTaxonomyNavigation) {
  const items = getMobileItems(props);

  return (
    <nav className="border-border border-b pb-6 xl:hidden" aria-labelledby="mobile-taxonomy-title">
      <h2
        id="mobile-taxonomy-title"
        className="text-muted mb-3 font-mono text-xs tracking-[0.16em] uppercase"
      >
        Browse by category
      </h2>
      <ul className="flex [scrollbar-width:none] gap-2 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden">
        {items.map((item) => (
          <li key={item.href} className="shrink-0">
            <Link
              href={item.href}
              transitionTypes={NAVIGATION_TRANSITION_TYPES.swap}
              aria-current={item.isActive ? "page" : undefined}
              className={`inline-flex min-h-11 items-center gap-2 border-b px-2 text-sm whitespace-nowrap transition-colors ${
                item.isActive
                  ? "border-accent text-accent font-semibold"
                  : "text-muted hover:text-foreground border-transparent"
              }`}
            >
              <span>{item.label}</span>
              <span className="text-muted font-mono text-xs tabular-nums">{item.count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function ArticleSidebar({
  activeCategory,
  activeTopic,
  locale,
  taxonomy,
  totalArticleCount,
}: PropsWithArticleTaxonomyNavigation) {
  const topicCount = taxonomy.reduce((count, category) => count + category.topics.length, 0);

  return (
    <aside className="hidden w-[300px] xl:block" aria-label="글 분류와 광고">
      <nav aria-labelledby="taxonomy-title">
        <div className="border-border flex items-end justify-between border-b pb-4">
          <h2 id="taxonomy-title" className="text-xs font-bold tracking-[0.08em] uppercase">
            Browse articles
          </h2>
          <span className="text-muted font-mono text-xs tabular-nums">
            {String(topicCount).padStart(2, "0")} TOPICS
          </span>
        </div>

        <Link
          href={getLocalizedPath(locale, "articles")}
          transitionTypes={NAVIGATION_TRANSITION_TYPES.swap}
          aria-current={activeCategory === null && activeTopic === null ? "page" : undefined}
          className={`border-border grid min-h-14 grid-cols-[28px_minmax(0,1fr)_auto_44px] items-center gap-3 border-b border-l-2 text-sm transition-colors duration-150 motion-reduce:transition-none ${
            activeCategory === null && activeTopic === null
              ? "border-l-accent text-accent font-semibold"
              : "text-muted hover:text-foreground border-l-transparent"
          }`}
        >
          <span className="text-subtle pl-3 font-mono text-xs">00</span>
          <span>All articles</span>
          <span className="text-muted font-mono text-xs tabular-nums">{totalArticleCount}</span>
          <span aria-hidden="true" className="size-11" />
        </Link>

        <ArticleTaxonomyAccordion
          key={`${activeCategory ?? "all"}:${activeTopic ?? "all"}`}
          activeCategory={activeCategory}
          activeTopic={activeTopic}
          locale={locale}
          taxonomy={taxonomy}
        />
      </nav>

      <div className="mt-12">
        <AdSenseSlot format="sidebar" />
      </div>
    </aside>
  );
}
