import fs from "node:fs";

import { describe, expect, it, vi } from "vitest";

import { SITE_CONFIG } from "@/config/siteConfig";

import {
  getArticleDocument,
  getArticleMetadata,
  getPublishedArticleLocales,
  getPublishedArticles,
} from "./articleRepository";

describe("articleRepository", () => {
  it("한국어 공개 article을 최신 발행순으로 조회한다", () => {
    const articles = getPublishedArticles("ko");
    const publishedDates = articles.map(({ publishedAt }) => publishedAt);

    expect(articles).toHaveLength(44);
    expect(publishedDates).toEqual([...publishedDates].sort().reverse());
    expect(new Set(articles.map(({ id }) => id)).size).toBe(articles.length);
    expect(new Set(articles.map(({ slug }) => slug)).size).toBe(articles.length);
    expect(articles.every(({ author }) => author === SITE_CONFIG.author)).toBe(true);
  });

  it("slug와 locale이 일치하는 metadata를 조회한다", () => {
    const article = getArticleMetadata("what-is-kotlin", "ko");

    expect(article).toMatchObject({
      id: "article-087",
      slug: "what-is-kotlin",
      locale: "ko",
      category: "backend",
      topics: ["kotlin", "java"],
      author: "Bluemiv",
    });
  });

  it("본문에서 TOC와 읽기 시간을 계산한다", () => {
    const article = getArticleDocument("build-github-pages-blog-with-nextjs", "ko");

    expect(article?.headings[0]).toEqual({
      id: "github-pages를-선택한-이유",
      number: "01",
      title: "GitHub Pages를 선택한 이유",
      depth: 2,
    });
    expect(article?.headings.length).toBeGreaterThan(5);
    expect(article?.readingTimeMinutes).toBeGreaterThan(1);
    expect(article?.source).toContain("## GitHub Pages를 선택한 이유");
  });

  it.each([
    ["en", "## Why GitHub Pages"],
    ["ja", "## GitHub Pagesを選んだ理由"],
  ] as const)("같은 article id와 slug를 사용하는 %s 번역을 조회한다", (locale, heading) => {
    const article = getArticleDocument("build-github-pages-blog-with-nextjs", locale);

    expect(article?.metadata).toMatchObject({
      id: "article-001",
      slug: "build-github-pages-blog-with-nextjs",
      locale,
      legacyPaths: [],
      isPublished: true,
    });
    expect(article?.source).toContain(heading);
  });

  it("공개된 번역 locale을 모두 조회한다", () => {
    expect(getPublishedArticleLocales("build-github-pages-blog-with-nextjs")).toEqual([
      "ko",
      "en",
      "ja",
    ]);
    expect(getPublishedArticleLocales("react-useeffect-vs-uselayouteffect")).toEqual([
      "ko",
      "en",
      "ja",
    ]);
  });

  it("없는 article이나 번역은 null 또는 빈 목록을 반환한다", () => {
    const englishArticles = getPublishedArticles("en");

    expect(getArticleMetadata("missing-article", "ko")).toBeNull();
    expect(getArticleMetadata("what-is-kotlin", "en")).toBeNull();
    expect(englishArticles).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          locale: "en",
          slug: "react-useeffect-vs-uselayouteffect",
        }),
      ]),
    );
    expect(englishArticles.every(({ locale }) => locale === "en")).toBe(true);
    expect(englishArticles.some(({ slug }) => slug === "what-is-kotlin")).toBe(false);
  });

  it("파일 경로와 metadata가 다르면 build를 실패시킨다", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    vi.spyOn(fs, "readFileSync").mockReturnValue(`---
id: article-001
slug: another-article
locale: ko
category: frontend
topics: ['nextjs', 'react']
legacyPaths: ['/blog/nextjs/1/']
title: 잘못된 경로
description: 잘못된 경로 테스트
publishedAt: 2026-01-01T00:00:00+09:00
modifiedAt: 2026-01-01T00:00:00+09:00
tags: ['github-pages']
isPublished: true
---
`);

    expect(() => getArticleMetadata("expected-article", "ko")).toThrow(
      "Article path and metadata mismatch",
    );
  });
});
