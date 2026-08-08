import GithubSlugger from "github-slugger";

export type NoteHeading = {
  id: string;
  number: string;
  title: string;
};

const HEADING_NUMBER_PATTERN = /^\s*\d+(?:\.\d+)*\.?\s+/;
export const NOTE_TABLE_OF_CONTENTS_MINIMUM_HEADINGS = 3;

function getMarkdownWithoutCodeFences(source: string): string {
  const lines: string[] = [];
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

    if (!fence) lines.push(line);
  }

  return lines.join("\n");
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

export function extractNoteHeadings(source: string): NoteHeading[] {
  const slugger = new GithubSlugger();
  let sectionNumber = 0;

  return getMarkdownWithoutCodeFences(source)
    .split("\n")
    .flatMap((line) => {
      const match = line.match(/^##[\t ]+(.+?)[\t ]*#*[\t ]*$/);
      if (!match) return [];

      const rawTitle = getPlainHeadingTitle(match[1]);
      const title = rawTitle.replace(HEADING_NUMBER_PATTERN, "");
      if (!title) return [];

      sectionNumber += 1;

      return [
        {
          id: slugger.slug(rawTitle),
          number: String(sectionNumber).padStart(2, "0"),
          title,
        },
      ];
    });
}

export function shouldShowNoteTableOfContents(headings: readonly NoteHeading[]): boolean {
  return headings.length >= NOTE_TABLE_OF_CONTENTS_MINIMUM_HEADINGS;
}
