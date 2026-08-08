import Link from "next/link";

import { SectionHeader } from "@/components/atoms/SectionHeader";
import { ArticleList } from "@/components/widgets/ArticleList";
import {
  ArticleTaxonomyNavigation,
  MobileArticleTaxonomyNavigation,
} from "@/components/widgets/ArticleTaxonomyNavigation";
import { AdSenseSlot } from "@/features/adsense/AdSenseSlot";
import type { ArticleCategorySummary } from "@/features/article/articleCollection";
import type { ArticleMetadata } from "@/features/article/articleMetadata";
import { getLocalizedPath, type Locale } from "@/features/i18n/localeConfig";
import type { HomeCopy } from "@/features/i18n/translations";
import { NAVIGATION_TRANSITION_TYPES } from "@/features/navigation/navigationTransition";

type PropsWithHomeArticlesSection = {
  articles: readonly ArticleMetadata[];
  copy: {
    latest: HomeCopy["latest"];
    topics: HomeCopy["topics"];
  };
  hasFeaturedArticle: boolean;
  locale: Locale;
  showAd: boolean;
  taxonomy: readonly ArticleCategorySummary[];
  totalArticleCount: number;
};

export function HomeArticlesSection({
  articles,
  copy,
  hasFeaturedArticle,
  locale,
  showAd,
  taxonomy,
  totalArticleCount,
}: PropsWithHomeArticlesSection) {
  const hasArticles = totalArticleCount > 0;

  return (
    <div
      id="latest-articles"
      className={`${hasFeaturedArticle ? "mt-20 md:mt-28" : ""} scroll-mt-24 ${taxonomy.length > 0 ? "xl:grid xl:grid-cols-[minmax(0,760px)_300px] xl:gap-[60px]" : "max-w-[760px]"}`}
    >
      <section aria-labelledby="latest-title">
        <SectionHeader
          description={copy.latest.description}
          eyebrow={copy.latest.eyebrow}
          heading={copy.latest.heading}
          headingId="latest-title"
          trailing={
            hasArticles ? (
              <Link
                className="text-accent hover:text-accent-hover inline-flex min-h-11 items-center text-sm font-bold transition-colors duration-150 motion-reduce:transition-none"
                href={getLocalizedPath(locale, "articles")}
                transitionTypes={NAVIGATION_TRANSITION_TYPES.forward}
              >
                {copy.latest.action} →
              </Link>
            ) : null
          }
        />

        {taxonomy.length > 0 ? (
          <MobileArticleTaxonomyNavigation
            activeCategory={null}
            activeTopic={null}
            heading={copy.topics.heading}
            isAllArticlesActive={false}
            locale={locale}
            taxonomy={taxonomy}
            totalArticleCount={totalArticleCount}
            transitionDirection="forward"
          />
        ) : null}

        <ArticleList
          articles={articles}
          emptyMessage={copy.latest.empty}
          insertAfter={
            showAd
              ? {
                  index: 2,
                  node: (
                    <div className="xl:hidden">
                      <AdSenseSlot format="banner" />
                    </div>
                  ),
                }
              : undefined
          }
          locale={locale}
        />
      </section>

      {taxonomy.length > 0 ? (
        <aside className="hidden xl:block" aria-label={copy.topics.heading}>
          <ArticleTaxonomyNavigation
            activeCategory={null}
            activeTopic={null}
            eyebrow={copy.topics.eyebrow}
            heading={copy.topics.heading}
            isAllArticlesActive={false}
            locale={locale}
            taxonomy={taxonomy}
            totalArticleCount={totalArticleCount}
            transitionDirection="forward"
          />

          {showAd ? (
            <div className="mt-12">
              <AdSenseSlot format="sidebar" />
            </div>
          ) : null}
        </aside>
      ) : null}
    </div>
  );
}
