import path from "node:path";

import { collectTypographyViolations } from "./typographyVerification.mjs";

const sourceDirectory = path.resolve(process.cwd(), "src");
const violations = collectTypographyViolations(sourceDirectory);

if (violations.length) {
  const details = violations
    .map(({ filePath, line, value, reason }) => {
      return `${path.relative(process.cwd(), filePath)}:${line} ${value} — ${reason}`;
    })
    .join("\n");

  throw new Error(`타이포그래피 규칙 위반 ${violations.length}건:\n${details}`);
}

console.log("Typography verification passed.");
