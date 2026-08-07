import { describe, expect, it } from "vitest";

import { SITE_CONFIG } from "@/config/siteConfig";

import { parseNoteMetadata } from "./noteMetadata";

const VALID_METADATA = {
  id: "note-001",
  slug: "example-note",
  locale: "ko",
  legacyPaths: ["/blog/short/1/"],
  title: "예시 노트",
  description: "예시 설명",
  publishedAt: "2026-01-01T00:00:00+09:00",
  modifiedAt: "2026-01-02T00:00:00+09:00",
  tags: ["nextjs"],
  isPublished: true,
} as const;

describe("parseNoteMetadata", () => {
  it("author와 coverImage를 생략할 수 있다", () => {
    const metadata = parseNoteMetadata(VALID_METADATA);

    expect(metadata.author).toBe(SITE_CONFIG.author);
    expect(metadata.coverImage).toBeUndefined();
  });

  it("명시한 author와 coverImage를 사용한다", () => {
    const metadata = parseNoteMetadata({
      ...VALID_METADATA,
      author: "Guest",
      coverImage: "/r/i/short/1/thumbnail.webp",
    });

    expect(metadata.author).toBe("Guest");
    expect(metadata.coverImage).toBe("/r/i/short/1/thumbnail.webp");
  });

  it.each([
    { id: "note-one" },
    { slug: "Invalid Note" },
    { locale: "jp" },
    { legacyPaths: ["/wrong/path/"] },
    { modifiedAt: "invalid" },
    { author: " " },
    { coverImage: "relative/image.webp" },
    { release: true },
  ])("잘못된 metadata를 거부한다: %o", (invalidValue) => {
    expect(() => parseNoteMetadata({ ...VALID_METADATA, ...invalidValue })).toThrow();
  });
});
