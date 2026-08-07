import { describe, expect, it } from "vitest";

import { getPublishedArticles } from "@/features/article/articleRepository";
import { getLocalizedPath } from "@/features/i18n/localeConfig";
import { getPublishedNotes } from "@/features/note/noteRepository";

import { createLegacyRedirects, findLegacyRedirect } from "./legacyRedirects";

describe("legacyRedirects integration", () => {
  it("이관한 모든 article과 note에 고유 redirect를 만든다", () => {
    const redirects = createLegacyRedirects(
      getPublishedArticles("ko"),
      getPublishedNotes("ko"),
      (slug) => getLocalizedPath("ko", `articles/${slug}`),
      (slug) => getLocalizedPath("ko", `notes/${slug}`),
    );

    expect(redirects).toHaveLength(45);
    expect(
      new Set(redirects.map(({ legacySection, legacyId }) => `${legacySection}/${legacyId}`)).size,
    ).toBe(redirects.length);
    expect(findLegacyRedirect(redirects, "kotlin", "87")?.destination).toBe(
      "/articles/what-is-kotlin/",
    );
    expect(findLegacyRedirect(redirects, "short", "1")?.destination).toBe(
      "/notes/nextjs-environment-variables/",
    );
  });
});
