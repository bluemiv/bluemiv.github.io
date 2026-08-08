import { describe, expect, it } from "vitest";

import type { ArticleMetadata } from "@/features/article/articleMetadata";
import type { NoteMetadata } from "@/features/note/noteMetadata";

import { createAtomFeed, createRssFeed, getSyndicationEntries } from "./syndicationFeed";

function createArticle(overrides: Partial<ArticleMetadata> = {}): ArticleMetadata {
  return {
    id: "article-001",
    slug: "xml-escaping",
    locale: "ko",
    topic: "nextjs",
    legacyPaths: [],
    title: 'XML <문자> & "따옴표"',
    description: "A > B & C",
    publishedAt: "2026-01-01T00:00:00.000Z",
    modifiedAt: "2026-01-03T00:00:00.000Z",
    tags: ["nextjs", "nextjs"],
    isPublished: true,
    author: "Bluemiv",
    ...overrides,
  };
}

function createNote(overrides: Partial<NoteMetadata> = {}): NoteMetadata {
  return {
    id: "note-001",
    slug: "small-note",
    locale: "ko",
    legacyPaths: [],
    title: "작은 기록",
    description: "짧은 설명",
    publishedAt: "2026-01-02T00:00:00.000Z",
    modifiedAt: "2026-01-04T00:00:00.000Z",
    tags: ["memo"],
    isPublished: true,
    author: "Bluemiv",
    ...overrides,
  };
}

describe("syndicationFeed", () => {
  it("최근 수정순으로 정렬하고 중복 category와 비공개 문서를 제거한다", () => {
    const entries = getSyndicationEntries(
      [createArticle(), createArticle({ id: "article-002", slug: "draft", isPublished: false })],
      [createNote()],
    );

    expect(entries.map(({ url }) => url)).toEqual([
      "https://bluemiv.github.io/notes/small-note/",
      "https://bluemiv.github.io/articles/xml-escaping/",
    ]);
    expect(entries[1].categories).toEqual(["nextjs"]);
  });

  it("지정한 최근 항목 수만 남기고 잘못된 limit을 거부한다", () => {
    expect(getSyndicationEntries([createArticle()], [createNote()], 1)).toHaveLength(1);
    expect(() => getSyndicationEntries([], [], 0)).toThrow(RangeError);
    expect(() => getSyndicationEntries([], [], 1.5)).toThrow(RangeError);
  });

  it("Atom 1.0 필수 정보와 안전하게 escape한 항목을 만든다", () => {
    const atom = createAtomFeed(getSyndicationEntries([createArticle()], []));

    expect(atom).toContain('<feed xmlns="http://www.w3.org/2005/Atom">');
    expect(atom).toContain(
      '<link href="https://bluemiv.github.io/feed.xml" rel="self" type="application/atom+xml" />',
    );
    expect(atom).toContain("<title>XML &lt;문자&gt; &amp; &quot;따옴표&quot;</title>");
    expect(atom).toContain("<updated>2026-01-03T00:00:00.000Z</updated>");
    expect(atom.match(/<entry>/g)).toHaveLength(1);
    expect(atom).not.toContain("<title>XML <문자>");
  });

  it("RSS 2.0 필수 정보와 원문 canonical을 만든다", () => {
    const rss = createRssFeed(getSyndicationEntries([createArticle()], [createNote()]));

    expect(rss).toContain('<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">');
    expect(rss).toContain(
      '<atom:link href="https://bluemiv.github.io/rss.xml" rel="self" type="application/rss+xml" />',
    );
    expect(rss).toContain("<lastBuildDate>Sun, 04 Jan 2026 00:00:00 GMT</lastBuildDate>");
    expect(rss).toContain(
      '<guid isPermaLink="true">https://bluemiv.github.io/articles/xml-escaping/</guid>',
    );
    expect(rss.match(/<item>/g)).toHaveLength(2);
  });

  it("발행 문서가 없으면 표준 feed 생성을 거부한다", () => {
    expect(() => createAtomFeed([])).toThrow("requires at least one published entry");
    expect(() => createRssFeed([])).toThrow("requires at least one published entry");
  });
});
