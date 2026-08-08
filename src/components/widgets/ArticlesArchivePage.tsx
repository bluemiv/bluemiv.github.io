import { Container } from "@/components/atoms/Container";
import { SectionHeader } from "@/components/atoms/SectionHeader";
import { ArticleArchiveLayout } from "@/components/widgets/ArticleArchiveLayout";
import { ArticleList } from "@/components/widgets/ArticleList";
import { ArticleSidebar } from "@/components/widgets/ArticleSidebar";
import { MobileArticleTaxonomyNavigation } from "@/components/widgets/ArticleTaxonomyNavigation";
import { ArchivePageHeader } from "@/components/widgets/ArchivePageHeader";
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
        <ArchivePageHeader
          className="max-w-[760px]"
          eyebrow={
            <>
              Articles / {activeLabel ?? "Archive"}
              {pagination && pagination.currentPage > 1
                ? ` / P${String(pagination.currentPage).padStart(2, "0")}`
                : ""}
            </>
          }
          title={activeLabel ? `${activeLabel} 글` : "전체 글"}
          description={
            activeTopicLabel
              ? `${activeTopicLabel}에 관해 경험하고 배운 내용을 모았습니다.`
              : (activeCategoryDefinition?.description ??
                "관심사와 경험, 문제를 해결하며 배운 내용을 주제별로 기록합니다.")
          }
          entryCount={`${String(archiveArticleCount).padStart(3, "0")} ENTRIES`}
        />

        <div className="mt-10 xl:mt-16">
          <ArticleArchiveLayout sidebar={<ArticleSidebar {...taxonomyNavigationProps} />}>
            <MobileArticleTaxonomyNavigation {...taxonomyNavigationProps} />

            <section className="mt-10 xl:mt-0" aria-labelledby="article-list-title">
              <SectionHeader
                eyebrow="Latest first"
                heading={activeLabel ? `${activeLabel} articles` : "All articles"}
                headingId="article-list-title"
                trailing={
                  <p className="text-muted text-sm">
                    {pagination
                      ? `최신 발행순 · 전체 ${pagination.totalArticles}개 중 ${pagination.firstArticleNumber}–${pagination.lastArticleNumber}`
                      : `최신 발행순 · ${articles.length}개`}
                  </p>
                }
              />

              <ArticleList
                articles={articles}
                emptyMessage="이 분류에 공개된 글이 없습니다."
                insertAfter={
                  articles.length > 3
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
