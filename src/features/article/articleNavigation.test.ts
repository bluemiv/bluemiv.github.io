import { describe, expect, it } from "vitest";

import type { ArticleMetadata } from "./articleMetadata";
import { getArticleNavigation } from "./articleNavigation";
import type { ArticleCategory, ArticleTopic } from "./articleTaxonomy";

function createArticle(
  id: string,
  category: ArticleCategory,
  topics: ArticleTopic[],
  publishedAt: string,
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
  createArticle("article-004", "frontend", ["nextjs", "react"], "2026-04-01T00:00:00.000Z"),
  createArticle("article-003", "frontend", ["react"], "2026-03-01T00:00:00.000Z"),
  createArticle("article-002", "frontend", ["nextjs", "react"], "2026-02-01T00:00:00.000Z"),
  createArticle("article-001", "backend", ["spring", "java"], "2026-01-01T00:00:00.000Z"),
] as const;

describe("articleNavigation", () => {
  it("최신순 목록에서 이전·다음과 공유 topic이 많은 article을 찾는다", () => {
    const navigation = getArticleNavigation(ARTICLES[1], ARTICLES);

    expect(navigation.newerArticle?.id).toBe("article-004");
    expect(navigation.olderArticle?.id).toBe("article-002");
    expect(navigation.relatedArticles.map(({ id }) => id)).toEqual(["article-004", "article-002"]);
  });

  it("방어적으로 다른 category의 같은 topic article을 추천하지 않는다", () => {
    const backendReact = createArticle(
      "article-005",
      "backend",
      ["react"],
      "2026-05-01T00:00:00.000Z",
    );

    expect(getArticleNavigation(backendReact, ARTICLES).relatedArticles).toEqual([]);
  });

  it("목록 양 끝과 추천 개수 경계를 처리한다", () => {
    expect(getArticleNavigation(ARTICLES[0], ARTICLES).newerArticle).toBeNull();
    expect(getArticleNavigation(ARTICLES[3], ARTICLES).olderArticle).toBeNull();
    expect(getArticleNavigation(ARTICLES[1], ARTICLES, 0).relatedArticles).toEqual([]);
  });

  it("목록에 없는 article은 이전·다음을 만들지 않는다", () => {
    const missing = createArticle("article-006", "frontend", ["react"], "2026-06-01T00:00:00.000Z");
    const navigation = getArticleNavigation(missing, ARTICLES);

    expect(navigation.newerArticle).toBeNull();
    expect(navigation.olderArticle).toBeNull();
    expect(navigation.relatedArticles).toHaveLength(3);
  });
});
