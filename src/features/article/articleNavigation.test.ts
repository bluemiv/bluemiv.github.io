import { describe, expect, it } from "vitest";

import type { ArticleMetadata } from "./articleMetadata";
import { getArticleNavigation } from "./articleNavigation";

function createArticle(id: string, topic: string, publishedAt: string): ArticleMetadata {
  return {
    id,
    slug: id,
    locale: "ko",
    topic,
    legacyPaths: [`/blog/${topic}/${id}/`],
    title: id,
    description: `${id} 설명`,
    publishedAt,
    modifiedAt: publishedAt,
    tags: [topic],
    isPublished: true,
    author: "Bluemiv",
  };
}

const ARTICLES = [
  createArticle("article-003", "react", "2026-03-01T00:00:00.000Z"),
  createArticle("article-002", "react", "2026-02-01T00:00:00.000Z"),
  createArticle("article-001", "nextjs", "2026-01-01T00:00:00.000Z"),
] as const;

describe("articleNavigation", () => {
  it("최신순 목록에서 이전·다음과 같은 topic article을 찾는다", () => {
    const navigation = getArticleNavigation(ARTICLES[1], ARTICLES);

    expect(navigation.newerArticle?.id).toBe("article-003");
    expect(navigation.olderArticle?.id).toBe("article-001");
    expect(navigation.relatedArticles.map(({ id }) => id)).toEqual(["article-003"]);
  });

  it("목록 양 끝과 추천 개수 경계를 처리한다", () => {
    expect(getArticleNavigation(ARTICLES[0], ARTICLES).newerArticle).toBeNull();
    expect(getArticleNavigation(ARTICLES[2], ARTICLES).olderArticle).toBeNull();
    expect(getArticleNavigation(ARTICLES[1], ARTICLES, 0).relatedArticles).toEqual([]);
  });

  it("목록에 없는 article은 이전·다음을 만들지 않는다", () => {
    const missing = createArticle("article-004", "react", "2026-04-01T00:00:00.000Z");
    const navigation = getArticleNavigation(missing, ARTICLES);

    expect(navigation.newerArticle).toBeNull();
    expect(navigation.olderArticle).toBeNull();
    expect(navigation.relatedArticles).toHaveLength(2);
  });
});
