import Link from "next/link";

import { Container } from "@/components/atoms/Container";
import { ArticleArchiveLayout } from "@/components/widgets/ArticleArchiveLayout";
import { ArticleSidebar, MobileTopicIndex } from "@/components/widgets/ArticleSidebar";
import { PageTransition } from "@/components/widgets/PageTransition";
import { PaginationNavigation } from "@/components/widgets/PaginationNavigation";
import { SITE_CONFIG } from "@/config/siteConfig";
import { AdSenseScript } from "@/features/adsense/AdSenseScript";
import { AdSenseSlot } from "@/features/adsense/AdSenseSlot";
import type { ArticleTopicSummary } from "@/features/article/articleCollection";
import type { ArticleMetadata } from "@/features/article/articleMetadata";
import {
  getArticleArchivePagePath,
  type ArticlePagination,
} from "@/features/article/articlePagination";
import { getArticleDocument } from "@/features/article/articleRepository";
import { getArticleTopicLabel } from "@/features/article/articleTopic";
import { getLocalizedPath, type Locale } from "@/features/i18n/localeConfig";
import { NAVIGATION_TRANSITION_TYPES } from "@/features/navigation/navigationTransition";

type PropsWithArticlesArchivePage = {
  activeTopic: string | null;
  articles: readonly ArticleMetadata[];
  locale: Locale;
  pagination: ArticlePagination | null;
  topics: readonly ArticleTopicSummary[];
  totalArticleCount: number;
};

type PropsWithArticleArchiveRow = {
  article: ArticleMetadata;
  locale: Locale;
};

const DATE_LOCALES: Record<Locale, string> = {
  ko: "ko-KR",
  en: "en-US",
  ja: "ja-JP",
};

function formatArticleDate(dateTime: string, locale: Locale): string {
  return new Intl.DateTimeFormat(DATE_LOCALES[locale], {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: SITE_CONFIG.timeZone,
  }).format(new Date(dateTime));
}

function getArticleNumber(id: string): string {
  return id.replace("article-", "").padStart(3, "0");
}

function ArticleArchiveRow({ article, locale }: PropsWithArticleArchiveRow) {
  const document = getArticleDocument(article.slug, locale);

  return (
    <article className="border-border border-b">
      <Link
        href={getLocalizedPath(locale, `articles/${article.slug}`)}
        transitionTypes={NAVIGATION_TRANSITION_TYPES.forward}
        className="article-list-link group grid grid-cols-[44px_minmax(0,1fr)] gap-x-3 gap-y-3 px-2 py-7 md:grid-cols-[44px_96px_minmax(0,1fr)_104px] md:items-start md:px-3"
      >
        <span className="text-subtle font-mono text-xs">A{getArticleNumber(article.id)}</span>
        <span className="text-accent font-mono text-xs font-semibold tracking-[0.06em] uppercase">
          {getArticleTopicLabel(article.topic)}
        </span>
        <span className="col-span-2 md:col-span-1">
          <strong className="article-list-title block text-lg leading-7 font-semibold tracking-[-0.025em] md:text-xl">
            {article.title}
          </strong>
          <span className="text-muted mt-2 line-clamp-2 block text-sm leading-6">
            {article.description}
          </span>
        </span>
        <span className="text-muted col-span-2 flex gap-3 font-mono text-xs tabular-nums md:col-span-1 md:block md:text-right">
          <time dateTime={article.publishedAt} className="block">
            {formatArticleDate(article.publishedAt, locale)}
          </time>
          {document ? <span className="mt-1 block">{document.readingTimeMinutes} MIN</span> : null}
        </span>
      </Link>
    </article>
  );
}

export function ArticlesArchivePage({
  activeTopic,
  articles,
  locale,
  pagination,
  topics,
  totalArticleCount,
}: PropsWithArticlesArchivePage) {
  const activeTopicLabel = activeTopic ? getArticleTopicLabel(activeTopic) : null;
  const topicNavigationProps = { activeTopic, locale, topics, totalArticleCount };
  const archiveArticleCount = pagination?.totalArticles ?? articles.length;

  return (
    <PageTransition>
      <AdSenseScript />
      <Container className="py-16 md:py-24">
        <header className="border-border max-w-[760px] border-b pb-12 md:pb-16">
          <p className="text-accent mb-5 font-mono text-xs font-bold tracking-[0.18em] uppercase">
            Articles / {activeTopicLabel ?? "Archive"}
            {pagination && pagination.currentPage > 1
              ? ` / P${String(pagination.currentPage).padStart(2, "0")}`
              : ""}
          </p>
          <div className="flex items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl font-semibold tracking-[-0.045em] text-balance break-keep sm:text-5xl md:text-6xl">
                {activeTopicLabel ? `${activeTopicLabel} 글` : "기술 글"}
              </h1>
              <p className="text-muted mt-6 max-w-[620px] text-base leading-8 break-keep md:text-lg">
                {activeTopicLabel
                  ? `${activeTopicLabel} 주제로 분류한 문제 해결 과정과 선택의 이유를 모았습니다.`
                  : "개발 과정에서 만난 문제와 선택의 이유를 기술별로 분류해 기록합니다."}
              </p>
            </div>
            <span className="text-muted hidden pb-2 font-mono text-xs tabular-nums sm:block">
              {String(archiveArticleCount).padStart(3, "0")} ENTRIES
            </span>
          </div>
        </header>

        <div className="mt-10 xl:mt-16">
          <ArticleArchiveLayout sidebar={<ArticleSidebar {...topicNavigationProps} />}>
            <MobileTopicIndex {...topicNavigationProps} />

            <section className="mt-10 xl:mt-0" aria-labelledby="article-list-title">
              <div className="border-border grid gap-3 border-b pb-4 sm:grid-cols-[1fr_auto] sm:items-end">
                <div>
                  <p className="motion-section-marker text-accent font-mono text-xs tracking-[0.16em] uppercase">
                    Latest first
                  </p>
                  <h2
                    id="article-list-title"
                    className="mt-2 text-sm font-bold tracking-[0.08em] uppercase"
                  >
                    {activeTopicLabel ? `${activeTopicLabel} articles` : "All articles"}
                  </h2>
                </div>
                <p className="text-muted text-sm">
                  {pagination
                    ? `최신 발행순 · 전체 ${pagination.totalArticles}개 중 ${pagination.firstArticleNumber}–${pagination.lastArticleNumber}`
                    : `최신 발행순 · ${articles.length}개`}
                </p>
              </div>

              {articles.length ? (
                <ol>
                  {articles.map((article, index) => (
                    <li key={article.id}>
                      <ArticleArchiveRow article={article} locale={locale} />
                      {index === 2 && articles.length > 3 ? (
                        <div className="xl:hidden">
                          <AdSenseSlot format="banner" />
                        </div>
                      ) : null}
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="border-border text-muted border-b py-14 text-sm leading-7">
                  이 주제에 공개된 글이 없습니다.
                </p>
              )}

              {pagination ? (
                <PaginationNavigation
                  currentPage={pagination.currentPage}
                  getPageHref={(pageNumber) => getArticleArchivePagePath(locale, pageNumber)}
                  label="전체 글 페이지"
                  totalPages={pagination.totalPages}
                />
              ) : null}
            </section>
          </ArticleArchiveLayout>
        </div>
      </Container>
    </PageTransition>
  );
}
