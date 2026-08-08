import { describe, expect, it } from "vitest";

import { getActiveArticleHeadingId, getArticleReadingPercentage } from "./articleReadingProgress";

const GEOMETRY = {
  articleHeight: 2000,
  articleTop: 500,
  headerHeight: 72,
  viewportHeight: 800,
};

describe("articleReadingProgress", () => {
  it("본문 시작 전과 끝 이후의 진행률을 0–100 범위로 제한한다", () => {
    expect(getArticleReadingPercentage({ ...GEOMETRY, scrollY: 0 })).toBe(0);
    expect(getArticleReadingPercentage({ ...GEOMETRY, scrollY: 1700 })).toBe(100);
    expect(getArticleReadingPercentage({ ...GEOMETRY, scrollY: 5000 })).toBe(100);
  });

  it("본문 viewport 위치를 정수 백분율로 계산한다", () => {
    expect(getArticleReadingPercentage({ ...GEOMETRY, scrollY: 1064 })).toBe(50);
  });

  it("viewport보다 짧은 본문도 시작 직후가 아닌 최소 읽기 거리를 지나 100%가 된다", () => {
    const shortGeometry = {
      articleHeight: 400,
      articleTop: 100,
      headerHeight: 72,
      viewportHeight: 800,
    };

    expect(getArticleReadingPercentage({ ...shortGeometry, scrollY: 0 })).toBe(0);
    expect(getArticleReadingPercentage({ ...shortGeometry, scrollY: 228 })).toBe(50);
    expect(getArticleReadingPercentage({ ...shortGeometry, scrollY: 428 })).toBe(100);
  });

  it("읽기 위치를 통과한 마지막 heading을 active로 선택한다", () => {
    const headings = [
      { id: "first", offsetTop: 500 },
      { id: "second", offsetTop: 900 },
      { id: "third", offsetTop: 1400 },
    ];

    expect(getActiveArticleHeadingId([], 1000)).toBe("");
    expect(getActiveArticleHeadingId(headings, 200)).toBe("first");
    expect(getActiveArticleHeadingId(headings, 900)).toBe("second");
    expect(getActiveArticleHeadingId(headings, 2000)).toBe("third");
  });
});
