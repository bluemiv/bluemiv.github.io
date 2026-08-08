import { describe, expect, it } from "vitest";

import { getPaginationItems } from "./pagination";

describe("pagination", () => {
  it("전체 페이지가 적으면 모든 번호를 표시한다", () => {
    expect(getPaginationItems(1, 1)).toEqual([1]);
    expect(getPaginationItems(3, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it("앞쪽 페이지에서는 뒤쪽 범위만 줄인다", () => {
    expect(getPaginationItems(3, 10)).toEqual([1, 2, 3, 4, 5, "ellipsis", 10]);
  });

  it("중간 페이지에서는 현재 위치 주변과 양 끝을 표시한다", () => {
    expect(getPaginationItems(5, 10)).toEqual([1, "ellipsis", 4, 5, 6, "ellipsis", 10]);
  });

  it("뒤쪽 페이지에서는 앞쪽 범위만 줄인다", () => {
    expect(getPaginationItems(9, 10)).toEqual([1, "ellipsis", 6, 7, 8, 9, 10]);
  });

  it("현재 페이지와 전체 페이지 경계를 검증한다", () => {
    expect(() => getPaginationItems(0, 5)).toThrow(RangeError);
    expect(() => getPaginationItems(1, 0)).toThrow(RangeError);
    expect(() => getPaginationItems(6, 5)).toThrow(RangeError);
    expect(() => getPaginationItems(1.5, 5)).toThrow(RangeError);
  });
});
