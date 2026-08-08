import fs from "node:fs";
import path from "node:path";

const SKIPPED_LINK_PATTERN = /^(?:https?:|\/\/|mailto:|tel:|javascript:|data:|#)/i;

function getHtmlFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) return getHtmlFiles(filePath);
    return entry.name.endsWith(".html") ? [filePath] : [];
  });
}

function getRouteFromHtmlFile(outputDirectory, filePath) {
  const relativePath = path.relative(outputDirectory, filePath).split(path.sep).join("/");

  if (relativePath === "index.html") return "/";
  if (relativePath.endsWith("/index.html")) {
    return `/${relativePath.slice(0, -"index.html".length)}`;
  }

  return `/${relativePath}`;
}

function getInternalLinkPath(href, sourceRoute) {
  const decodedHref = href.replaceAll("&amp;", "&");
  if (SKIPPED_LINK_PATTERN.test(decodedHref)) return null;

  return new URL(decodedHref, `https://static.local${sourceRoute}`).pathname;
}

function getTargetCandidates(outputDirectory, pathname) {
  let decodedPath;

  try {
    decodedPath = decodeURIComponent(pathname);
  } catch {
    return [];
  }

  const relativePath = decodedPath.replace(/^\/+/, "");
  const directPath = path.join(outputDirectory, relativePath);

  if (decodedPath.endsWith("/")) return [path.join(directPath, "index.html")];

  return [directPath, path.join(directPath, "index.html"), `${directPath}.html`];
}

export function findBrokenStaticLinks(outputDirectory) {
  const brokenLinks = [];

  for (const filePath of getHtmlFiles(outputDirectory)) {
    const sourceRoute = getRouteFromHtmlFile(outputDirectory, filePath);
    const html = fs.readFileSync(filePath, "utf8");

    for (const match of html.matchAll(/href=["']([^"']+)["']/g)) {
      const targetPath = getInternalLinkPath(match[1], sourceRoute);
      if (!targetPath || targetPath.startsWith("/_next/")) continue;

      const hasTarget = getTargetCandidates(outputDirectory, targetPath).some((candidate) => {
        return fs.existsSync(candidate);
      });

      if (!hasTarget) brokenLinks.push({ sourceRoute, targetPath });
    }
  }

  return Array.from(
    new Map(
      brokenLinks.map((brokenLink) => [
        `${brokenLink.sourceRoute} -> ${brokenLink.targetPath}`,
        brokenLink,
      ]),
    ).values(),
  );
}
