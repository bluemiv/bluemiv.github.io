import { Fragment, type PropsWithChildren, ViewTransition } from "react";

import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/atoms/Container";
import { PublicationMetadata } from "@/components/atoms/PublicationMetadata";
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
import { getLocalizedPath } from "@/features/i18n/localeConfig";
import {
  formatApproximateReadingTime,
  formatPublicationDate,
} from "@/features/i18n/publicationMetadata";
import { PUBLICATION_METADATA_COPY } from "@/features/i18n/translations";
import { NAVIGATION_TRANSITION_TYPES } from "@/features/navigation/navigationTransition";

type PropsWithArticleDetailPage = PropsWithChildren<{
  article: ArticleMetadata;
  headings: readonly ArticleHeading[];
  readingTimeMinutes: number;
  navigation: ArticleNavigation;
}>;

function getArticlePath(slug: string): string {
  return getLocalizedPath("ko", `articles/${slug}`);
}

export function ArticleDetailPage({
  article,
  headings,
  readingTimeMinutes,
  navigation,
  children,
}: PropsWithArticleDetailPage) {
  const hasModifiedDate = article.modifiedAt !== article.publishedAt;
  const publicationLabels = PUBLICATION_METADATA_COPY[article.locale];
  const articleNumber = article.id.replace("article-", "");
  const categoryLabel = getArticleCategoryLabel(article.category);
  const primaryTopicLabel = getArticleTopicLabel(article.topics[0]);

  return (
    <ArticleReadingProvider headings={headings}>
      <PageTransition>
        <AdSenseScript />
        <ArticleReadingRuler headings={headings} />
        <Container className="py-12 md:py-20">
          <article aria-labelledby="article-title">
            <header className="max-w-[940px]">
              <Link
                href={getLocalizedPath("ko", "articles")}
                transitionTypes={NAVIGATION_TRANSITION_TYPES.back}
                className="text-muted hover:text-accent inline-flex min-h-11 items-center font-mono text-sm tracking-[0.1em] uppercase transition-colors"
              >
                <span aria-hidden="true">←</span>
                <span className="ml-2">All articles</span>
              </Link>

              <div className="mt-8 flex items-center gap-4">
                <span className="bg-accent h-px w-8" aria-hidden="true" />
                <p className="text-accent font-mono text-xs font-semibold tracking-[0.16em] uppercase">
                  <Link
                    href={getLocalizedPath("ko", `categories/${article.category}`)}
                    transitionTypes={NAVIGATION_TRANSITION_TYPES.back}
                    className="hover:text-accent-hover underline-offset-4 hover:underline"
                  >
                    {categoryLabel}
                  </Link>
                  <span aria-hidden="true"> / </span>
                  {article.topics.map((topic, index) => (
                    <Fragment key={topic}>
                      <Link
                        href={getLocalizedPath("ko", `topics/${topic}`)}
                        transitionTypes={NAVIGATION_TRANSITION_TYPES.back}
                        className="hover:text-accent-hover underline-offset-4 hover:underline"
                      >
                        {getArticleTopicLabel(topic)}
                      </Link>
                      {index < article.topics.length - 1 ? ", " : ""}
                    </Fragment>
                  ))}
                  <span aria-hidden="true"> / </span>
                  {articleNumber}
                </p>
              </div>

              <h1
                id="article-title"
                className="mt-6 max-w-[900px] text-4xl leading-[1.14] font-semibold tracking-[-0.05em] text-balance sm:text-5xl md:text-6xl"
              >
                {article.title}
              </h1>
              <p className="text-muted mt-7 max-w-[780px] text-lg leading-8 text-pretty md:text-xl md:leading-9">
                {article.description}
              </p>

              <PublicationMetadata
                author={article.author}
                labels={publicationLabels}
                publishedAt={{
                  dateTime: article.publishedAt,
                  text: formatPublicationDate(article.publishedAt, article.locale),
                }}
                modifiedAt={
                  hasModifiedDate
                    ? {
                        dateTime: article.modifiedAt,
                        text: formatPublicationDate(article.modifiedAt, article.locale),
                      }
                    : undefined
                }
                readingTime={{
                  minutes: readingTimeMinutes,
                  text: formatApproximateReadingTime(readingTimeMinutes, article.locale),
                }}
              />
            </header>

            {article.coverImage ? (
              <ViewTransition
                name={`article-cover-${article.id}`}
                default="none"
                share="article-cover"
              >
                <figure className="article-detail-cover border-border bg-surface-muted relative mt-12 aspect-[32/17] max-w-[1120px] overflow-hidden rounded-[4px] border md:mt-16">
                  <div className="article-detail-cover-media absolute inset-x-0 -top-[4%] h-[108%]">
                    <Image
                      fill
                      priority
                      sizes="(min-width: 1184px) 1120px, calc(100vw - 40px)"
                      src={article.coverImage}
                      alt={article.title}
                      className="object-cover"
                    />
                  </div>
                  <div
                    aria-hidden="true"
                    className="border-code-foreground/15 bg-code/80 text-code-foreground absolute inset-x-0 bottom-0 z-10 flex min-h-11 items-center justify-between gap-4 border-t px-4 py-2 font-mono text-xs backdrop-blur-sm sm:px-5"
                  >
                    <span className="text-accent font-semibold tracking-[0.1em] uppercase">
                      Article / A{articleNumber}
                    </span>
                    <span className="truncate text-right tracking-[0.06em] uppercase">
                      {categoryLabel} / {primaryTopicLabel}
                    </span>
                  </div>
                </figure>
              </ViewTransition>
            ) : null}

            <div className="mt-12 grid items-start gap-16 xl:mt-20 xl:grid-cols-[minmax(0,760px)_300px] xl:gap-[60px]">
              <div className="max-w-[760px] min-w-0">
                <ArticleTableOfContents headings={headings} variant="mobile" />

                <div id="article-body" className="article-body mt-12 xl:mt-0">
                  {children}
                </div>

                {article.tags.length ? (
                  <footer className="border-border mt-16 border-t pt-7">
                    <p className="text-muted font-mono text-xs tracking-[0.16em] uppercase">
                      Filed under
                    </p>
                    <ul className="text-muted mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                      {article.tags.map((tag) => (
                        <li key={tag}>#{tag}</li>
                      ))}
                    </ul>
                  </footer>
                ) : null}

                {navigation.relatedArticles.length ? (
                  <section
                    className="border-border mt-20 border-t pt-8"
                    aria-labelledby="related-title"
                  >
                    <div className="flex items-end justify-between gap-6">
                      <div>
                        <p className="text-accent font-mono text-xs tracking-[0.16em] uppercase">
                          Continue exploring
                        </p>
                        <h2
                          id="related-title"
                          className="mt-2 text-2xl font-semibold tracking-[-0.03em]"
                        >
                          같은 주제의 글
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
                            href={getArticlePath(relatedArticle.slug)}
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

                {navigation.olderArticle || navigation.newerArticle ? (
                  <nav
                    className="border-border mt-16 grid border-y sm:grid-cols-2"
                    aria-label="이전 글과 다음 글"
                  >
                    {navigation.olderArticle ? (
                      <Link
                        href={getArticlePath(navigation.olderArticle.slug)}
                        transitionTypes={NAVIGATION_TRANSITION_TYPES.back}
                        className="group py-7 sm:pr-7"
                      >
                        <span className="text-muted font-mono text-xs tracking-[0.12em] uppercase">
                          ← 이전 글
                        </span>
                        <span className="group-hover:text-accent mt-3 block text-sm leading-6 font-semibold transition-colors">
                          {navigation.olderArticle.title}
                        </span>
                      </Link>
                    ) : null}
                    {navigation.newerArticle ? (
                      <Link
                        href={getArticlePath(navigation.newerArticle.slug)}
                        transitionTypes={NAVIGATION_TRANSITION_TYPES.forward}
                        className={`border-border group py-7 sm:border-l sm:pl-7 sm:text-right ${
                          navigation.olderArticle ? "border-t sm:border-t-0" : "sm:col-start-2"
                        }`}
                      >
                        <span className="text-muted font-mono text-xs tracking-[0.12em] uppercase">
                          다음 글 →
                        </span>
                        <span className="group-hover:text-accent mt-3 block text-sm leading-6 font-semibold transition-colors">
                          {navigation.newerArticle.title}
                        </span>
                      </Link>
                    ) : null}
                  </nav>
                ) : null}
              </div>

              <ArticleDetailSidebar
                articleId={article.id}
                category={article.category}
                headings={headings}
                topics={article.topics}
              />
            </div>
          </article>
        </Container>
      </PageTransition>
    </ArticleReadingProvider>
  );
}
