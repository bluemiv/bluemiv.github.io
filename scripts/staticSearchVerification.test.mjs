import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { findStaticSearchErrors } from "./staticSearchVerification.mjs";

const TEMPORARY_DIRECTORIES = [];

function createOutputDirectory() {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "bluemiv-static-search-"));
  TEMPORARY_DIRECTORIES.push(directory);
  return directory;
}

function writeFile(outputDirectory, relativePath, source = "") {
  const filePath = path.join(outputDirectory, relativePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, source);
}

function getIndexedHtml(type) {
  return (
    `<article data-pagefind-filter="type:${type}">` +
    '<h1 data-pagefind-meta="title">제목</h1>' +
    '<p data-pagefind-meta="description">설명</p>' +
    '<div data-pagefind-body="true"><span data-pagefind-weight="10">제목</span>본문</div>' +
    "</article>"
  );
}

function writeValidOutput(outputDirectory) {
  writeFile(outputDirectory, "articles/example/index.html", getIndexedHtml("article"));
  writeFile(outputDirectory, "en/articles/example/index.html", getIndexedHtml("article"));
  writeFile(outputDirectory, "ja/articles/example/index.html", getIndexedHtml("article"));
  writeFile(outputDirectory, "notes/example/index.html", getIndexedHtml("note"));
  writeFile(outputDirectory, "articles/index.html", "<main>Archive</main>");
  writeFile(outputDirectory, "pagefind/pagefind.js", "export const init = () => {};");
  writeFile(
    outputDirectory,
    "pagefind/pagefind-entry.json",
    JSON.stringify({
      languages: { ko: { page_count: 2 }, en: { page_count: 1 }, ja: { page_count: 1 } },
    }),
  );
  writeFile(outputDirectory, "pagefind/fragment/ko_test.pf_fragment");
  writeFile(outputDirectory, "pagefind/index/ko_test.pf_index");
  writeFile(outputDirectory, "pagefind/pagefind.ko_test.pf_meta");
}

afterEach(() => {
  for (const directory of TEMPORARY_DIRECTORIES.splice(0)) {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

describe("staticSearchVerification", () => {
  it("정상 search index와 상세 색인 범위를 통과시킨다", () => {
    const outputDirectory = createOutputDirectory();
    writeValidOutput(outputDirectory);

    expect(findStaticSearchErrors(outputDirectory)).toEqual([]);
  });

  it("Pagefind 필수 산출물 누락을 보고한다", () => {
    const outputDirectory = createOutputDirectory();

    expect(findStaticSearchErrors(outputDirectory)).toEqual([
      "Missing Pagefind artifact: pagefind.js",
      "Missing Pagefind artifact: pagefind-entry.json",
    ]);
  });

  it("상세 누락과 archive 오색인을 보고한다", () => {
    const outputDirectory = createOutputDirectory();
    writeValidOutput(outputDirectory);
    writeFile(outputDirectory, "notes/example/index.html", "<main>본문 없음</main>");
    writeFile(outputDirectory, "articles/index.html", getIndexedHtml("article"));

    expect(findStaticSearchErrors(outputDirectory)).toEqual(
      expect.arrayContaining([
        "Search detail page is not indexed: /notes/example/",
        "Unexpected page is marked for search: /articles/",
      ]),
    );
  });

  it("metadata, language, page count 불일치를 보고한다", () => {
    const outputDirectory = createOutputDirectory();
    writeValidOutput(outputDirectory);
    writeFile(
      outputDirectory,
      "articles/example/index.html",
      '<article data-pagefind-filter="type:article"><div data-pagefind-body>본문</div></article>',
    );
    writeFile(
      outputDirectory,
      "pagefind/pagefind-entry.json",
      JSON.stringify({ languages: { en: { page_count: 9 } } }),
    );

    expect(findStaticSearchErrors(outputDirectory)).toEqual(
      expect.arrayContaining([
        "Indexed page has no title metadata: /articles/example/",
        "Indexed page has no description metadata: /articles/example/",
        "Indexed page has no weighted title context: /articles/example/",
        "Pagefind index has no Korean language index",
        "Pagefind index has no Japanese language index",
        "Pagefind page count differs from marked pages: 9 !== 4",
      ]),
    );
  });
});
