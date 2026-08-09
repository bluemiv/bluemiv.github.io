import { describe, expect, it } from "vitest";

import {
  getArticleLanguageAlternates,
  getArticleLocaleSwitcherPath,
  getRegisteredArticleLocales,
} from "./articleLocalization";

describe("articleLocalization", () => {
  const slug = "build-github-pages-blog-with-nextjs";

  it("실제로 등록된 article 번역 locale만 반환한다", () => {
    expect(getRegisteredArticleLocales(slug)).toEqual(["ko", "en", "ja"]);
    expect(getRegisteredArticleLocales("untranslated-article")).toEqual(["ko"]);
  });

  it("공개된 번역만 hreflang 경로로 만든다", () => {
    expect(getArticleLanguageAlternates(slug, ["ko", "en", "ja"])).toEqual({
      ko: `/articles/${slug}/`,
      en: `/en/articles/${slug}/`,
      ja: `/ja/articles/${slug}/`,
      "x-default": `/articles/${slug}/`,
    });
  });

  it("번역 article이 있으면 같은 글로, 없으면 해당 언어 홈으로 이동한다", () => {
    expect(getArticleLocaleSwitcherPath(`/articles/${slug}/`, "ja")).toBe(`/ja/articles/${slug}/`);
    expect(getArticleLocaleSwitcherPath(`/ja/articles/${slug}/`, "ko")).toBe(`/articles/${slug}/`);
    expect(getArticleLocaleSwitcherPath(`/ja/articles/${slug}/`, "en")).toBe(
      `/en/articles/${slug}/`,
    );
    expect(getArticleLocaleSwitcherPath("/ja/", "ko")).toBeNull();
  });
});
