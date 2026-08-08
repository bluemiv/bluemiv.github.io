import path from "node:path";

import { findStaticSearchErrors } from "./staticSearchVerification.mjs";

const outputDirectory = path.join(process.cwd(), "out");
const errors = findStaticSearchErrors(outputDirectory);

if (errors.length) {
  console.error("Static export contains search artifact errors:");
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log("Static search artifact verification passed.");
}
