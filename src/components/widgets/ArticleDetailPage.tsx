import type { PropsWithChildren } from "react";

import Link from "next/link";

import { Container } from "@/components/atoms/Container";
import { EntryTagList } from "@/components/atoms/EntryTagList";
import { AdjacentEntryNavigation } from "@/components/widgets/AdjacentEntryNavigation";
import { ArticleDetailHeader } from "@/components/widgets/ArticleDetailHeader";
import { ArticleDetailSidebar } from "@/components/widgets/ArticleDetailSidebar";
import { ArticleReadingRuler } from "@/components/widgets/ArticleReadingRuler";
import { ArticleTableOfContents } from "@/components/widgets/ArticleTableOfContents";
import { PageTransition } from "@/components/widgets/PageTransition";
import { AdSenseScript } from "@/features/adsense/AdSenseScript";
import type { ArticleHeading } from "@/features/article/articleDocument";
import type { ArticleMetadata } from "@/features/article/articleMetadata";
import type { ArticleNavigation } from "@/features/article/articleNavigation";
import { ArticleReadingProvider } from "@/features/article/ArticleReadingProvider";
import { getArticleCategoryLabel, getArticleTopicLabel } from "@/features/article/articleTaxonomy";
import { getLocalizedPath, type Locale } from "@/features/i18n/localeConfig";
import { ARTICLE_DETAIL_COPY } from "@/features/i18n/translations";
import { NAVIGATION_TRANSITION_TYPES } from "@/features/navigation/navigationTransition";
import { SearchDocumentMetadata } from "@/features/search/SearchDocumentMetadata";
import { getTagLabel } from "@/features/tag/tagRegistry";

type PropsWithArticleDetailPage = PropsWithChildren<{
  article: ArticleMetadata;
  headings: readonly ArticleHeading[];
  readingTimeMinutes: number;
  navigation: ArticleNavigation;
}>;

function getArticlePath(locale: Locale, slug: string): string {
  return getLocalizedPath(locale, `articles/${slug}`);
}

export function ArticleDetailPage({
  article,
  headings,
  readingTimeMinutes,
  navigation,
  children,
}: PropsWithArticleDetailPage) {
  const categoryLabel = getArticleCategoryLabel(article.category);
  const copy = ARTICLE_DETAIL_COPY[article.locale];
  const hasTaxonomyArchives = article.locale === "ko";

  return (
    <ArticleReadingProvider headings={headings}>
      <PageTransition>
        <AdSenseScript />
        <ArticleReadingRuler headings={headings} />
        <Container className="py-12 md:py-20">
          <article aria-labelledby="article-title" data-pagefind-filter="type:article">
            <ArticleDetailHeader article={article} readingTimeMinutes={readingTimeMinutes} />

            <div className="mt-6 grid items-start gap-16 md:mt-8 xl:grid-cols-[minmax(0,760px)_300px] xl:gap-[60px]">
              <div className="max-w-[760px] min-w-0">
                <ArticleTableOfContents headings={headings} variant="mobile" />

                <div id="article-body" className="article-body mt-12 xl:mt-0" data-pagefind-body>
                  <SearchDocumentMetadata
                    category={categoryLabel}
                    description={article.description}
                    publishedAt={article.publishedAt}
                    tags={article.tags}
                    title={article.title}
                    topics={article.topics.map(getArticleTopicLabel)}
                  />
                  {children}
                </div>

                <EntryTagList
                  className="mt-16"
                  label={copy.tagLabel}
                  tags={article.tags.map((tag) => ({
                    href: hasTaxonomyArchives
                      ? getLocalizedPath(article.locale, `tags/${tag}`)
                      : undefined,
                    label: getTagLabel(tag),
                  }))}
                />

                {navigation.relatedArticles.length ? (
                  <section
                    className="border-border mt-20 border-t pt-8"
                    aria-labelledby="related-title"
                  >
                    <div className="flex items-end justify-between gap-6">
                      <div>
                        <p className="text-accent font-mono text-xs tracking-[0.16em] uppercase">
                          {copy.relatedEyebrow}
                        </p>
                        <h2
                          id="related-title"
                          className="mt-2 text-2xl font-semibold tracking-[-0.03em]"
                        >
                          {copy.relatedTitle}
                        </h2>
                      </div>
                      <span className="text-muted hidden font-mono text-xs uppercase sm:block">
                        {getArticleCategoryLabel(article.category)} /{" "}
                        {getArticleTopicLabel(article.topics[0])}
                      </span>
                    </div>
                    <ol className="mt-6">
                      {navigation.relatedArticles.map((relatedArticle, index) => (
                        <li
                          key={relatedArticle.id}
                          className="border-border border-t first:border-t-0"
                        >
                          <Link
                            href={getArticlePath(article.locale, relatedArticle.slug)}
                            transitionTypes={NAVIGATION_TRANSITION_TYPES.swap}
                            className="group grid grid-cols-[32px_minmax(0,1fr)_auto] gap-3 py-5"
                          >
                            <span className="text-subtle pt-1 font-mono text-xs">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="group-hover:text-accent text-base font-semibold transition-colors md:text-lg">
                              {relatedArticle.title}
                            </span>
                            <span
                              aria-hidden="true"
                              className="text-muted transition-transform group-hover:translate-x-1"
                            >
                              →
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ol>
                  </section>
                ) : null}

                <AdjacentEntryNavigation
                  ariaLabel={copy.adjacentLabel}
                  className="mt-16"
                  previous={
                    navigation.olderArticle
                      ? {
                          href: getArticlePath(article.locale, navigation.olderArticle.slug),
                          label: copy.previousLabel,
                          title: navigation.olderArticle.title,
                        }
                      : null
                  }
                  next={
                    navigation.newerArticle
                      ? {
                          href: getArticlePath(article.locale, navigation.newerArticle.slug),
                          label: copy.nextLabel,
                          title: navigation.newerArticle.title,
                        }
                      : null
                  }
                />
              </div>

              <ArticleDetailSidebar
                articleId={article.id}
                category={article.category}
                headings={headings}
                locale={article.locale}
                topics={article.topics}
              />
            </div>
          </article>
        </Container>
      </PageTransition>
    </ArticleReadingProvider>
  );
}
