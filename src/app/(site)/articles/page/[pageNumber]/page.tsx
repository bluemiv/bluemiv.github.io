import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticlesArchivePage } from "@/components/widgets/ArticlesArchivePage";
import { getArticleArchiveMetadata } from "@/features/article/articleArchiveSeo";
import { summarizeArticleTaxonomy } from "@/features/article/articleCollection";
import {
  getArticleArchiveStaticParams,
  paginateArticles,
  parseArticleArchivePageNumber,
} from "@/features/article/articlePagination";
import { getPublishedArticles } from "@/features/article/articleRepository";

const ARTICLE_LOCALE = "ko";

export const dynamicParams = false;

function getArticleArchivePage(pageNumberParam: string) {
  const pageNumber = parseArticleArchivePageNumber(pageNumberParam);

  if (pageNumber === null || pageNumber === 1) notFound();

  const articles = getPublishedArticles(ARTICLE_LOCALE);
  const pagination = paginateArticles(articles, pageNumber);

  if (!pagination) notFound();

  return { articles, pagination };
}

export function generateStaticParams() {
  return getArticleArchiveStaticParams(getPublishedArticles(ARTICLE_LOCALE).length);
}

export async function generateMetadata({
  params,
}: PageProps<"/articles/page/[pageNumber]">): Promise<Metadata> {
  const { pageNumber } = await params;
  return getArticleArchiveMetadata(ARTICLE_LOCALE, getArticleArchivePage(pageNumber).pagination);
}

export default async function PaginatedArticlesPage({
  params,
}: PageProps<"/articles/page/[pageNumber]">) {
  const { pageNumber } = await params;
  const { articles, pagination } = getArticleArchivePage(pageNumber);
  const taxonomy = summarizeArticleTaxonomy(articles);

  return (
    <ArticlesArchivePage
      activeCategory={null}
      activeTopic={null}
      articles={pagination.articles}
      locale={ARTICLE_LOCALE}
      pagination={pagination}
      taxonomy={taxonomy}
      totalArticleCount={articles.length}
    />
  );
}
