import Link from "next/link";

import { ArticleTableOfContents } from "@/components/widgets/ArticleTableOfContents";
import { AdSenseSlot } from "@/features/adsense/AdSenseSlot";
import type { ArticleHeading } from "@/features/article/articleDocument";
import { getArticleNumber } from "@/features/article/articleIdentifier";
import {
  getArticleCategoryLabel,
  getArticleTopicLabel,
  type ArticleCategory,
  type ArticleTopic,
} from "@/features/article/articleTaxonomy";
import { getLocalizedPath, type Locale } from "@/features/i18n/localeConfig";
import { ARTICLE_DETAIL_COPY } from "@/features/i18n/translations";
import { NAVIGATION_TRANSITION_TYPES } from "@/features/navigation/navigationTransition";

type PropsWithArticleDetailSidebar = {
  articleId: string;
  category: ArticleCategory;
  headings: readonly ArticleHeading[];
  locale: Locale;
  topics: readonly ArticleTopic[];
};

export function ArticleDetailSidebar({
  articleId,
  category,
  headings,
  locale,
  topics,
}: PropsWithArticleDetailSidebar) {
  const copy = ARTICLE_DETAIL_COPY[locale];
  const hasTaxonomyArchives = locale === "ko";

  return (
    <aside className="hidden w-[300px] self-stretch xl:block" aria-label={copy.contextLabel}>
      <section aria-labelledby="article-context-title">
        <p className="text-accent font-mono text-xs tracking-[0.16em] uppercase">
          {copy.contextLabel}
        </p>
        <h2 id="article-context-title" className="mt-3 text-lg font-semibold">
          {hasTaxonomyArchives ? (
            <Link
              href={getLocalizedPath("ko", `categories/${category}`)}
              transitionTypes={NAVIGATION_TRANSITION_TYPES.back}
              className="hover:text-accent transition-colors"
            >
              {getArticleCategoryLabel(category)}
            </Link>
          ) : (
            getArticleCategoryLabel(category)
          )}
        </h2>
        <ul className="text-muted mt-3 flex flex-wrap gap-x-3 gap-y-2 text-sm">
          {topics.map((topic) => (
            <li key={topic}>
              {hasTaxonomyArchives ? (
                <Link
                  href={getLocalizedPath("ko", `topics/${topic}`)}
                  transitionTypes={NAVIGATION_TRANSITION_TYPES.back}
                  className="hover:text-accent underline-offset-4 hover:underline"
                >
                  {getArticleTopicLabel(topic)}
                </Link>
              ) : (
                getArticleTopicLabel(topic)
              )}
            </li>
          ))}
        </ul>
        <p className="text-muted mt-2 font-mono text-xs uppercase">
          {copy.entryLabel} / {getArticleNumber(articleId)}
        </p>
      </section>

      <div className="mt-8">
        <AdSenseSlot format="sidebar" />
      </div>

      <div className="article-toc-scroll sticky top-20 mt-10 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2 pb-6">
        <ArticleTableOfContents headings={headings} variant="desktop" />
      </div>
    </aside>
  );
}
