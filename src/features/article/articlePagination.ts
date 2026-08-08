import type { Locale } from "@/features/i18n/localeConfig";
import { getLocalizedPath } from "@/features/i18n/localeConfig";

import type { ArticleMetadata } from "./articleMetadata";

export const ARTICLE_ARCHIVE_PAGE_SIZE = 10;

export type ArticlePagination = {
  articles: ArticleMetadata[];
  currentPage: number;
  firstArticleNumber: number;
  lastArticleNumber: number;
  nextPage: number | null;
  previousPage: number | null;
  totalArticles: number;
  totalPages: number;
};

function assertNonNegativeInteger(value: number, name: string): void {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new RangeError(`${name} must be a non-negative safe integer`);
  }
}

function assertPositiveInteger(value: number, name: string): void {
  if (!Number.isSafeInteger(value) || value < 1) {
    throw new RangeError(`${name} must be a positive safe integer`);
  }
}

export function getArticleArchivePageNumbers(
  articleCount: number,
  pageSize = ARTICLE_ARCHIVE_PAGE_SIZE,
): number[] {
  assertNonNegativeInteger(articleCount, "articleCount");
  assertPositiveInteger(pageSize, "pageSize");

  const totalPages = Math.max(1, Math.ceil(articleCount / pageSize));
  return Array.from({ length: totalPages }, (_, index) => index + 1);
}

export function getArticleArchiveStaticParams(
  articleCount: number,
  pageSize = ARTICLE_ARCHIVE_PAGE_SIZE,
): Array<{ pageNumber: string }> {
  return getArticleArchivePageNumbers(articleCount, pageSize)
    .slice(1)
    .map((pageNumber) => ({ pageNumber: String(pageNumber) }));
}

export function parseArticleArchivePageNumber(value: string): number | null {
  if (!/^[1-9]\d*$/.test(value)) return null;

  const pageNumber = Number(value);
  return Number.isSafeInteger(pageNumber) ? pageNumber : null;
}

export function getArticleArchivePagePath(locale: Locale, pageNumber: number): string {
  assertPositiveInteger(pageNumber, "pageNumber");

  return getLocalizedPath(locale, pageNumber === 1 ? "articles" : `articles/page/${pageNumber}`);
}

export function paginateArticles(
  articles: readonly ArticleMetadata[],
  currentPage: number,
  pageSize = ARTICLE_ARCHIVE_PAGE_SIZE,
): ArticlePagination | null {
  assertPositiveInteger(pageSize, "pageSize");

  const totalArticles = articles.length;
  const totalPages = getArticleArchivePageNumbers(totalArticles, pageSize).length;

  if (!Number.isSafeInteger(currentPage) || currentPage < 1 || currentPage > totalPages) {
    return null;
  }

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedArticles = articles.slice(startIndex, startIndex + pageSize);

  return {
    articles: paginatedArticles,
    currentPage,
    firstArticleNumber: paginatedArticles.length ? startIndex + 1 : 0,
    lastArticleNumber: startIndex + paginatedArticles.length,
    nextPage: currentPage < totalPages ? currentPage + 1 : null,
    previousPage: currentPage > 1 ? currentPage - 1 : null,
    totalArticles,
    totalPages,
  };
}
