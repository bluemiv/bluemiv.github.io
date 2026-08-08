import type { Metadata } from "next";

import type { ArticlePagination } from "./articlePagination";
import { getArticleArchivePagePath } from "./articlePagination";

const ARTICLE_ARCHIVE_TITLE = "기술 글";
const ARTICLE_ARCHIVE_DESCRIPTION =
  "개발 과정에서 만난 문제와 선택의 이유를 기술별로 분류한 기록입니다.";

function getArticleArchiveTitle(currentPage: number): string {
  return currentPage === 1
    ? ARTICLE_ARCHIVE_TITLE
    : `${ARTICLE_ARCHIVE_TITLE} ${currentPage}페이지`;
}

function getArticleArchiveDescription(currentPage: number): string {
  return currentPage === 1
    ? ARTICLE_ARCHIVE_DESCRIPTION
    : `개발 과정에서 만난 문제와 선택의 이유를 기술별로 분류한 기록의 ${currentPage}페이지입니다.`;
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
    openGraph: {
      type: "website",
      locale: "ko_KR",
      url: canonical,
      title,
      description,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}
