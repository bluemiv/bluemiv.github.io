export const GISCUS_ORIGIN = "https://giscus.app";
export const GISCUS_SCRIPT_URL = `${GISCUS_ORIGIN}/client.js`;

export const COMMENT_CONFIG = {
  repository: "bluemiv/githubblog-comment",
  repositoryId: "R_kgDOOzCk2w",
  category: "Announcements",
  categoryId: "DIC_kwDOOzCk284DC_ps",
} as const;

export type CommentTheme = "light" | "transparent_dark";
export type CommentLocale = "ko" | "en" | "ja";

export function getCommentDiscussionTerm(articleId: string): string {
  return articleId;
}

export function getCommentLanguage(locale: CommentLocale): CommentLocale {
  return locale;
}

export function getCommentTheme(isDark: boolean): CommentTheme {
  return isDark ? "transparent_dark" : "light";
}
