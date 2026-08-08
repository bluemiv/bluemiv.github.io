import fs from "node:fs";
import path from "node:path";

const REQUIRED_FILES = ["sitemap.xml", "feed.xml", "rss.xml", "robots.txt", "og-default.webp"];
const REQUIRED_SITEMAP_PATHS = ["/", "/en/", "/ja/", "/articles/", "/notes/"];
const FORBIDDEN_SEARCH_PATH_PATTERN =
  /^\/(?:privacy|blog|ko)(?:\/|$)|^\/apps\/$|^\/apps\/[^/]+\/(?:privacy|terms|account-deletion)(?:\/|$)|\/(?:terms|account-deletion)(?:\/|$)/;
const POLICY_ROUTE_PATTERN =
  /^\/privacy(?:\/|$)|^\/apps\/[^/]+\/(?:privacy|terms|account-deletion)(?:\/|$)|\/account-deletion(?:\/|$)/;

function getFiles(directory, extension) {
  if (!fs.existsSync(directory)) return [];

  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) return getFiles(filePath, extension);
    return entry.name.endsWith(extension) ? [filePath] : [];
  });
}

function getXmlTagValues(xml, tagName) {
  return [...xml.matchAll(new RegExp(`<${tagName}>([^<]+)</${tagName}>`, "g"))].map(
    (match) => match[1],
  );
}

function getRouteFromHtmlFile(outputDirectory, filePath) {
  const relativePath = path.relative(outputDirectory, filePath).split(path.sep).join("/");
  if (relativePath === "index.html") return "/";
  return `/${relativePath.replace(/index\.html$/, "")}`;
}

function hasNoIndexFollow(html) {
  return [...html.matchAll(/<meta\b[^>]*>/g)].some((match) => {
    const meta = match[0];
    const name = meta.match(/\bname=["']([^"']+)["']/)?.[1];
    const content = meta.match(/\bcontent=["']([^"']+)["']/)?.[1] ?? "";
    const directives = content.split(",").map((directive) => directive.trim());
    return name === "robots" && directives.includes("noindex") && directives.includes("follow");
  });
}

function hasFeedDiscovery(html, mimeType, feedPath) {
  return [...html.matchAll(/<link\b[^>]*>/g)].some((match) => {
    const link = match[0];
    return (
      link.includes('rel="alternate"') &&
      link.includes(`type="${mimeType}"`) &&
      link.includes(`href="${feedPath}"`)
    );
  });
}

function getTagAttribute(tag, attributeName) {
  return tag.match(new RegExp(`\\b${attributeName}=["']([^"']*)["']`))?.[1];
}

function getMetaContent(html, attributeName, attributeValue) {
  for (const match of html.matchAll(/<meta\b[^>]*>/g)) {
    if (getTagAttribute(match[0], attributeName) === attributeValue) {
      return getTagAttribute(match[0], "content");
    }
  }

  return undefined;
}

function getCanonicalHref(html) {
  for (const match of html.matchAll(/<link\b[^>]*>/g)) {
    if (getTagAttribute(match[0], "rel") === "canonical") {
      return getTagAttribute(match[0], "href");
    }
  }

  return undefined;
}

