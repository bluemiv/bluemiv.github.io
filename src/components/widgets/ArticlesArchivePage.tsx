import { Container } from "@/components/atoms/Container";
import { ArticleArchiveLayout } from "@/components/widgets/ArticleArchiveLayout";
import { ArticleListRow } from "@/components/widgets/ArticleListRow";
import { ArticleSidebar } from "@/components/widgets/ArticleSidebar";
import { MobileArticleTaxonomyNavigation } from "@/components/widgets/ArticleTaxonomyNavigation";
import { PageTransition } from "@/components/widgets/PageTransition";
import { PaginationNavigation } from "@/components/widgets/PaginationNavigation";
import { AdSenseScript } from "@/features/adsense/AdSenseScript";
import { AdSenseSlot } from "@/features/adsense/AdSenseSlot";
import type { ArticleCategorySummary } from "@/features/article/articleCollection";
import type { ArticleMetadata } from "@/features/article/articleMetadata";
import {
  getArticleArchivePagePath,
  type ArticlePagination,
} from "@/features/article/articlePagination";
import {
  getArticleCategoryDefinition,
  getArticleTopicLabel,
  type ArticleCategory,
  type ArticleTopic,
} from "@/features/article/articleTaxonomy";
import type { Locale } from "@/features/i18n/localeConfig";

type PropsWithArticlesArchivePage = {
  activeCategory: ArticleCategory | null;
  activeTopic: ArticleTopic | null;
  articles: readonly ArticleMetadata[];
  locale: Locale;
  pagination: ArticlePagination | null;
  taxonomy: readonly ArticleCategorySummary[];
  totalArticleCount: number;
};

export function ArticlesArchivePage({
  activeCategory,
  activeTopic,
  articles,
  locale,
  pagination,
  taxonomy,
  totalArticleCount,
}: PropsWithArticlesArchivePage) {
  const activeCategoryDefinition = activeCategory
    ? getArticleCategoryDefinition(activeCategory)
    : null;
  const activeTopicLabel = activeTopic ? getArticleTopicLabel(activeTopic) : null;
  const activeLabel = activeTopicLabel ?? activeCategoryDefinition?.label ?? null;
  const taxonomyNavigationProps = {
    activeCategory,
    activeTopic,
    locale,
    taxonomy,
    totalArticleCount,
  };
  const archiveArticleCount = pagination?.totalArticles ?? articles.length;

  return (
    <PageTransition>
      <AdSenseScript />
      <Container className="py-16 md:py-24">
        <header className="border-border max-w-[760px] border-b pb-12 md:pb-16">
          <p className="text-accent mb-5 font-mono text-xs font-bold tracking-[0.18em] uppercase">
            Articles / {activeLabel ?? "Archive"}
            {pagination && pagination.currentPage > 1
              ? ` / P${String(pagination.currentPage).padStart(2, "0")}`
              : ""}
          </p>
          <div className="flex items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl font-semibold tracking-[-0.045em] text-balance break-keep sm:text-5xl md:text-6xl">
                {activeLabel ? `${activeLabel} 글` : "기술 글"}
              </h1>
              <p className="text-muted mt-6 max-w-[620px] text-base leading-8 break-keep md:text-lg">
                {activeTopicLabel
                  ? `${activeTopicLabel} 주제를 다룬 문제 해결 과정과 선택의 이유를 모았습니다.`
                  : (activeCategoryDefinition?.description ??
                    "개발 과정에서 만난 문제와 선택의 이유를 분야와 기술별로 분류해 기록합니다.")}
              </p>
            </div>
            <span className="text-muted hidden pb-2 font-mono text-xs tabular-nums sm:block">
              {String(archiveArticleCount).padStart(3, "0")} ENTRIES
            </span>
          </div>
        </header>

        <div className="mt-10 xl:mt-16">
          <ArticleArchiveLayout sidebar={<ArticleSidebar {...taxonomyNavigationProps} />}>
            <MobileArticleTaxonomyNavigation {...taxonomyNavigationProps} />

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
                    {activeLabel ? `${activeLabel} articles` : "All articles"}
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
                      <ArticleListRow article={article} locale={locale} />
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
                  이 분류에 공개된 글이 없습니다.
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
