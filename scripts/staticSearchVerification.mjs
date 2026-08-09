import fs from "node:fs";
import path from "node:path";

const REQUIRED_PAGEFIND_FILES = ["pagefind.js", "pagefind-entry.json"];
const REQUIRED_INDEX_EXTENSIONS = [".pf_fragment", ".pf_index", ".pf_meta"];
const SEARCH_DETAIL_ROUTE_PATTERN = /^\/(?:(?:en|ja)\/)?(?:articles|notes)\/[^/]+\/$/;

function getFiles(directory, extension) {
  if (!fs.existsSync(directory)) return [];

  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) return getFiles(filePath, extension);
    return !extension || entry.name.endsWith(extension) ? [filePath] : [];
  });
}

function getRouteFromHtmlFile(outputDirectory, filePath) {
  const relativePath = path.relative(outputDirectory, filePath).split(path.sep).join("/");
  if (relativePath === "index.html") return "/";
  return `/${relativePath.replace(/index\.html$/, "")}`;
}

function hasPagefindBody(html) {
  return /\bdata-pagefind-body(?:=(?:"true"|'true'|""|''))?/.test(html);
}

function isSearchDetailRoute(route) {
  return SEARCH_DETAIL_ROUTE_PATTERN.test(route);
}

export function findStaticSearchErrors(outputDirectory) {
  const errors = [];
  const pagefindDirectory = path.join(outputDirectory, "pagefind");

  for (const requiredFile of REQUIRED_PAGEFIND_FILES) {
    if (!fs.existsSync(path.join(pagefindDirectory, requiredFile))) {
      errors.push(`Missing Pagefind artifact: ${requiredFile}`);
    }
  }

  if (errors.length) return errors;

  const pagefindFiles = getFiles(pagefindDirectory);
  for (const extension of REQUIRED_INDEX_EXTENSIONS) {
    if (!pagefindFiles.some((filePath) => filePath.endsWith(extension))) {
      errors.push(`Pagefind index has no ${extension} file`);
    }
  }

  const indexedRoutes = [];
  for (const htmlFile of getFiles(outputDirectory, ".html")) {
    const route = getRouteFromHtmlFile(outputDirectory, htmlFile);
    const html = fs.readFileSync(htmlFile, "utf8");
    const isDetailRoute = isSearchDetailRoute(route);
    const isIndexed = hasPagefindBody(html);

    if (isIndexed) indexedRoutes.push(route);
    if (isIndexed && !isDetailRoute) errors.push(`Unexpected page is marked for search: ${route}`);
    if (isDetailRoute && !isIndexed) errors.push(`Search detail page is not indexed: ${route}`);

    if (isIndexed) {
      if (!html.includes('data-pagefind-meta="title"')) {
        errors.push(`Indexed page has no title metadata: ${route}`);
      }
      if (!html.includes('data-pagefind-meta="description"')) {
        errors.push(`Indexed page has no description metadata: ${route}`);
      }
      if (!/data-pagefind-filter="type:(?:article|note)"/.test(html)) {
        errors.push(`Indexed page has no document type filter: ${route}`);
      }
      if (!html.includes('data-pagefind-weight="10"')) {
        errors.push(`Indexed page has no weighted title context: ${route}`);
      }
    }
  }

  if (!indexedRoutes.some((route) => route.startsWith("/articles/"))) {
    errors.push("Search index contains no article detail page");
  }
  if (!indexedRoutes.some((route) => route.startsWith("/notes/"))) {
    errors.push("Search index contains no note detail page");
  }

  try {
    const entry = JSON.parse(
      fs.readFileSync(path.join(pagefindDirectory, "pagefind-entry.json"), "utf8"),
    );
    const indexedPageCount = Object.values(entry.languages ?? {}).reduce(
      (total, language) => total + Number(language?.page_count ?? 0),
      0,
    );

    if (!entry.languages?.ko) errors.push("Pagefind index has no Korean language index");
    if (indexedRoutes.some((route) => route.startsWith("/ja/")) && !entry.languages?.ja) {
      errors.push("Pagefind index has no Japanese language index");
    }
    if (indexedRoutes.some((route) => route.startsWith("/en/")) && !entry.languages?.en) {
      errors.push("Pagefind index has no English language index");
    }
    if (indexedPageCount !== indexedRoutes.length) {
      errors.push(
        `Pagefind page count differs from marked pages: ${indexedPageCount} !== ${indexedRoutes.length}`,
      );
    }
  } catch {
    errors.push("Pagefind entry metadata is invalid JSON");
  }

  return errors;
}
