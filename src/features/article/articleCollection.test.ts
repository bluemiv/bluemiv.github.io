import { describe, expect, it } from "vitest";

import type { ArticleMetadata } from "./articleMetadata";
import {
  filterArticlesByTopic,
  selectHomeArticles,
  summarizeArticleTopics,
} from "./articleCollection";

function createArticle(id: string, topic: string): ArticleMetadata {
  return {
    id,
    slug: id,
    locale: "ko",
    topic,
    legacyPaths: [`/blog/${topic}/${id}/`],
    title: id,
    description: `${id} 설명`,
    publishedAt: "2026-01-01T00:00:00.000Z",
    modifiedAt: "2026-01-01T00:00:00.000Z",
    tags: [topic],
    isPublished: true,
    author: "Bluemiv",
  };
}

const ARTICLES = [
  createArticle("article-004", "react"),
  createArticle("article-003", "spring"),
  createArticle("article-002", "react"),
  createArticle("article-001", "algorithm"),
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

  it("topic을 글 수와 이름 순으로 집계하고 제한한다", () => {
    expect(summarizeArticleTopics(ARTICLES, 2)).toEqual([
      { topic: "react", count: 2 },
      { topic: "algorithm", count: 1 },
    ]);
  });

  it("topic 제한값 경계를 처리한다", () => {
    expect(summarizeArticleTopics([], 3)).toEqual([]);
    expect(summarizeArticleTopics(ARTICLES, -1)).toEqual([]);
  });

  it("선택한 topic만 필터링하고 선택이 없으면 전체를 유지한다", () => {
    expect(filterArticlesByTopic(ARTICLES, "react").map(({ id }) => id)).toEqual([
      "article-004",
      "article-002",
    ]);
    expect(filterArticlesByTopic(ARTICLES, "missing")).toEqual([]);
    expect(filterArticlesByTopic(ARTICLES, null)).toEqual(ARTICLES);
  });
});
