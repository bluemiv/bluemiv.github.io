import path from "node:path";

import { findBrokenStaticLinks } from "./staticLinkVerification.mjs";

const outputDirectory = path.join(process.cwd(), "out");
const brokenLinks = findBrokenStaticLinks(outputDirectory);

if (brokenLinks.length) {
  console.error("Static export contains broken internal links:");
  for (const { sourceRoute, targetPath } of brokenLinks) {
    console.error(`- ${sourceRoute} -> ${targetPath}`);
  }
  process.exitCode = 1;
} else {
  console.log("Static link verification passed.");
}
