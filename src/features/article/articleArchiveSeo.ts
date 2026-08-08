import type { Metadata } from "next";

import { createWebsiteSocialMetadata } from "@/features/seo/socialMetadata";

import type { ArticlePagination } from "./articlePagination";
import { getArticleArchivePagePath } from "./articlePagination";

const ARTICLE_ARCHIVE_TITLE = "전체 글";
const ARTICLE_ARCHIVE_DESCRIPTION =
  "관심사와 경험, 문제를 해결하며 배운 내용을 주제별로 기록합니다.";

function getArticleArchiveTitle(currentPage: number): string {
  return currentPage === 1
    ? ARTICLE_ARCHIVE_TITLE
    : `${ARTICLE_ARCHIVE_TITLE} ${currentPage}페이지`;
}

function getArticleArchiveDescription(currentPage: number): string {
  return currentPage === 1
    ? ARTICLE_ARCHIVE_DESCRIPTION
    : `관심사와 경험, 문제를 해결하며 배운 기록의 ${currentPage}페이지입니다.`;
}

export function getArticleArchiveMetadata(locale: "ko", pagination: ArticlePagination): Metadata {
  const { currentPage, nextPage, previousPage } = pagination;
  const title = getArticleArchiveTitle(currentPage);
  const description = getArticleArchiveDescription(currentPage);
  const canonical = getArticleArchivePagePath(locale, currentPage);

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        ko: canonical,
        "x-default": canonical,
      },
    },
    pagination: {
      previous: previousPage ? getArticleArchivePagePath(locale, previousPage) : undefined,
      next: nextPage ? getArticleArchivePagePath(locale, nextPage) : undefined,
    },
    ...createWebsiteSocialMetadata({
      title,
      description,
      canonical,
      locale,
    }),
  };
}
