import { describe, expect, it } from "vitest";

import type { ArticleMetadata } from "./articleMetadata";
import {
  filterArticlesByCategory,
  filterArticlesByTopic,
  getEarliestArticlePublicationYear,
  selectHomeArticles,
  summarizeArticleTaxonomy,
  summarizeArticleTopics,
} from "./articleCollection";
import type { ArticleCategory, ArticleTopic } from "./articleTaxonomy";

function createArticle(
  id: string,
  category: ArticleCategory,
  topics: ArticleTopic[],
  publishedAt = "2026-01-01T00:00:00.000Z",
): ArticleMetadata {
  return {
    id,
    slug: id,
    locale: "ko",
    category,
    topics,
    legacyPaths: [`/blog/${topics[0]}/${id}/`],
    title: id,
    description: `${id} 설명`,
    publishedAt,
    modifiedAt: publishedAt,
    tags: [],
    isPublished: true,
    author: "Bluemiv",
  };
}

const ARTICLES = [
  createArticle("article-004", "frontend", ["react", "typescript"]),
  createArticle("article-003", "backend", ["spring", "java"]),
  createArticle("article-002", "frontend", ["react"]),
  createArticle("article-001", "computer-science", ["algorithm"]),
] as const;

describe("articleCollection", () => {
  it("첫 article을 featured로 분리하고 나머지를 제한한다", () => {
    const selection = selectHomeArticles(ARTICLES, 2);

    expect(selection.featuredArticle?.id).toBe("article-004");
    expect(selection.latestArticles.map(({ id }) => id)).toEqual(["article-003", "article-002"]);
  });

  it("빈 목록과 음수 제한값을 안전하게 처리한다", () => {
    expect(selectHomeArticles([])).toEqual({ featuredArticle: null, latestArticles: [] });
    expect(selectHomeArticles(ARTICLES, -1).latestArticles).toEqual([]);
  });

  it("여러 topic을 글 단위로 집계하고 글 수와 이름 순으로 제한한다", () => {
    expect(summarizeArticleTopics(ARTICLES, 3)).toEqual([
      { topic: "react", count: 2 },
      { topic: "algorithm", count: 1 },
      { topic: "java", count: 1 },
    ]);
  });

  it("category 아래 topic을 taxonomy 순서로 집계한다", () => {
    expect(summarizeArticleTaxonomy(ARTICLES)).toEqual([
      {
        category: "backend",
        count: 1,
        topics: [
          { topic: "spring", count: 1 },
          { topic: "java", count: 1 },
        ],
      },
      {
        category: "frontend",
        count: 2,
        topics: [
          { topic: "react", count: 2 },
          { topic: "typescript", count: 1 },
        ],
      },
      {
        category: "computer-science",
        count: 1,
        topics: [{ topic: "algorithm", count: 1 }],
      },
    ]);
  });

  it("topic 제한값 경계와 빈 taxonomy를 처리한다", () => {
    expect(summarizeArticleTopics([], 3)).toEqual([]);
    expect(summarizeArticleTopics(ARTICLES, -1)).toEqual([]);
    expect(summarizeArticleTaxonomy([])).toEqual([]);
  });

  it("선택한 category와 topic을 각각 필터링한다", () => {
    expect(filterArticlesByCategory(ARTICLES, "frontend").map(({ id }) => id)).toEqual([
      "article-004",
      "article-002",
    ]);
    expect(filterArticlesByTopic(ARTICLES, "typescript").map(({ id }) => id)).toEqual([
      "article-004",
    ]);
    expect(filterArticlesByCategory(ARTICLES, "missing")).toEqual([]);
    expect(filterArticlesByTopic(ARTICLES, "missing")).toEqual([]);
    expect(filterArticlesByCategory(ARTICLES, null)).toEqual(ARTICLES);
    expect(filterArticlesByTopic(ARTICLES, null)).toEqual(ARTICLES);
  });

  it("공개 article 순서와 관계없이 가장 이른 발행 연도를 계산한다", () => {
    const articles = [
      createArticle("article-002", "frontend", ["react"], "2024-01-01T00:00:00+09:00"),
      createArticle("article-001", "frontend", ["react"], "2017-08-10T12:00:00+09:00"),
      createArticle("article-003", "frontend", ["react"], "2026-01-01T00:00:00+09:00"),
    ];

    expect(getEarliestArticlePublicationYear(articles, "Asia/Seoul")).toBe(2017);
  });

  it("발행 연도에 지정한 시간대를 적용한다", () => {
    const article = createArticle("article-001", "frontend", ["react"], "2017-12-31T16:00:00.000Z");

    expect(getEarliestArticlePublicationYear([article], "Asia/Seoul")).toBe(2018);
    expect(getEarliestArticlePublicationYear([article], "UTC")).toBe(2017);
  });

  it("article이 없으면 시작 연도를 반환하지 않는다", () => {
    expect(getEarliestArticlePublicationYear([], "Asia/Seoul")).toBeNull();
  });
});
