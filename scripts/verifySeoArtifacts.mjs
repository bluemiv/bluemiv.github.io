import path from "node:path";

import { findStaticSeoErrors } from "./staticSeoVerification.mjs";

const outputDirectory = path.join(process.cwd(), "out");
const errors = findStaticSeoErrors(outputDirectory, "https://bluemiv.github.io");

if (errors.length) {
  console.error("Static export contains SEO artifact errors:");
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log("Static SEO artifact verification passed.");
}
