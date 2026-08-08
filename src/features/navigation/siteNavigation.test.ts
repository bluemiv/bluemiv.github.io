import { describe, expect, it } from "vitest";

import {
  createHeaderScrollState,
  isArticleDetailPath,
  isNavigationPathActive,
  resolveHeaderScrollState,
} from "./siteNavigation";

describe("siteNavigation", () => {
  it("현재 route와 하위 route를 active로 판별한다", () => {
    expect(isNavigationPathActive("/articles/", "/articles/")).toBe(true);
    expect(isNavigationPathActive("/articles/example/", "/articles/")).toBe(true);
    expect(isNavigationPathActive("/notes/", "/articles/")).toBe(false);
  });

  it("root route를 다른 route의 active 상태로 확장하지 않는다", () => {
    expect(isNavigationPathActive("/", "/")).toBe(true);
    expect(isNavigationPathActive("/articles/", "/")).toBe(false);
  });

  it("article 상세 route만 읽기 진행 표시 대상으로 판별한다", () => {
    expect(isArticleDetailPath("/articles/example/", "/articles/")).toBe(true);
    expect(isArticleDetailPath("/articles/", "/articles/")).toBe(false);
    expect(isArticleDetailPath("/articles/example/extra/", "/articles/")).toBe(false);
    expect(isArticleDetailPath("/notes/example/", "/articles/")).toBe(false);
  });

  it("음수 scroll 위치를 0으로 정규화한다", () => {
    expect(createHeaderScrollState(-10)).toEqual({
      direction: "up",
      directionOriginY: 0,
      isCompact: false,
      previousScrollY: 0,
    });
  });

  it("초기 scroll 위치가 상단을 벗어나면 compact 상태로 만든다", () => {
    expect(createHeaderScrollState(25).isCompact).toBe(true);
  });

  it("아래 방향으로 32px 이동한 뒤 compact 상태로 전환한다", () => {
    const initialState = createHeaderScrollState();
    const beforeThreshold = resolveHeaderScrollState(initialState, 31);
    const compactState = resolveHeaderScrollState(beforeThreshold, 32);

    expect(beforeThreshold.isCompact).toBe(false);
    expect(compactState.isCompact).toBe(true);
  });

  it("작은 반대 방향 움직임은 상태를 바꾸지 않고 16px 위로 이동하면 펼친다", () => {
    const compactState = resolveHeaderScrollState(createHeaderScrollState(), 64);
    const smallUpwardState = resolveHeaderScrollState(compactState, 49);
    const expandedState = resolveHeaderScrollState(smallUpwardState, 48);

    expect(smallUpwardState.isCompact).toBe(true);
    expect(expandedState.isCompact).toBe(false);
  });

  it("상단 영역으로 돌아오면 즉시 펼치고 같은 위치에서는 상태를 유지한다", () => {
    const compactState = createHeaderScrollState(100);
    const topState = resolveHeaderScrollState(compactState, 24);

    expect(topState.isCompact).toBe(false);
    expect(resolveHeaderScrollState(topState, 24)).toStrictEqual(topState);
    expect(resolveHeaderScrollState(compactState, 100)).toBe(compactState);
  });
});
