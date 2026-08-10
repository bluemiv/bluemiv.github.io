import { describe, expect, it } from "vitest";

import { getTagLabel, getTagLabels, isTagKey, TAG_DEFINITIONS, type TagKey } from "./tagRegistry";

describe("tagRegistry", () => {
  it("tag key를 중복 없는 소문자 kebab-case로 관리한다", () => {
    const keys = TAG_DEFINITIONS.map(({ key }) => key);

    expect(new Set(keys).size).toBe(keys.length);
    keys.forEach((key) => expect(key).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/));
    TAG_DEFINITIONS.forEach(({ label }) => expect(label.trim()).not.toBe(""));
  });

  it("공식 표기를 반환한다", () => {
    expect(getTagLabel("github-pages")).toBe("GitHub Pages");
    expect(getTagLabel("nextjs")).toBe("Next.js");
    expect(getTagLabel("rag")).toBe("RAG");
    expect(getTagLabel("vector-search")).toBe("Vector Search");
    expect(getTagLabels(["mdx", "seo"])).toEqual(["MDX", "SEO"]);
  });

  it("등록 여부를 판별한다", () => {
    expect(isTagKey("static-export")).toBe(true);
    expect(isTagKey("Static Export")).toBe(false);
  });

  it("등록되지 않은 tag 조회를 거부한다", () => {
    expect(() => getTagLabel("unknown" as TagKey)).toThrow("Unknown tag: unknown");
  });
});
