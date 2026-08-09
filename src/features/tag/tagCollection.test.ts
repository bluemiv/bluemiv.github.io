import { describe, expect, it } from "vitest";

import { filterEntriesByTag, summarizeTags } from "./tagCollection";

const ENTRIES = [
  { id: "article-001", tags: ["github-pages", "seo"] as const },
  { id: "article-002", tags: ["seo"] as const },
  { id: "note-001", tags: ["database"] as const },
];

describe("tagCollection", () => {
  it("선택한 tag가 있는 entry만 순서를 유지해 반환한다", () => {
    expect(filterEntriesByTag(ENTRIES, "seo").map(({ id }) => id)).toEqual([
      "article-001",
      "article-002",
    ]);
    expect(filterEntriesByTag(ENTRIES, "mdx")).toEqual([]);
  });

  it("registry 순서로 사용 중인 tag와 entry 수를 집계한다", () => {
    expect(summarizeTags(ENTRIES)).toEqual([
      { count: 1, tag: "database" },
      { count: 1, tag: "github-pages" },
      { count: 2, tag: "seo" },
    ]);
  });

  it("빈 목록은 빈 summary를 반환한다", () => {
    expect(summarizeTags([])).toEqual([]);
  });
});
