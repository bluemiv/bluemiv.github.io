import Link from "next/link";

import { ArticleTableOfContents } from "@/components/widgets/ArticleTableOfContents";
import { AdSenseSlot } from "@/features/adsense/AdSenseSlot";
import type { ArticleHeading } from "@/features/article/articleDocument";
import {
  getArticleCategoryLabel,
  getArticleTopicLabel,
  type ArticleCategory,
  type ArticleTopic,
} from "@/features/article/articleTaxonomy";
import { getLocalizedPath } from "@/features/i18n/localeConfig";
import { NAVIGATION_TRANSITION_TYPES } from "@/features/navigation/navigationTransition";

type PropsWithArticleDetailSidebar = {
  articleId: string;
  category: ArticleCategory;
  headings: readonly ArticleHeading[];
  topics: readonly ArticleTopic[];
};

export function ArticleDetailSidebar({
  articleId,
  category,
  headings,
  topics,
}: PropsWithArticleDetailSidebar) {
  return (
    <aside className="hidden w-[300px] self-stretch xl:block" aria-label="글 정보와 목차">
      <section className="border-border border-b pb-5" aria-labelledby="article-context-title">
        <p className="text-accent font-mono text-xs tracking-[0.16em] uppercase">Article context</p>
        <h2 id="article-context-title" className="mt-3 text-lg font-semibold">
          <Link
            href={getLocalizedPath("ko", `categories/${category}`)}
            transitionTypes={NAVIGATION_TRANSITION_TYPES.back}
            className="hover:text-accent transition-colors"
          >
            {getArticleCategoryLabel(category)}
          </Link>
        </h2>
        <ul className="text-muted mt-3 flex flex-wrap gap-x-3 gap-y-2 text-sm">
          {topics.map((topic) => (
            <li key={topic}>
              <Link
                href={getLocalizedPath("ko", `topics/${topic}`)}
                transitionTypes={NAVIGATION_TRANSITION_TYPES.back}
                className="hover:text-accent underline-offset-4 hover:underline"
              >
                {getArticleTopicLabel(topic)}
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-muted mt-2 font-mono text-xs uppercase">
          {articleId.replace("article-", "Entry / ")}
        </p>
      </section>

      <div className="mt-10">
        <AdSenseSlot format="sidebar" />
      </div>

      <div className="sticky top-28 mt-14 max-h-[calc(100vh-8rem)] overflow-y-auto pb-6">
        <ArticleTableOfContents headings={headings} variant="desktop" />
      </div>
    </aside>
  );
}
