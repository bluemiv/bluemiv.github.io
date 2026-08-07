import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const legacyRoot = path.resolve(projectRoot, "../bluemiv.github.io");
const articlesRoot = path.join(projectRoot, "src/articles");
const notesRoot = path.join(projectRoot, "src/notes");

const ARTICLE_SLUG_BY_LEGACY_KEY = {
  "algorithm/9": "two-pointers-algorithm",
  "algorithm/18": "sliding-window-algorithm",
  "algorithm/19": "hashmap-frequency-counting",
  "algorithm/20": "binary-search-algorithm",
  "firebase/26": "cloud-firestore-collections-and-documents",
  "frontend/7": "browser-rendering-reflow-repaint",
  "frontend/25": "html-semantic-elements",
  "frontend/27": "getting-started-with-bun",
  "go/10": "install-go-on-macos-with-homebrew",
  "go/11": "why-go-compiles-fast",
  "go/12": "go-basic-syntax-types-variables-operators",
  "go/13": "getting-started-with-gin-web-server",
  "go/15": "add-swagger-to-gin",
  "java/86": "plain-old-java-object",
  "javascript/24": "javascript-event-loop",
  "kotlin/87": "what-is-kotlin",
  "nextjs/1": "build-github-pages-blog-with-nextjs",
  "nextjs/4": "nextjs-dark-light-theme-without-flicker",
  "nextjs/5": "nextjs-pwa-blog-caching",
  "nextjs/17": "nextjs-google-analytics-4",
  "nextjs/22": "nextjs-utterances-comments-theme",
  "react/2": "react-useeffect-vs-uselayouteffect",
  "react/3": "react-feature-sliced-design",
  "react/6": "tailwindcss-vs-styled-components",
  "react/8": "typescript-type-naming-conventions",
  "react/14": "turborepo-react-storybook",
  "react/16": "prettier-plugin-sort-imports",
  "react/21": "react-wordle-troubleshooting",
  "react/23": "react-vitest-unit-testing",
  "spring/28": "spring-vs-spring-boot",
  "spring/29": "spring-boot-development-environment",
  "spring/30": "create-first-spring-boot-project",
  "spring/31": "spring-boot-project-structure",
  "spring/32": "spring-boot-application-configuration",
  "spring/33": "spring-ioc-and-dependency-injection",
  "spring/34": "spring-bean-and-component",
  "spring/35": "spring-autowired-dependency-injection",
  "spring/36": "spring-configuration-class",
  "spring/37": "spring-bean-lifecycle",
  "spring/38": "spring-bean-scope",
  "spring/39": "spring-restcontroller-basics",
  "spring/40": "spring-http-methods-request-mapping",
  "spring/41": "spring-requestparam-vs-pathvariable",
};

const NOTE_SLUG_BY_LEGACY_ID = {
  1: "nextjs-environment-variables",
  2: "database-index-basics",
};

function listMdxFiles(directory) {
  return fs
    .readdirSync(directory, { recursive: true })
    .map(String)
    .filter((file) => file.endsWith(".mdx") && !file.includes("_drafts/"));
}

function addMigrationMetadata(sourceMdx, metadataLines) {
  if (!sourceMdx.startsWith("---\n")) {
    throw new Error("Frontmatter must start on the first line");
  }

  return sourceMdx.replace("---\n", `---\n${metadataLines.join("\n")}\n`);
}

function normalizeMetadataNames(sourceMdx) {
  return sourceMdx
    .replace(/^createdAt:/m, "publishedAt:")
    .replace(/^updatedAt:/m, "modifiedAt:")
    .replace(/^release:/m, "isPublished:")
    .replace(/^thumbnail:/m, "coverImage:")
    .replace(/^author:.*\n/m, "");
}

function writeMdxFile(target, mdx) {
  if (fs.existsSync(target)) {
    throw new Error(`Refusing to overwrite existing MDX: ${target}`);
  }

  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, mdx);
}

function copyAssetDirectory(source, target) {
  if (!fs.existsSync(source)) return;
  if (fs.existsSync(target)) return;

  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.cpSync(source, target, { recursive: true, errorOnExist: true });
}

const legacyArticlesRoot = path.join(legacyRoot, "src/_posts");
const articleFiles = listMdxFiles(legacyArticlesRoot);

if (articleFiles.length !== Object.keys(ARTICLE_SLUG_BY_LEGACY_KEY).length) {
  throw new Error(
    `Article mapping mismatch: ${articleFiles.length} files, ${Object.keys(ARTICLE_SLUG_BY_LEGACY_KEY).length} slugs`,
  );
}

for (const relativeFile of articleFiles) {
  const key = relativeFile.replace(/\.mdx$/, "");
  const [topic, legacyId] = key.split("/");
  const slug = ARTICLE_SLUG_BY_LEGACY_KEY[key];

  if (!slug) throw new Error(`Missing article slug: ${key}`);

  const sourceMdx = fs.readFileSync(path.join(legacyArticlesRoot, relativeFile), "utf8");
  const migratedMdx = normalizeMetadataNames(
    addMigrationMetadata(sourceMdx, [
      `id: article-${legacyId.padStart(3, "0")}`,
      `slug: ${slug}`,
      "locale: ko",
      `topic: ${topic}`,
      "legacyPaths:",
      `  - /blog/${topic}/${legacyId}/`,
    ]),
  );

  writeMdxFile(path.join(articlesRoot, slug, "ko.mdx"), migratedMdx);
  copyAssetDirectory(
    path.join(legacyRoot, "public/r/i", topic, legacyId),
    path.join(projectRoot, "public/r/i", topic, legacyId),
  );
}

const legacyNotesRoot = path.join(legacyRoot, "src/_short");
const noteFiles = listMdxFiles(legacyNotesRoot);

if (noteFiles.length !== Object.keys(NOTE_SLUG_BY_LEGACY_ID).length) {
  throw new Error(
    `Note mapping mismatch: ${noteFiles.length} files, ${Object.keys(NOTE_SLUG_BY_LEGACY_ID).length} slugs`,
  );
}

for (const relativeFile of noteFiles) {
  const legacyId = relativeFile.replace(/\.mdx$/, "");
  const slug = NOTE_SLUG_BY_LEGACY_ID[legacyId];

  if (!slug) throw new Error(`Missing note slug: ${legacyId}`);

  const sourceMdx = fs.readFileSync(path.join(legacyNotesRoot, relativeFile), "utf8");
  const migratedMdx = normalizeMetadataNames(
    addMigrationMetadata(sourceMdx, [
      `id: note-${legacyId.padStart(3, "0")}`,
      `slug: ${slug}`,
      "locale: ko",
      "legacyPaths:",
      `  - /blog/short/${legacyId}/`,
    ]),
  );

  writeMdxFile(path.join(notesRoot, slug, "ko.mdx"), migratedMdx);
  copyAssetDirectory(
    path.join(legacyRoot, "public/r/i/short", legacyId),
    path.join(projectRoot, "public/r/i/short", legacyId),
  );
}

console.log(`Migrated ${articleFiles.length} articles and ${noteFiles.length} notes.`);
