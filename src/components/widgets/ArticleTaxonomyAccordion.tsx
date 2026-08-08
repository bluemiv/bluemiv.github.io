"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import type { ArticleCategorySummary } from "@/features/article/articleCollection";
import {
  getArticleCategoryLabel,
  getArticleTopicLabel,
  type ArticleCategory,
  type ArticleTopic,
} from "@/features/article/articleTaxonomy";
import { getLocalizedPath, type Locale } from "@/features/i18n/localeConfig";
import {
  NAVIGATION_TRANSITION_TYPES,
  type NavigationTransitionDirection,
} from "@/features/navigation/navigationTransition";

type PropsWithArticleTaxonomyAccordion = {
  activeCategory: ArticleCategory | null;
  activeTopic: ArticleTopic | null;
  locale: Locale;
  taxonomy: readonly ArticleCategorySummary[];
  transitionDirection?: NavigationTransitionDirection;
};

function getCategoryPath(locale: Locale, category: ArticleCategory): string {
  return getLocalizedPath(locale, `categories/${category}`);
}

function getTopicPath(locale: Locale, topic: ArticleTopic): string {
  return getLocalizedPath(locale, `topics/${topic}`);
}

export function ArticleTaxonomyAccordion({
  activeCategory,
  activeTopic,
  locale,
  taxonomy,
  transitionDirection = "swap",
}: PropsWithArticleTaxonomyAccordion) {
  const [expandedCategory, setExpandedCategory] = useState<ArticleCategory | null>(activeCategory);

  function toggleCategory(category: ArticleCategory) {
    setExpandedCategory((currentCategory) => (currentCategory === category ? null : category));
  }

  return (
    <ol>
      {taxonomy.map((categorySummary, categoryIndex) => {
        const categoryLabel = getArticleCategoryLabel(categorySummary.category);
        const isCategoryActive = categorySummary.category === activeCategory;
        const isExpanded = expandedCategory === categorySummary.category;
        const topicListId = `article-category-topics-${categorySummary.category}`;

        return (
          <li key={categorySummary.category} className="border-border border-b">
            <div
              className={`grid min-h-14 grid-cols-[28px_minmax(0,1fr)_auto_44px] items-center gap-3 border-l-2 transition-colors duration-150 motion-reduce:transition-none ${
                isCategoryActive ? "border-l-accent" : "border-l-transparent"
              }`}
            >
              <span className="text-subtle pl-3 font-mono text-xs">
                C{String(categoryIndex + 1).padStart(2, "0")}
              </span>
              <Link
                href={getCategoryPath(locale, categorySummary.category)}
                transitionTypes={NAVIGATION_TRANSITION_TYPES[transitionDirection]}
                aria-current={isCategoryActive && activeTopic === null ? "page" : undefined}
                className={`flex min-h-14 min-w-0 items-center text-sm transition-colors duration-150 motion-reduce:transition-none ${
                  isCategoryActive
                    ? "text-foreground font-semibold"
                    : "text-muted hover:text-foreground"
                }`}
              >
                <span className="truncate">{categoryLabel}</span>
              </Link>
              <span className="text-muted font-mono text-xs tabular-nums">
                {categorySummary.count}
              </span>
              <button
                type="button"
                aria-controls={topicListId}
                aria-expanded={isExpanded}
                aria-label={`${isExpanded ? "Collapse" : "Expand"} ${categoryLabel} topics`}
                onClick={() => toggleCategory(categorySummary.category)}
                className="text-muted hover:bg-surface-muted hover:text-foreground focus-visible:outline-accent flex size-11 items-center justify-center transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-[-2px] motion-reduce:transition-none"
              >
                <ChevronDown
                  aria-hidden="true"
                  className={`size-4 transition-transform duration-200 ease-out motion-reduce:transition-none ${
                    isExpanded ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
            </div>

            <ol id={topicListId} hidden={!isExpanded} className="border-border border-t">
              {categorySummary.topics.map(({ topic, count }, topicIndex) => {
                const isTopicActive = topic === activeTopic;

                return (
                  <li key={topic} className="border-border border-b last:border-b-0">
                    <Link
                      href={getTopicPath(locale, topic)}
                      transitionTypes={NAVIGATION_TRANSITION_TYPES[transitionDirection]}
                      aria-current={isTopicActive ? "page" : undefined}
                      className={`grid min-h-11 grid-cols-[24px_minmax(0,1fr)_auto] items-center gap-3 border-l-2 py-2 pr-3 pl-10 text-sm transition-colors duration-150 motion-reduce:transition-none ${
                        isTopicActive
                          ? "border-l-accent text-accent font-semibold"
                          : "text-muted hover:text-foreground border-l-transparent"
                      }`}
                    >
                      <span className="text-subtle font-mono text-xs">
                        {String(topicIndex + 1).padStart(2, "0")}
                      </span>
                      <span className="truncate">{getArticleTopicLabel(topic)}</span>
                      <span className="text-muted font-mono text-xs tabular-nums">{count}</span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </li>
        );
      })}
    </ol>
  );
}
