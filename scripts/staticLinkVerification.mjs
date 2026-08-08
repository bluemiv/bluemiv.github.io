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

function getTagAttribute(tag, attributeName) {
  return tag.match(new RegExp(`\\b${attributeName}=["']([^"']*)["']`, "i"))?.[1];
}

function hasNoIndex(html) {
  return [...html.matchAll(/<meta\b[^>]*>/gi)].some((match) => {
    const name = getTagAttribute(match[0], "name")?.toLowerCase();
    const content = getTagAttribute(match[0], "content")?.toLowerCase() ?? "";
    return name === "robots" && content.split(",").some((value) => value.trim() === "noindex");
  });
}

function getHtmlTarget(outputDirectory, pathname) {
  return getTargetCandidates(outputDirectory, pathname).find((candidate) => {
    return (
      candidate.endsWith(".html") && fs.existsSync(candidate) && fs.statSync(candidate).isFile()
    );
  });
}

function getInstantRedirectPath(html, targetPath) {
  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    const httpEquiv = getTagAttribute(match[0], "http-equiv")?.toLowerCase();
    const content = getTagAttribute(match[0], "content") ?? "";
    if (httpEquiv !== "refresh") continue;

    const redirect = content.match(/^0\s*;\s*url\s*=\s*(.+)$/i)?.[1];
    if (!redirect) continue;

    return getInternalLinkPath(redirect, targetPath);
  }

  return null;
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

export function findIndirectStaticLinks(outputDirectory) {
  const indirectLinks = [];

  for (const filePath of getHtmlFiles(outputDirectory)) {
    const sourceRoute = getRouteFromHtmlFile(outputDirectory, filePath);
    const html = fs.readFileSync(filePath, "utf8");
    if (hasNoIndex(html)) continue;

    for (const match of html.matchAll(/href=["']([^"']+)["']/g)) {
      const targetPath = getInternalLinkPath(match[1], sourceRoute);
      if (!targetPath || targetPath.startsWith("/_next/")) continue;

      const targetFile = getHtmlTarget(outputDirectory, targetPath);
      if (!targetFile) continue;

      const destinationPath = getInstantRedirectPath(
        fs.readFileSync(targetFile, "utf8"),
        targetPath,
      );
      if (destinationPath) indirectLinks.push({ sourceRoute, targetPath, destinationPath });
    }
  }

  return Array.from(
    new Map(
      indirectLinks.map((indirectLink) => [
        `${indirectLink.sourceRoute} -> ${indirectLink.targetPath}`,
        indirectLink,
      ]),
    ).values(),
  );
}
