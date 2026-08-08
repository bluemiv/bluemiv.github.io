import path from "node:path";

import { findBrokenStaticLinks, findIndirectStaticLinks } from "./staticLinkVerification.mjs";

const outputDirectory = path.join(process.cwd(), "out");
const brokenLinks = findBrokenStaticLinks(outputDirectory);
const indirectLinks = findIndirectStaticLinks(outputDirectory);

if (brokenLinks.length) {
  console.error("Static export contains broken internal links:");
  for (const { sourceRoute, targetPath } of brokenLinks) {
    console.error(`- ${sourceRoute} -> ${targetPath}`);
  }
  process.exitCode = 1;
}

if (indirectLinks.length) {
  console.error("Static export contains internal links through redirect pages:");
  for (const { sourceRoute, targetPath, destinationPath } of indirectLinks) {
    console.error(`- ${sourceRoute} -> ${targetPath} -> ${destinationPath}`);
  }
  process.exitCode = 1;
}

if (!brokenLinks.length && !indirectLinks.length) {
  console.log("Static link verification passed.");
}
