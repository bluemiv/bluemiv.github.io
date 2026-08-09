import { describe, expect, it } from "vitest";

import { parseNoteMetadata } from "./noteMetadata";
import { getNoteStructuredData, serializeNoteStructuredData } from "./noteSeo";

const NOTE = parseNoteMetadata({
  id: "note-001",
  slug: "example-note",
  locale: "ko",
  legacyPaths: ["/blog/short/1/"],
  title: "예시 노트",
  description: "예시 설명",
  publishedAt: "2026-01-01T00:00:00+09:00",
  modifiedAt: "2026-01-02T00:00:00+09:00",
  tags: ["nextjs", "environment-variables"],
  isPublished: true,
  coverImage: "/r/i/short/1/thumbnail.webp",
});

describe("noteSeo", () => {
  it("canonical과 cover를 절대 URL로 만든 BlogPosting 데이터를 생성한다", () => {
    const structuredData = getNoteStructuredData(NOTE, "/notes/example-note/");

    expect(structuredData).toMatchObject({
      "@type": "BlogPosting",
      "@id": "https://bluemiv.github.io/notes/example-note/#article",
      url: "https://bluemiv.github.io/notes/example-note/",
      headline: NOTE.title,
      inLanguage: "ko",
      mainEntityOfPage: "https://bluemiv.github.io/notes/example-note/",
      image: "https://bluemiv.github.io/r/i/short/1/thumbnail.webp",
      keywords: "Next.js, Environment Variables",
      articleSection: "Notes",
      author: { name: "Bluemiv" },
    });
  });

  it("cover가 없으면 image를 생략한다", () => {
    const structuredData = getNoteStructuredData(
      { ...NOTE, coverImage: undefined },
      "/notes/example-note/",
    );

    expect(structuredData.image).toBeUndefined();
  });

  it("구조화 데이터의 HTML 종료 문자를 escape한다", () => {
    expect(serializeNoteStructuredData({ title: "</script>" })).toBe('{"title":"\\u003c/script>"}');
  });
});
