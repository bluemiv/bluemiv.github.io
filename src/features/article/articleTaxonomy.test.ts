import { describe, expect, it } from "vitest";

import {
  ARTICLE_CATEGORY_SLUGS,
  ARTICLE_TAXONOMY,
  ARTICLE_TOPIC_SLUGS,
  getArticleCategoryDefinition,
  getArticleCategoryLabel,
  getArticleTopicDefinition,
  getArticleTopicLabel,
  isArticleCategory,
  isArticleTopic,
  isArticleTopicInCategory,
  type ArticleCategory,
  type ArticleTopic,
} from "./articleTaxonomy";

describe("articleTaxonomy", () => {
  it("모든 category와 topic을 중복 없이 한 번씩 정의한다", () => {
    expect(ARTICLE_TAXONOMY.map(({ slug }) => slug)).toEqual(ARTICLE_CATEGORY_SLUGS);
    expect(ARTICLE_TAXONOMY.flatMap(({ topics }) => topics.map(({ slug }) => slug))).toEqual(
      ARTICLE_TOPIC_SLUGS,
    );
    expect(new Set(ARTICLE_CATEGORY_SLUGS).size).toBe(ARTICLE_CATEGORY_SLUGS.length);
    expect(new Set(ARTICLE_TOPIC_SLUGS).size).toBe(ARTICLE_TOPIC_SLUGS.length);
  });

  it("공개 label과 부모 category를 반환한다", () => {
    expect(getArticleCategoryLabel("backend")).toBe("Backend");
    expect(getArticleTopicLabel("nextjs")).toBe("Next.js");
    expect(getArticleTopicDefinition("nextjs").category).toBe("frontend");
    expect(getArticleCategoryDefinition("computer-science").topics).toEqual([
      { slug: "algorithm", label: "Algorithm" },
      { slug: "artificial-intelligence", label: "Artificial Intelligence" },
    ]);
  });

  it("slug와 category-topic 관계를 판별한다", () => {
    expect(isArticleCategory("frontend")).toBe(true);
    expect(isArticleCategory("platform")).toBe(false);
    expect(isArticleTopic("typescript")).toBe(true);
    expect(isArticleTopic("artificial-intelligence")).toBe(true);
    expect(isArticleTopic("unknown")).toBe(false);
    expect(isArticleTopicInCategory("spring", "backend")).toBe(true);
    expect(isArticleTopicInCategory("spring", "frontend")).toBe(false);
    expect(isArticleTopicInCategory("artificial-intelligence", "computer-science")).toBe(true);
  });

  it("정의되지 않은 category와 topic 조회를 거부한다", () => {
    expect(() => getArticleCategoryDefinition("unknown" as ArticleCategory)).toThrow(
      "Unknown article category: unknown",
    );
    expect(() => getArticleTopicDefinition("unknown" as ArticleTopic)).toThrow(
      "Unknown article topic: unknown",
    );
  });
});
