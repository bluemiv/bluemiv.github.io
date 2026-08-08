const ARTICLE_ID_PATTERN = /^article-(\d+)$/;

export function getArticleNumber(id: string): string {
  const digits = id.match(ARTICLE_ID_PATTERN)?.[1];

  if (!digits) return "000";

  return digits.replace(/^0+(?=\d)/, "").padStart(3, "0");
}
