import { describe, expect, it } from "vitest";

import { SITE_CONFIG } from "@/config/siteConfig";

import { parseArticleMetadata } from "./articleMetadata";

const VALID_METADATA = {
  id: "article-001",
  slug: "example-article",
  locale: "ko",
  category: "frontend",
  topics: ["nextjs", "react"],
  legacyPaths: ["/blog/nextjs/1/"],
  title: "예시 아티클",
  description: "예시 설명",
  publishedAt: "2026-01-01T00:00:00+09:00",
  modifiedAt: new Date("2026-01-02T00:00:00+09:00"),
  tags: ["nextjs", "ssg"],
  isPublished: true,
  coverImage: "/r/i/nextjs/1/thumbnail.webp",
} as const;

describe("parseArticleMetadata", () => {
  it("author가 없으면 사이트 기본값을 사용한다", () => {
    const metadata = parseArticleMetadata(VALID_METADATA);

    expect(metadata.author).toBe(SITE_CONFIG.author);
  });

  it("명시한 author를 공백 제거 후 사용한다", () => {
    const metadata = parseArticleMetadata({
      ...VALID_METADATA,
      author: "  Guest Writer  ",
    });

    expect(metadata.author).toBe("Guest Writer");
  });

  it("Date 값을 SEO용 ISO 문자열로 변환한다", () => {
    const metadata = parseArticleMetadata(VALID_METADATA);

    expect(metadata.publishedAt).toBe("2025-12-31T15:00:00.000Z");
    expect(metadata.modifiedAt).toBe("2026-01-01T15:00:00.000Z");
  });

  it.each([
    ["잘못된 id", { id: "article-one" }],
    ["잘못된 slug", { slug: "Invalid Slug" }],
    ["예약된 slug", { slug: "page" }],
    ["지원하지 않는 locale", { locale: "fr" }],
    ["지원하지 않는 category", { category: "platform" }],
    ["지원하지 않는 topic", { topics: ["next-js"] }],
    ["빈 topics", { topics: [] }],
    ["중복 topic", { topics: ["react", "react"] }],
    ["category에 속하지 않는 topic", { category: "backend", topics: ["react"] }],
    ["상대 legacy path", { legacyPaths: ["blog/nextjs/1/"] }],
    ["빈 title", { title: " " }],
    ["잘못된 날짜", { publishedAt: "2026-01-01" }],
    ["문자열 공개 여부", { isPublished: "true" }],
  ])("%s를 거부한다", (_, invalidValue) => {
    expect(() => parseArticleMetadata({ ...VALID_METADATA, ...invalidValue })).toThrow();
  });

  it("정의하지 않은 과거 metadata 필드를 거부한다", () => {
    expect(() =>
      parseArticleMetadata({
        ...VALID_METADATA,
        createdAt: "2026-01-01T00:00:00+09:00",
      }),
    ).toThrow();
  });
});
