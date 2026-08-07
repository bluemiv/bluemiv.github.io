import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { inferPolicyLocale, sanitizePolicyHtml } from "./policyMigration.mjs";

const SCRIPT_DIRECTORY = dirname(fileURLToPath(import.meta.url));
const PROJECT_DIRECTORY = resolve(SCRIPT_DIRECTORY, "..");
const LEGACY_OUTPUT_DIRECTORY = resolve(PROJECT_DIRECTORY, "../bluemiv.github.io/out");
const TARGET_FILE = join(PROJECT_DIRECTORY, "src/features/policy/policyDocuments.generated.json");

const POLICY_SOURCE_PATHS = [
  "apps/berry-voca-starter/privacy.html",
  "apps/kpop-tube/account-deletion.html",
  "apps/kpop-tube/privacy.html",
  "apps/kpop-tube/privacy/en.html",
  "apps/kpop-tube/terms.html",
  "apps/kpop-tube/terms/en.html",
  "apps/lottocat645/privacy.html",
  "apps/potion-sort-quest/privacy.html",
  "apps/potion-sort-quest/privacy/en.html",
  "apps/potion-sort-quest/privacy/jp.html",
  "blim/account-deletion.html",
  "privacy/ai-wallpaper/en.html",
  "privacy/ai-wallpaper/jp.html",
  "privacy/ai-wallpaper/ko.html",
  "privacy/blim/en.html",
  "privacy/blim/jp.html",
  "privacy/blim/ko.html",
  "privacy/easy-dots/en.html",
  "privacy/easy-dots/ko.html",
  "privacy/kpop/cn.html",
  "privacy/kpop/en.html",
  "privacy/kpop/jp.html",
  "privacy/kpop/ko.html",
  "privacy/luna.html",
  "privacy/musepiece/en.html",
  "privacy/musepiece/jp.html",
  "privacy/musepiece/ko.html",
  "privacy/pixel-blur/en.html",
  "privacy/pixel-blur/ko.html",
  "privacy/pomodoro-flow/en.html",
  "privacy/pomodoro-flow/ko.html",
];

const POLICY_LOCALE_OVERRIDES = {
  "apps/kpop-tube/account-deletion.html": "en",
  "blim/account-deletion.html": "en",
};

const LEGACY_POLICY_APP_NAMES = {
  "ai-wallpaper": "AI Wallpaper",
  blim: "Blim",
  "easy-dots": "Easy Dots",
  kpop: "KPOP Clip",
  luna: "Luna",
  musepiece: "Musepiece",
  "pixel-blur": "Pixel Blur",
  "pomodoro-flow": "Pomodoro Flow",
};

function getMetadataOverride(sourcePath) {
  if (sourcePath === "blim/account-deletion.html") {
    return {
      title: "Blim Account Deletion Guide",
      description: "How to delete a Blim account and associated service data.",
    };
  }

  const legacyMatch = sourcePath.match(/^privacy\/([^/]+)(?:\/[^/]+)?\.html$/);
  const appName = legacyMatch ? LEGACY_POLICY_APP_NAMES[legacyMatch[1]] : undefined;
  return appName
    ? {
        title: `${appName} Privacy Policy`,
        description: `Privacy Policy for ${appName}.`,
      }
    : undefined;
}

function readXpath(sourceFile, xpath) {
  return execFileSync("xmllint", ["--html", "--xpath", xpath, sourceFile], {
    encoding: "utf8",
    maxBuffer: 5 * 1024 * 1024,
    stdio: ["ignore", "pipe", "ignore"],
  }).trim();
}

function toRoutePath(sourcePath) {
  return `/${sourcePath.replace(/(?:\/index)?\.html$/, "")}/`.replace(/\/{2,}/g, "/");
}

const documents = POLICY_SOURCE_PATHS.map((sourcePath) => {
  const sourceFile = join(LEGACY_OUTPUT_DIRECTORY, sourcePath);
  readFileSync(sourceFile);

  const path = toRoutePath(sourcePath);
  const metadataOverride = getMetadataOverride(sourcePath);
  const title = metadataOverride?.title ?? readXpath(sourceFile, "string(//title)");
  const description =
    metadataOverride?.description ??
    (readXpath(sourceFile, 'string(//meta[@name="description"]/@content)') || title);
  const mainHtml = readXpath(sourceFile, "//main");

  return {
    path,
    title,
    description,
    locale: POLICY_LOCALE_OVERRIDES[sourcePath] ?? inferPolicyLocale(path),
    html: sanitizePolicyHtml(mainHtml),
  };
});

mkdirSync(dirname(TARGET_FILE), { recursive: true });
writeFileSync(TARGET_FILE, `${JSON.stringify(documents, null, 2)}\n`);

console.log(`Migrated ${documents.length} policy documents to ${TARGET_FILE}`);
