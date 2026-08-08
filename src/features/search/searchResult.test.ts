import { describe, expect, it } from "vitest";

import {
  createSearchResult,
  getPagefindFilters,
  normalizeSearchQuery,
  sanitizeSearchExcerpt,
  shouldRunSearch,
} from "./searchResult";

describe("searchResult", () => {
  it("검색어의 앞뒤와 반복 공백을 정리한다", () => {
    expect(normalizeSearchQuery("  Next.js   정적 검색  ")).toBe("Next.js 정적 검색");
  });

  it("두 글자부터 검색하고 Unicode 문자를 글자 단위로 센다", () => {
    expect(shouldRunSearch("검")).toBe(false);
    expect(shouldRunSearch("검색")).toBe(true);
    expect(shouldRunSearch(" A ")).toBe(false);
    expect(shouldRunSearch(" Go ")).toBe(true);
  });

  it("전체 검색에는 filter를 보내지 않고 문서 유형만 제한한다", () => {
    expect(getPagefindFilters("all")).toBeUndefined();
    expect(getPagefindFilters("article")).toEqual({ type: "article" });
    expect(getPagefindFilters("note")).toEqual({ type: "note" });
  });

  it("Pagefind data를 UI result로 변환한다", () => {
    expect(
      createSearchResult({
        excerpt: "정적 <mark>검색</mark>을 구성합니다.",
        filters: { type: ["note"] },
        meta: { category: "Frontend", title: "검색 구현" },
        url: "/notes/static-search/",
      }),
    ).toEqual({
      category: "Frontend",
      excerpt: "정적 <mark>검색</mark>을 구성합니다.",
      title: "검색 구현",
      type: "note",
      url: "/notes/static-search/",
    });
  });

  it("검색 강조 mark만 남기고 실행 가능한 HTML을 제거한다", () => {
    expect(
      sanitizeSearchExcerpt(
        '정적 <mark class="unsafe">검색</mark><img src=x onerror=alert(1)><script>문자</script>',
      ),
    ).toBe("정적 <mark>검색</mark>문자");
  });

  it("title 또는 내부 URL이 없는 data는 제외한다", () => {
    expect(createSearchResult({ meta: { title: "제목" }, url: "https://example.com" })).toBeNull();
    expect(createSearchResult({ meta: {}, url: "/articles/example/" })).toBeNull();
  });
});
