import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { findStaticSeoErrors } from "./staticSeoVerification.mjs";

const EXPECTED_ORIGIN = "https://bluemiv.github.io";
const TEMPORARY_DIRECTORIES = [];

function createOutputDirectory() {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "bluemiv-static-seo-"));
  TEMPORARY_DIRECTORIES.push(directory);
  return directory;
}

function writeFile(outputDirectory, relativePath, source = "") {
  const filePath = path.join(outputDirectory, relativePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, source);
}

function writeValidOutput(outputDirectory) {
  const feedLinks =
    '<link rel="alternate" type="application/atom+xml" href="/feed.xml" />' +
    '<link rel="alternate" type="application/rss+xml" href="/rss.xml" />';
  for (const route of ["", "en", "ja", "articles", "notes"]) {
    const pathname = route ? `/${route}/` : "/";
    const canonical = `${EXPECTED_ORIGIN}${pathname}`;
    const socialMetadata =
      `<link rel="canonical" href="${canonical}" />` +
      '<meta property="og:title" content="Title" />' +
      '<meta property="og:description" content="Description" />' +
      '<meta property="og:type" content="website" />' +
      '<meta property="og:locale" content="ko_KR" />' +
      '<meta property="og:site_name" content="Bluemiv Blog" />' +
      `<meta property="og:url" content="${canonical}" />` +
      `<meta property="og:image" content="${EXPECTED_ORIGIN}/og-default.webp" />` +
      '<meta name="twitter:card" content="summary_large_image" />' +
      '<meta name="twitter:title" content="Title" />' +
      '<meta name="twitter:description" content="Description" />' +
      `<meta name="twitter:image" content="${EXPECTED_ORIGIN}/og-default.webp" />`;
    const websiteStructuredData = route
      ? ""
      : `<script type="application/ld+json">${JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": `${EXPECTED_ORIGIN}/#website`,
          url: `${EXPECTED_ORIGIN}/`,
          name: "Bluemiv Blog",
          alternateName: "Bluemiv",
        })}</script>`;
    writeFile(
      outputDirectory,
      `${route ? `${route}/` : ""}index.html`,
      feedLinks + socialMetadata + websiteStructuredData,
    );
  }
  writeFile(outputDirectory, "og-default.webp", Buffer.alloc(5_001));
  writeFile(
    outputDirectory,
    "privacy/example/index.html",
    '<meta name="robots" content="noindex, follow" />',
  );
  writeFile(
    outputDirectory,
    "sitemap.xml",
    `<?xml version="1.0"?><urlset>${["/", "/en/", "/ja/", "/articles/", "/notes/"]
      .map((route) => `<url><loc>${EXPECTED_ORIGIN}${route}</loc></url>`)
      .join("")}</urlset>`,
  );
  writeFile(
    outputDirectory,
    "feed.xml",
    `<?xml version="1.0"?><feed xmlns="http://www.w3.org/2005/Atom"><link href="${EXPECTED_ORIGIN}/feed.xml" rel="self" /></feed>`,
  );
  writeFile(
    outputDirectory,
    "rss.xml",
    `<?xml version="1.0"?><rss version="2.0"><channel><atom:link href="${EXPECTED_ORIGIN}/rss.xml" rel="self" /></channel></rss>`,
  );
  writeFile(
    outputDirectory,
    "robots.txt",
    `User-Agent: *\nAllow: /\n\nSitemap: ${EXPECTED_ORIGIN}/sitemap.xml\nSitemap: ${EXPECTED_ORIGIN}/feed.xml\nSitemap: ${EXPECTED_ORIGIN}/rss.xml\n`,
  );
}

afterEach(() => {
  for (const directory of TEMPORARY_DIRECTORIES.splice(0)) {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

describe("staticSeoVerification", () => {
  it("정상 static SEO 산출물을 통과시킨다", () => {
    const outputDirectory = createOutputDirectory();
    writeValidOutput(outputDirectory);

    expect(findStaticSeoErrors(outputDirectory, EXPECTED_ORIGIN)).toEqual([]);
  });

  it("필수 검색 문서 누락을 보고한다", () => {
    const outputDirectory = createOutputDirectory();

    expect(findStaticSeoErrors(outputDirectory, EXPECTED_ORIGIN)).toEqual([
      "Missing SEO artifact: sitemap.xml",
      "Missing SEO artifact: feed.xml",
      "Missing SEO artifact: rss.xml",
      "Missing SEO artifact: robots.txt",
      "Missing SEO artifact: og-default.webp",
    ]);
  });

  it("색인 페이지의 OG와 Twitter Card 누락을 보고한다", () => {
    const outputDirectory = createOutputDirectory();
    writeValidOutput(outputDirectory);
    writeFile(
      outputDirectory,
      "notes/index.html",
      `<link rel="canonical" href="${EXPECTED_ORIGIN}/notes/" />`,
    );

    expect(findStaticSeoErrors(outputDirectory, EXPECTED_ORIGIN)).toEqual(
      expect.arrayContaining([
        "Page is missing og:title: /notes/",
        "Page is missing og:image: /notes/",
        "Page is missing twitter:image: /notes/",
        "Page has missing or wrong twitter:card: /notes/",
      ]),
    );
  });

  it("홈의 WebSite 구조화 데이터 누락을 보고한다", () => {
    const outputDirectory = createOutputDirectory();
    writeValidOutput(outputDirectory);
    const homePath = path.join(outputDirectory, "index.html");
    fs.writeFileSync(
      homePath,
      fs
        .readFileSync(homePath, "utf8")
        .replace(/<script type="application\/ld\+json">.*?<\/script>/, ""),
    );

    expect(findStaticSeoErrors(outputDirectory, EXPECTED_ORIGIN)).toEqual(
      expect.arrayContaining(["Home is missing WebSite structured data"]),
    );
  });

  it("사이트맵 중복·제외 경로와 policy noindex·feed discovery 누락을 보고한다", () => {
    const outputDirectory = createOutputDirectory();
    writeValidOutput(outputDirectory);
    writeFile(outputDirectory, "privacy/example/index.html", "<title>Privacy</title>");
    writeFile(outputDirectory, "articles/index.html", "<title>Articles</title>");
    const sitemapPath = path.join(outputDirectory, "sitemap.xml");
    const sitemap = fs
      .readFileSync(sitemapPath, "utf8")
      .replace(
        "</urlset>",
        `<url><loc>${EXPECTED_ORIGIN}/privacy/example/</loc></url><url><loc>${EXPECTED_ORIGIN}/articles/</loc></url><priority>1</priority></urlset>`,
      );
    fs.writeFileSync(sitemapPath, sitemap);

    expect(findStaticSeoErrors(outputDirectory, EXPECTED_ORIGIN)).toEqual(
      expect.arrayContaining([
        `Sitemap contains duplicate URLs: ${EXPECTED_ORIGIN}/articles/`,
        "Sitemap contains excluded path: /privacy/example/",
        "Sitemap contains ignored priority or changefreq values",
        "Policy page is missing noindex, follow: /privacy/example/",
        "Page is missing Atom discovery: /articles/",
        "Page is missing RSS discovery: /articles/",
      ]),
    );
  });

  it("잘못된 feed 표준·self URL·제외 경로와 robots 설정을 보고한다", () => {
    const outputDirectory = createOutputDirectory();
    writeValidOutput(outputDirectory);
    writeFile(
      outputDirectory,
      "feed.xml",
      `<feed><link href="${EXPECTED_ORIGIN}/privacy/example/" /></feed>`,
    );
    writeFile(
      outputDirectory,
      "rss.xml",
      `<rss version="1.0"><channel><link>${EXPECTED_ORIGIN}/apps/example/privacy/</link></channel></rss>`,
    );
    writeFile(outputDirectory, "robots.txt", "User-Agent: *\nDisallow: /\n");

    expect(findStaticSeoErrors(outputDirectory, EXPECTED_ORIGIN)).toEqual(
      expect.arrayContaining([
        "robots.txt is missing sitemap.xml",
        "robots.txt is missing feed.xml",
        "robots.txt is missing rss.xml",
        "robots.txt does not allow public crawling",
        "feed.xml is not Atom 1.0",
        "feed.xml has no canonical self link",
        "rss.xml is not RSS 2.0",
        "rss.xml has no canonical self link",
        "feed.xml contains excluded path: /privacy/example/",
        "rss.xml contains excluded path: /apps/example/privacy/",
      ]),
    );
  });

  it("상대 URL·정적 HTML 누락·필수 경로 누락을 보고한다", () => {
    const outputDirectory = createOutputDirectory();
    writeValidOutput(outputDirectory);
    const sitemapPath = path.join(outputDirectory, "sitemap.xml");
    const sitemap = fs
      .readFileSync(sitemapPath, "utf8")
      .replace(`<url><loc>${EXPECTED_ORIGIN}/ja/</loc></url>`, "")
      .replace(
        "</urlset>",
        `<url><loc>relative/path</loc></url><url><loc>${EXPECTED_ORIGIN}/missing/</loc></url></urlset>`,
      );
    fs.writeFileSync(sitemapPath, sitemap);

    expect(findStaticSeoErrors(outputDirectory, EXPECTED_ORIGIN)).toEqual(
      expect.arrayContaining([
        "Sitemap URL is not absolute: relative/path",
        "Sitemap URL has no static HTML: /missing/",
        "Sitemap is missing required path: /ja/",
      ]),
    );
  });
});
