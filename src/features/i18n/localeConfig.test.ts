import { describe, expect, it } from "vitest";

import {
  getLanguageAlternates,
  getLocaleSwitcherPath,
  getLocalizedPath,
  isPrefixedLocale,
  isSupportedLocale,
} from "./localeConfig";

describe("localeConfig", () => {
  it.each(["ko", "en", "ja"])("지원 locale을 판별한다: %s", (locale) => {
    expect(isSupportedLocale(locale)).toBe(true);
  });

  it.each(["jp", "fr", "", "KO"])("지원하지 않는 locale을 거부한다: %s", (locale) => {
    expect(isSupportedLocale(locale)).toBe(false);
  });

  it("prefix locale은 en과 ja만 허용한다", () => {
    expect(isPrefixedLocale("en")).toBe(true);
    expect(isPrefixedLocale("ja")).toBe(true);
    expect(isPrefixedLocale("ko")).toBe(false);
  });

  it.each([
    ["ko", "", "/"],
    ["ko", "articles/example", "/articles/example/"],
    ["ko", "/articles/example/", "/articles/example/"],
    ["en", "", "/en/"],
    ["ja", "notes/example", "/ja/notes/example/"],
  ] as const)("locale URL을 생성한다", (locale, path, expected) => {
    expect(getLocalizedPath(locale, path)).toBe(expected);
  });

  it("canonical 언어 대체 경로를 생성한다", () => {
    expect(getLanguageAlternates("articles/example")).toEqual({
      ko: "/articles/example/",
      en: "/en/articles/example/",
      ja: "/ja/articles/example/",
      "x-default": "/articles/example/",
    });
  });

  it("언어 메뉴에서 현재 locale은 현 경로를 유지하고 다른 locale은 번역 홈으로 이동한다", () => {
    expect(getLocaleSwitcherPath("ko", "ko", "/articles/example")).toBe("/articles/example/");
    expect(getLocaleSwitcherPath("ko", "ko", "/")).toBe("/");
    expect(getLocaleSwitcherPath("ko", "en", "/articles/example/")).toBe("/en/");
    expect(getLocaleSwitcherPath("en", "en", "/en/")).toBe("/en/");
    expect(getLocaleSwitcherPath("en", "ko", "/en/")).toBe("/");
  });
});
