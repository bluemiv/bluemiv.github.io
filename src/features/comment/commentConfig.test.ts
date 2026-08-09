import { describe, expect, it } from "vitest";

import {
  COMMENT_CONFIG,
  getCommentDiscussionTerm,
  getCommentLanguage,
  getCommentTheme,
} from "./commentConfig";

describe("commentConfig", () => {
  it("번역 글이 같은 article id를 discussion key로 사용한다", () => {
    expect(getCommentDiscussionTerm("article-087")).toBe("article-087");
  });

  it.each(["ko", "en", "ja"] as const)("%s locale을 giscus 언어로 유지한다", (locale) => {
    expect(getCommentLanguage(locale)).toBe(locale);
  });

  it("site theme에 맞는 giscus theme을 반환한다", () => {
    expect(getCommentTheme(false)).toBe("light");
    expect(getCommentTheme(true)).toBe("transparent_dark");
  });

  it("필수 공개 식별자가 모두 설정되어 있다", () => {
    expect(COMMENT_CONFIG.repositoryId).not.toBe("");
    expect(COMMENT_CONFIG.categoryId).not.toBe("");
  });
});
