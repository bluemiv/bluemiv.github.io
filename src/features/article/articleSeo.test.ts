import { describe, expect, it } from "vitest";

import { parseArticleMetadata } from "./articleMetadata";
import { getArticleStructuredData, serializeStructuredData } from "./articleSeo";

const ARTICLE = parseArticleMetadata({
  id: "article-001",
  slug: "example-article",
  locale: "ko",
  category: "frontend",
  topics: ["nextjs", "react"],
  legacyPaths: ["/blog/nextjs/1/"],
  title: "예시 아티클",
  description: "예시 설명",
  publishedAt: "2026-01-01T00:00:00+09:00",
  modifiedAt: "2026-01-02T00:00:00+09:00",
  tags: ["nextjs", "ssg"],
  isPublished: true,
  coverImage: "/r/i/nextjs/1/thumbnail.webp",
});

describe("articleSeo", () => {
  it("canonical과 cover를 절대 URL로 만든 BlogPosting 데이터를 생성한다", () => {
    const structuredData = getArticleStructuredData(ARTICLE, "/articles/example-article/");

    expect(structuredData["@graph"][0]).toMatchObject({
      "@type": "BlogPosting",
      "@id": "https://bluemiv.github.io/articles/example-article/#article",
      url: "https://bluemiv.github.io/articles/example-article/",
      headline: ARTICLE.title,
      inLanguage: "ko",
      mainEntityOfPage: "https://bluemiv.github.io/articles/example-article/",
      image: "https://bluemiv.github.io/r/i/nextjs/1/thumbnail.webp",
      keywords: "nextjs, react, ssg",
      articleSection: "Frontend",
      author: { name: "Bluemiv" },
    });
    expect(structuredData["@graph"][1]).toMatchObject({
      "@type": "BreadcrumbList",
      itemListElement: [
        { position: 1, item: "https://bluemiv.github.io/" },
        { position: 2, item: "https://bluemiv.github.io/articles/" },
        { position: 3, item: "https://bluemiv.github.io/categories/frontend/" },
        { position: 4, item: "https://bluemiv.github.io/articles/example-article/" },
      ],
    });
  });

  it("cover가 없으면 image를 생략한다", () => {
    const structuredData = getArticleStructuredData(
      { ...ARTICLE, coverImage: undefined },
      "/articles/example-article/",
    );

    expect(structuredData["@graph"][0].image).toBeUndefined();
  });

  it("구조화 데이터의 HTML 종료 문자를 escape한다", () => {
    expect(serializeStructuredData({ title: "</script>" })).toBe('{"title":"\\u003c/script>"}');
  });
});