function getStructuredDataNodes(html, errors, route) {
  const nodes = [];

  for (const match of html.matchAll(
    /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    try {
      const structuredData = JSON.parse(match[1]);
      nodes.push(structuredData);
      if (Array.isArray(structuredData?.["@graph"])) nodes.push(...structuredData["@graph"]);
    } catch {
      errors.push(`Page has invalid JSON-LD: ${route}`);
    }
  }

  return nodes;
}

function validateWebsiteStructuredData(errors, expectedOrigin, html) {
  const website = getStructuredDataNodes(html, errors, "/").find(
    (node) => node?.["@type"] === "WebSite",
  );
  const expectedUrl = `${expectedOrigin}/`;

  if (!website) {
    errors.push("Home is missing WebSite structured data");
    return;
  }

  if (website.url !== expectedUrl || website["@id"] !== `${expectedUrl}#website`) {
    errors.push("Home WebSite structured data has a wrong canonical URL");
  }
  if (!website.name || !website.alternateName) {
    errors.push("Home WebSite structured data is missing site names");
  }
}

function validateSocialMetadata(errors, outputDirectory, route, expectedUrl, html) {
  if (getCanonicalHref(html) !== expectedUrl) {
    errors.push(`Page has missing or wrong canonical: ${route}`);
  }

  for (const property of ["og:title", "og:description", "og:type", "og:locale", "og:site_name"]) {
    if (!getMetaContent(html, "property", property)) {
      errors.push(`Page is missing ${property}: ${route}`);
    }
  }

  if (getMetaContent(html, "property", "og:url") !== expectedUrl) {
    errors.push(`Page has missing or wrong og:url: ${route}`);
  }

  const openGraphImage = getMetaContent(html, "property", "og:image");
  if (!openGraphImage) {
    errors.push(`Page is missing og:image: ${route}`);
  } else {
    let imageUrl;
    try {
      imageUrl = new URL(openGraphImage);
    } catch {
      errors.push(`Page og:image is not absolute: ${route}`);
    }

    if (imageUrl) {
      const imagePath = path.join(outputDirectory, imageUrl.pathname.replace(/^\/+/, ""));
      if (imageUrl.origin !== new URL(expectedUrl).origin || !fs.existsSync(imagePath)) {
        errors.push(`Page og:image has no local static asset: ${route}`);
      }
    }
  }

  for (const name of ["twitter:title", "twitter:description", "twitter:image"]) {
    if (!getMetaContent(html, "name", name)) {
      errors.push(`Page is missing ${name}: ${route}`);
    }
  }

  if (getMetaContent(html, "name", "twitter:card") !== "summary_large_image") {
    errors.push(`Page has missing or wrong twitter:card: ${route}`);
  }
}

function getStaticHtmlPath(outputDirectory, pathname) {
  return path.join(outputDirectory, pathname.replace(/^\/+/, ""), "index.html");
}

export function findStaticSeoErrors(outputDirectory, expectedOrigin) {
  const errors = [];

  for (const requiredFile of REQUIRED_FILES) {
    if (!fs.existsSync(path.join(outputDirectory, requiredFile))) {
      errors.push(`Missing SEO artifact: ${requiredFile}`);
    }
  }

  if (errors.length) return errors;

  const sitemap = fs.readFileSync(path.join(outputDirectory, "sitemap.xml"), "utf8");
  const atom = fs.readFileSync(path.join(outputDirectory, "feed.xml"), "utf8");
  const rss = fs.readFileSync(path.join(outputDirectory, "rss.xml"), "utf8");
  const robots = fs.readFileSync(path.join(outputDirectory, "robots.txt"), "utf8");
  const sitemapUrls = getXmlTagValues(sitemap, "loc");
  const duplicateUrls = sitemapUrls.filter((url, index) => sitemapUrls.indexOf(url) !== index);

  if (fs.statSync(path.join(outputDirectory, "og-default.webp")).size <= 5_000) {
    errors.push("Default social image must be larger than 5,000 bytes");
  }

  if (!sitemapUrls.length) errors.push("Sitemap contains no URLs");
  if (duplicateUrls.length)
    errors.push(`Sitemap contains duplicate URLs: ${duplicateUrls.join(", ")}`);

  for (const url of sitemapUrls) {
    let parsedUrl;
    try {
      parsedUrl = new URL(url);
    } catch {
      errors.push(`Sitemap URL is not absolute: ${url}`);
      continue;
    }

    if (parsedUrl.origin !== expectedOrigin) errors.push(`Sitemap URL has wrong origin: ${url}`);
    if (FORBIDDEN_SEARCH_PATH_PATTERN.test(parsedUrl.pathname)) {
      errors.push(`Sitemap contains excluded path: ${parsedUrl.pathname}`);
    }
    const htmlPath = getStaticHtmlPath(outputDirectory, parsedUrl.pathname);
    if (!fs.existsSync(htmlPath)) {
      errors.push(`Sitemap URL has no static HTML: ${parsedUrl.pathname}`);
    } else if (parsedUrl.origin === expectedOrigin) {
      validateSocialMetadata(
        errors,
        outputDirectory,
        parsedUrl.pathname,
        url,
        fs.readFileSync(htmlPath, "utf8"),
      );
    }
  }

  for (const requiredPath of REQUIRED_SITEMAP_PATHS) {
    if (!sitemapUrls.includes(`${expectedOrigin}${requiredPath}`)) {
      errors.push(`Sitemap is missing required path: ${requiredPath}`);
    }
  }

  if (/<(?:priority|changefreq)>/.test(sitemap)) {
    errors.push("Sitemap contains ignored priority or changefreq values");
  }

  const searchDocuments = [
    ["sitemap.xml", `${expectedOrigin}/sitemap.xml`],
    ["feed.xml", `${expectedOrigin}/feed.xml`],
    ["rss.xml", `${expectedOrigin}/rss.xml`],
  ];
  for (const [fileName, url] of searchDocuments) {
    if (!robots.includes(`Sitemap: ${url}`)) {
      errors.push(`robots.txt is missing ${fileName}`);
    }
  }
  if (!/User-Agent:\s*\*\s+Allow:\s*\//.test(robots)) {
    errors.push("robots.txt does not allow public crawling");
  }

  if (!atom.includes('xmlns="http://www.w3.org/2005/Atom"')) {
    errors.push("feed.xml is not Atom 1.0");
  }
  if (!atom.includes(`href="${expectedOrigin}/feed.xml" rel="self"`)) {
    errors.push("feed.xml has no canonical self link");
  }
  if (!rss.includes('<rss version="2.0"')) errors.push("rss.xml is not RSS 2.0");
  if (!rss.includes(`href="${expectedOrigin}/rss.xml" rel="self"`)) {
    errors.push("rss.xml has no canonical self link");
  }

  for (const [fileName, xml] of [
    ["feed.xml", atom],
    ["rss.xml", rss],
  ]) {
    const urls = [...xml.matchAll(/https:\/\/[^<"\s]+/g)].map((match) => match[0]);
    for (const url of urls) {
      const pathname = new URL(url.replace(/&amp;/g, "&")).pathname;
      if (FORBIDDEN_SEARCH_PATH_PATTERN.test(pathname)) {
        errors.push(`${fileName} contains excluded path: ${pathname}`);
      }
    }
  }

  for (const htmlFile of getFiles(outputDirectory, ".html")) {
    const route = getRouteFromHtmlFile(outputDirectory, htmlFile);
    if (!POLICY_ROUTE_PATTERN.test(route)) continue;

    if (!hasNoIndexFollow(fs.readFileSync(htmlFile, "utf8"))) {
      errors.push(`Policy page is missing noindex, follow: ${route}`);
    }
  }

  for (const route of ["/", "/articles/"]) {
    const htmlPath = getStaticHtmlPath(outputDirectory, route);
    const html = fs.readFileSync(htmlPath, "utf8");
    if (!hasFeedDiscovery(html, "application/atom+xml", "/feed.xml")) {
      errors.push(`Page is missing Atom discovery: ${route}`);
    }
    if (!hasFeedDiscovery(html, "application/rss+xml", "/rss.xml")) {
      errors.push(`Page is missing RSS discovery: ${route}`);
    }
  }

  validateWebsiteStructuredData(
    errors,
    expectedOrigin,
    fs.readFileSync(getStaticHtmlPath(outputDirectory, "/"), "utf8"),
  );

  return errors;
}
