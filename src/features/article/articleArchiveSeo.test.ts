import { describe, expect, it } from "vitest";

import { getArticleArchiveMetadata } from "./articleArchiveSeo";
import type { ArticlePagination } from "./articlePagination";

function createPagination(currentPage: number, totalPages: number): ArticlePagination {
  return {
    articles: [],
    currentPage,
    firstArticleNumber: (currentPage - 1) * 10 + 1,
    lastArticleNumber: Math.min(currentPage * 10, 43),
    previousPage: currentPage > 1 ? currentPage - 1 : null,
    nextPage: currentPage < totalPages ? currentPage + 1 : null,
    totalArticles: 43,
    totalPages,
  };
}

describe("articleArchiveSeo", () => {
  it("첫 페이지는 기존 canonical을 유지하고 다음 페이지를 연결한다", () => {
    const metadata = getArticleArchiveMetadata("ko", createPagination(1, 5));

    expect(metadata).toMatchObject({
      title: "기술 글",
      alternates: { canonical: "/articles/" },
      pagination: { next: "/articles/page/2/" },
      openGraph: { url: "/articles/" },
    });
    expect(metadata.pagination?.previous).toBeUndefined();
  });

  it("중간 페이지에 고유 title·canonical과 이전·다음 관계를 만든다", () => {
    const metadata = getArticleArchiveMetadata("ko", createPagination(3, 5));

    expect(metadata).toMatchObject({
      title: "기술 글 3페이지",
      description: expect.stringContaining("3페이지"),
      alternates: { canonical: "/articles/page/3/" },
      pagination: {
        previous: "/articles/page/2/",
        next: "/articles/page/4/",
      },
      openGraph: { url: "/articles/page/3/" },
    });
  });

  it("마지막 페이지에서는 다음 페이지 관계를 생략한다", () => {
    const metadata = getArticleArchiveMetadata("ko", createPagination(5, 5));

    expect(metadata.pagination).toEqual({
      previous: "/articles/page/4/",
      next: undefined,
    });
  });
});
