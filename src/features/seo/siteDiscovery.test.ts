import { describe, expect, it } from "vitest";

import type { AppProfile } from "@/features/app/appProfiles";
import type { ArticleMetadata } from "@/features/article/articleMetadata";
import type { NoteMetadata } from "@/features/note/noteMetadata";

import {
  createRobots,
  createSitemap,
  getAbsoluteSiteUrl,
  getSearchDiscoverySitemaps,
  NO_INDEX_FOLLOW_ROBOTS,
} from "./siteDiscovery";

const APP_PROFILE: AppProfile = {
  slug: "example-app",
  locale: "ko",
  name: "Example App",
  description: "Example description",
  features: [],
  googlePlayUrl: "https://play.google.com/store/apps/details?id=example",
  legalLinks: [{ label: "Privacy", href: "/apps/example-app/privacy/" }],
};

function createArticle(index: number, overrides: Partial<ArticleMetadata> = {}): ArticleMetadata {
  return {
    id: `article-${String(index).padStart(3, "0")}`,
    slug: `article-${index}`,
    locale: "ko",
    category: "frontend",
    topics: index % 2 ? ["nextjs", "react"] : ["react"],
    legacyPaths: [],
    title: `Article ${index}`,
    description: `Description ${index}`,
    publishedAt: `2026-01-${String(index).padStart(2, "0")}T00:00:00.000Z`,
    modifiedAt: `2026-02-${String(index).padStart(2, "0")}T00:00:00.000Z`,
    tags: ["seo"],
    isPublished: true,
    author: "Bluemiv",
    ...overrides,
  };
}

function createNote(index: number, overrides: Partial<NoteMetadata> = {}): NoteMetadata {
  return {
    id: `note-${String(index).padStart(3, "0")}`,
    slug: `note-${index}`,
    locale: "ko",
    legacyPaths: [],
    title: `Note ${index}`,
    description: `Description ${index}`,
    publishedAt: `2026-03-${String(index).padStart(2, "0")}T00:00:00.000Z`,
    modifiedAt: `2026-04-${String(index).padStart(2, "0")}T00:00:00.000Z`,
    tags: ["database"],
    isPublished: true,
    author: "Bluemiv",
    ...overrides,
  };
}

describe("siteDiscovery", () => {
  it("절대 URL과 검색 문서 경로를 일관되게 만든다", () => {
    expect(getAbsoluteSiteUrl("/articles/")).toBe("https://bluemiv.github.io/articles/");
    expect(getSearchDiscoverySitemaps()).toEqual([
      "https://bluemiv.github.io/sitemap.xml",
      "https://bluemiv.github.io/feed.xml",
      "https://bluemiv.github.io/rss.xml",
    ]);
  });

  it("robots는 전체 크롤링을 허용하고 모든 검색 문서를 안내한다", () => {
    expect(createRobots()).toEqual({
      rules: { userAgent: "*", allow: "/" },
      sitemap: getSearchDiscoverySitemaps(),
    });
    expect(NO_INDEX_FOLLOW_ROBOTS).toEqual({ index: false, follow: true });
  });

  it("canonical 검색 대상만 sitemap에 넣고 실제 수정일과 이미지를 사용한다", () => {
    const articles = Array.from({ length: 11 }, (_, index) => createArticle(index + 1));
    articles[0] = createArticle(1, { coverImage: "/r/i/article-1/cover.webp" });
    const notes = [createNote(1)];
    const sitemap = createSitemap(articles, notes, [APP_PROFILE]);
    const urls = sitemap.map(({ url }) => url);

    expect(urls).toEqual(
      expect.arrayContaining([
        "https://bluemiv.github.io/",
        "https://bluemiv.github.io/en/",
        "https://bluemiv.github.io/ja/",
        "https://bluemiv.github.io/articles/",
        "https://bluemiv.github.io/articles/page/2/",
        "https://bluemiv.github.io/articles/article-1/",
        "https://bluemiv.github.io/categories/frontend/",
        "https://bluemiv.github.io/topics/nextjs/",
        "https://bluemiv.github.io/topics/react/",
        "https://bluemiv.github.io/notes/",
        "https://bluemiv.github.io/notes/note-1/",
        "https://bluemiv.github.io/apps/example-app/",
      ]),
    );
    expect(sitemap.find(({ url }) => url.endsWith("/articles/article-1/"))).toMatchObject({
      lastModified: "2026-02-01T00:00:00.000Z",
      images: ["https://bluemiv.github.io/r/i/article-1/cover.webp"],
    });
    expect(sitemap.find(({ url }) => url.endsWith("/articles/"))).toMatchObject({
      lastModified: "2026-02-10T00:00:00.000Z",
    });
    expect(sitemap.find(({ url }) => url.endsWith("/articles/page/2/"))).toMatchObject({
      lastModified: "2026-02-11T00:00:00.000Z",
    });
    expect(sitemap.every((entry) => !("priority" in entry) && !("changeFrequency" in entry))).toBe(
      true,
    );
    expect(
      urls.every((url) => !/\/apps\/[^/]+\/(?:privacy|terms|account-deletion)\//.test(url)),
    ).toBe(true);
    expect(urls.every((url) => !/\/(?:privacy|blog)\//.test(url))).toBe(true);
  });

  it("홈의 hreflang은 모든 실제 locale과 x-default를 절대 URL로 연결한다", () => {
    const sitemap = createSitemap([], [], []);
    const homes = sitemap.slice(0, 3);

    for (const home of homes) {
      expect(home.alternates?.languages).toEqual({
        ko: "https://bluemiv.github.io/",
        en: "https://bluemiv.github.io/en/",
        ja: "https://bluemiv.github.io/ja/",
        "x-default": "https://bluemiv.github.io/",
      });
    }
    expect(homes.every(({ lastModified }) => lastModified === undefined)).toBe(true);
  });

  it("비공개 문서는 전달받아도 sitemap에서 제외한다", () => {
    const sitemap = createSitemap(
      [createArticle(1, { isPublished: false })],
      [createNote(1, { isPublished: false })],
      [],
    );
    const urls = sitemap.map(({ url }) => url);

    expect(urls).not.toContain("https://bluemiv.github.io/articles/article-1/");
    expect(urls).not.toContain("https://bluemiv.github.io/notes/note-1/");
  });
});
