export type ArticleHeadingOffset = {
  id: string;
  offsetTop: number;
};

export const ARTICLE_READING_HEADER_SLOT_ID = "article-reading-header-slot";

type ArticleReadingGeometry = {
  articleHeight: number;
  articleTop: number;
  headerHeight: number;
  scrollY: number;
  viewportHeight: number;
};

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(Math.max(value, minimum), maximum);
}

export function getArticleReadingPercentage({
  articleHeight,
  articleTop,
  headerHeight,
  scrollY,
  viewportHeight,
}: ArticleReadingGeometry): number {
  const readingStart = Math.max(0, articleTop - headerHeight);
  const naturalReadingEnd = articleTop + articleHeight - viewportHeight;
  const minimumReadingDistance = Math.min(articleHeight, viewportHeight * 0.5);
  const readingEnd = Math.max(
    readingStart + Math.max(1, minimumReadingDistance),
    naturalReadingEnd,
  );
  const percentage = ((scrollY - readingStart) / (readingEnd - readingStart)) * 100;

  return Math.round(clamp(percentage, 0, 100));
}

export function getActiveArticleHeadingId(
  headingOffsets: readonly ArticleHeadingOffset[],
  readingPosition: number,
): string {
  if (!headingOffsets.length) return "";

  let activeHeadingId = headingOffsets[0].id;

  for (const heading of headingOffsets) {
    if (heading.offsetTop > readingPosition) break;
    activeHeadingId = heading.id;
  }

  return activeHeadingId;
}
