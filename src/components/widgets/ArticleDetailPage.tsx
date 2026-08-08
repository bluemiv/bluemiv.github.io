import type { PropsWithChildren } from "react";

import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/atoms/Container";
import { ArticleDetailSidebar } from "@/components/widgets/ArticleDetailSidebar";
import { ArticleTableOfContents } from "@/components/widgets/ArticleTableOfContents";
import { AdSenseScript } from "@/features/adsense/AdSenseScript";
import type { ArticleHeading } from "@/features/article/articleDocument";
import type { ArticleMetadata } from "@/features/article/articleMetadata";
import type { ArticleNavigation } from "@/features/article/articleNavigation";
import { getArticleTopicLabel } from "@/features/article/articleTopic";
import { getLocalizedPath } from "@/features/i18n/localeConfig";

type PropsWithArticleDetailPage = PropsWithChildren<{
  article: ArticleMetadata;
  headings: readonly ArticleHeading[];
  readingTimeMinutes: number;
  navigation: ArticleNavigation;
}>;

const DATE_FORMATTER = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "Asia/Seoul",
});

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

  return (
    <>
      <AdSenseScript />
      <Container className="py-12 md:py-20">
        <article aria-labelledby="article-title">
          <header className="max-w-[940px]">
            <Link
              href={getLocalizedPath("ko", "articles")}
              className="text-muted hover:text-accent inline-flex min-h-11 items-center font-mono text-xs tracking-[0.12em] uppercase transition-colors"
            >
              <span aria-hidden="true">←</span>
              <span className="ml-2">All articles</span>
            </Link>

            <div className="mt-8 flex items-center gap-4">
              <span className="bg-accent h-px w-8" aria-hidden="true" />
              <p className="text-accent font-mono text-xs font-semibold tracking-[0.16em] uppercase">
                <Link
                  href={getLocalizedPath("ko", `topics/${article.topic}`)}
                  className="hover:text-accent-hover underline-offset-4 hover:underline"
                >
                  {getArticleTopicLabel(article.topic)}
                </Link>{" "}
                / {article.id.replace("article-", "")}
              </p>
            </div>

            <h1
              id="article-title"
              className="mt-6 max-w-[900px] text-[2.5rem] leading-[1.14] font-semibold tracking-[-0.05em] text-balance md:text-[3.75rem]"
            >
              {article.title}
            </h1>
            <p className="text-muted mt-7 max-w-[780px] text-lg leading-8 text-pretty md:text-xl md:leading-9">
              {article.description}
            </p>

            <dl className="text-muted border-border mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t pt-5 text-xs">
              <div className="flex gap-2">
                <dt>작성</dt>
                <dd className="text-foreground">{article.author}</dd>
              </div>
              <div className="flex gap-2">
                <dt>발행</dt>
                <dd className="text-foreground">
                  <time dateTime={article.publishedAt}>
                    {DATE_FORMATTER.format(new Date(article.publishedAt))}
                  </time>
                </dd>
              </div>
              {hasModifiedDate ? (
                <div className="flex gap-2">
                  <dt>수정</dt>
                  <dd className="text-foreground">
                    <time dateTime={article.modifiedAt}>
                      {DATE_FORMATTER.format(new Date(article.modifiedAt))}
                    </time>
                  </dd>
                </div>
              ) : null}
              <div className="flex gap-2">
                <dt>읽기</dt>
                <dd className="text-foreground">{readingTimeMinutes}분</dd>
              </div>
            </dl>
          </header>

          {article.coverImage ? (
            <figure className="border-border bg-surface-muted relative mt-12 aspect-[16/8.5] max-w-[1120px] overflow-hidden rounded-[4px] border md:mt-16">
              <Image
                fill
                priority
                sizes="(min-width: 1184px) 1120px, calc(100vw - 40px)"
                src={article.coverImage}
                alt={`${article.title} 대표 이미지`}
                className="object-contain"
              />
            </figure>
          ) : null}

          <div className="mt-12 grid items-start gap-16 xl:mt-20 xl:grid-cols-[minmax(0,760px)_300px] xl:gap-[60px]">
            <div className="max-w-[760px] min-w-0">
              <ArticleTableOfContents headings={headings} variant="mobile" />

              <div className="article-body mt-12 xl:mt-0">{children}</div>

              {article.tags.length ? (
                <footer className="border-border mt-16 border-t pt-7">
                  <p className="text-muted text-micro font-mono tracking-[0.16em] uppercase">
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
                      <p className="text-accent text-micro font-mono tracking-[0.16em] uppercase">
                        Continue exploring
                      </p>
                      <h2
                        id="related-title"
                        className="mt-2 text-2xl font-semibold tracking-[-0.03em]"
                      >
                        같은 주제의 글
                      </h2>
                    </div>
                    <span className="text-muted text-micro hidden font-mono uppercase sm:block">
                      {article.topic}
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
                          className="group grid grid-cols-[32px_minmax(0,1fr)_auto] gap-3 py-5"
                        >
                          <span className="text-subtle text-micro pt-1 font-mono">
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
              topic={article.topic}
              headings={headings}
            />
          </div>
        </article>
      </Container>
    </>
  );
}
