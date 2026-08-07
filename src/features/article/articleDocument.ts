import GithubSlugger from "github-slugger";

export type ArticleHeading = {
  id: string;
  number: string;
  title: string;
  depth: 2 | 3;
};

const KOREAN_CHARACTERS_PER_MINUTE = 500;
const LATIN_WORDS_PER_MINUTE = 220;
const CODE_LINES_PER_MINUTE = 12;
const HEADING_NUMBER_PATTERN = /^\s*\d+(?:\.\d+)*\.?\s+/;

function splitMarkdown(source: string) {
  const proseLines: string[] = [];
  let codeLineCount = 0;
  let fence: { marker: "`" | "~"; length: number } | null = null;

  for (const line of source.split(/\r?\n/)) {
    const fenceMatch = line.match(/^\s*(`{3,}|~{3,})/);

    if (fenceMatch) {
      const marker = fenceMatch[1][0] as "`" | "~";

      if (!fence) {
        fence = { marker, length: fenceMatch[1].length };
        continue;
      }

      if (fence.marker === marker && fenceMatch[1].length >= fence.length) {
        fence = null;
        continue;
      }
    }

    if (fence) {
      if (line.trim()) codeLineCount += 1;
      continue;
    }

    proseLines.push(line);
  }

  return { prose: proseLines.join("\n"), codeLineCount };
}

function getPlainHeadingTitle(markdown: string): string {
  return markdown
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/[`*_~]/g, "")
    .replace(/\\([\\`*{}\[\]()#+.!_>-])/g, "$1")
    .trim();
}

export function extractArticleHeadings(source: string): ArticleHeading[] {
  const { prose } = splitMarkdown(source);
  const slugger = new GithubSlugger();
  let sectionNumber = 0;
  let subsectionNumber = 0;

  return prose.split("\n").flatMap((line) => {
    const match = line.match(/^(#{2,3})[\t ]+(.+?)[\t ]*#*[\t ]*$/);

    if (!match) return [];

    const rawTitle = getPlainHeadingTitle(match[2]);
    const title = rawTitle.replace(HEADING_NUMBER_PATTERN, "");
    if (!title) return [];

    const depth = match[1].length as 2 | 3;

    if (depth === 2) {
      sectionNumber += 1;
      subsectionNumber = 0;
    } else {
      subsectionNumber += 1;
    }

    const number =
      depth === 2
        ? String(sectionNumber).padStart(2, "0")
        : `${String(sectionNumber).padStart(2, "0")}.${String(subsectionNumber).padStart(2, "0")}`;

    return [
      {
        id: slugger.slug(rawTitle),
        number,
        title,
        depth,
      },
    ];
  });
}

export function getArticleReadingTime(source: string): number {
  const { prose, codeLineCount } = splitMarkdown(source);
  const normalizedProse = prose
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ");
  const koreanCharacterCount = normalizedProse.match(/[가-힣]/g)?.length ?? 0;
  const latinWordCount = normalizedProse.match(/[A-Za-z0-9]+(?:['.-][A-Za-z0-9]+)*/g)?.length ?? 0;
  const minutes =
    koreanCharacterCount / KOREAN_CHARACTERS_PER_MINUTE +
    latinWordCount / LATIN_WORDS_PER_MINUTE +
    codeLineCount / CODE_LINES_PER_MINUTE;

  return Math.max(1, Math.ceil(minutes));
}
