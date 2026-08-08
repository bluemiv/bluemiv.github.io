import fs from "node:fs";
import path from "node:path";

const SOURCE_EXTENSIONS = new Set([".css", ".ts", ".tsx"]);
const TYPOGRAPHY_PATTERNS = [
  {
    pattern: /\btext-micro\b/g,
    reason: "12px 미만의 text-micro는 사용할 수 없습니다.",
  },
  {
    pattern: /\btext-\[[^\]]+\]/g,
    reason: "font size는 Tailwind 표준 단계로 지정해야 합니다.",
  },
];
const DIRECT_CSS_FONT_SIZE_PATTERN = /font-size\s*:\s*(?:clamp\(|[\d.]+(?:px|rem))/g;

function getSourceFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) return getSourceFiles(filePath);
    return SOURCE_EXTENSIONS.has(path.extname(entry.name)) ? [filePath] : [];
  });
}

function getLineNumber(source, offset) {
  return source.slice(0, offset).split("\n").length;
}

export function findTypographyViolations(filePath, source) {
  const violations = TYPOGRAPHY_PATTERNS.flatMap(({ pattern, reason }) =>
    Array.from(source.matchAll(pattern), (match) => ({
      filePath,
      line: getLineNumber(source, match.index),
      value: match[0],
      reason,
    })),
  );

  if (path.extname(filePath) !== ".css") return violations;

  return [
    ...violations,
    ...Array.from(source.matchAll(DIRECT_CSS_FONT_SIZE_PATTERN), (match) => ({
      filePath,
      line: getLineNumber(source, match.index),
      value: match[0],
      reason: "CSS font size는 Tailwind type token을 사용해야 합니다.",
    })),
  ];
}

export function collectTypographyViolations(sourceDirectory) {
  return getSourceFiles(sourceDirectory).flatMap((filePath) =>
    findTypographyViolations(filePath, fs.readFileSync(filePath, "utf8")),
  );
}
