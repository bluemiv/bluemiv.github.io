import { describe, expect, it } from "vitest";

import type { ArticleMetadata } from "./articleMetadata";
import {
  getArticleArchivePageNumbers,
  getArticleArchivePagePath,
  getArticleArchiveStaticParams,
  paginateArticles,
  parseArticleArchivePageNumber,
} from "./articlePagination";

function createArticles(count: number): ArticleMetadata[] {
  return Array.from({ length: count }, (_, index) => {
    const articleNumber = String(index + 1).padStart(3, "0");

    return {
      id: `article-${articleNumber}`,
      slug: `article-${articleNumber}`,
      locale: "ko",
      topic: "nextjs",
      legacyPaths: [],
      title: `Article ${articleNumber}`,
      description: `Article ${articleNumber} description`,
      publishedAt: "2026-01-01T00:00:00+09:00",
      modifiedAt: "2026-01-01T00:00:00+09:00",
      tags: ["nextjs"],
      isPublished: true,
      author: "Bluemiv",
    };
  });
}

describe("articlePagination", () => {
  it("article을 지정한 크기로 나누고 이전·다음과 표시 범위를 계산한다", () => {
    const pagination = paginateArticles(createArticles(23), 2, 10);

    expect(pagination).toMatchObject({
      currentPage: 2,
      firstArticleNumber: 11,
      lastArticleNumber: 20,
      previousPage: 1,
      nextPage: 3,
      totalArticles: 23,
      totalPages: 3,
    });
    expect(pagination?.articles.map(({ id }) => id)).toEqual(
      createArticles(23)
        .slice(10, 20)
        .map(({ id }) => id),
    );
  });

  it("마지막 페이지에 남은 article만 반환한다", () => {
    const pagination = paginateArticles(createArticles(23), 3, 10);

    expect(pagination).toMatchObject({
      firstArticleNumber: 21,
      lastArticleNumber: 23,
      previousPage: 2,
      nextPage: null,
    });
    expect(pagination?.articles).toHaveLength(3);
  });

  it("모든 페이지를 합치면 누락과 중복 없이 원래 article 순서를 복원한다", () => {
    const articles = createArticles(43);
    const paginatedArticleIds = getArticleArchivePageNumbers(articles.length, 10).flatMap(
      (pageNumber) =>
        paginateArticles(articles, pageNumber, 10)?.articles.map(({ id }) => id) ?? [],
    );

    expect(paginatedArticleIds).toEqual(articles.map(({ id }) => id));
    expect(new Set(paginatedArticleIds)).toHaveLength(articles.length);
  });

  it("빈 archive도 첫 페이지 하나로 유지한다", () => {
    expect(paginateArticles([], 1, 10)).toEqual({
      articles: [],
      currentPage: 1,
      firstArticleNumber: 0,
      lastArticleNumber: 0,
      previousPage: null,
      nextPage: null,
      totalArticles: 0,
      totalPages: 1,
    });
    expect(getArticleArchivePageNumbers(0, 10)).toEqual([1]);
  });

  it("범위를 벗어나거나 정수가 아닌 현재 페이지를 거부한다", () => {
    const articles = createArticles(23);

    expect(paginateArticles(articles, 0, 10)).toBeNull();
    expect(paginateArticles(articles, 1.5, 10)).toBeNull();
    expect(paginateArticles(articles, 4, 10)).toBeNull();
  });

  it("잘못된 개수와 페이지 크기를 명시적으로 거부한다", () => {
    expect(() => getArticleArchivePageNumbers(-1, 10)).toThrow(RangeError);
    expect(() => getArticleArchivePageNumbers(10.5, 10)).toThrow(RangeError);
    expect(() => getArticleArchivePageNumbers(10, 0)).toThrow(RangeError);
    expect(() => paginateArticles(createArticles(1), 1, 1.5)).toThrow(RangeError);
  });

  it("첫 페이지를 제외한 정적 route param만 생성한다", () => {
    expect(getArticleArchiveStaticParams(43, 10)).toEqual([
      { pageNumber: "2" },
      { pageNumber: "3" },
      { pageNumber: "4" },
      { pageNumber: "5" },
    ]);
    expect(getArticleArchiveStaticParams(10, 10)).toEqual([]);
  });

  it("중복 URL을 만들 수 있는 page param을 거부한다", () => {
    expect(parseArticleArchivePageNumber("1")).toBe(1);
    expect(parseArticleArchivePageNumber("23")).toBe(23);
    expect(parseArticleArchivePageNumber("0")).toBeNull();
    expect(parseArticleArchivePageNumber("02")).toBeNull();
    expect(parseArticleArchivePageNumber("1.5")).toBeNull();
    expect(parseArticleArchivePageNumber("page-2")).toBeNull();
    expect(parseArticleArchivePageNumber("9007199254740992")).toBeNull();
  });

  it("첫 페이지와 이후 페이지의 canonical path를 구분한다", () => {
    expect(getArticleArchivePagePath("ko", 1)).toBe("/articles/");
    expect(getArticleArchivePagePath("ko", 2)).toBe("/articles/page/2/");
    expect(getArticleArchivePagePath("en", 2)).toBe("/en/articles/page/2/");
    expect(() => getArticleArchivePagePath("ko", 0)).toThrow(RangeError);
  });
});
