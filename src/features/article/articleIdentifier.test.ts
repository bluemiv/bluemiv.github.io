import { describe, expect, it } from "vitest";

import { getArticleNumber } from "./articleIdentifier";

describe("getArticleNumber", () => {
  it.each([
    ["article-001", "001"],
    ["article-12", "012"],
    ["article-1000", "1000"],
  ])("article ID를 화면 번호로 변환한다: %s", (id, expected) => {
    expect(getArticleNumber(id)).toBe(expected);
  });

  it.each(["article-one", "note-001", ""])('잘못된 ID는 "000"을 반환한다: %s', (id) => {
    expect(getArticleNumber(id)).toBe("000");
  });
});
