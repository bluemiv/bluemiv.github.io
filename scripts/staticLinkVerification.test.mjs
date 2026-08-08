import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { findBrokenStaticLinks } from "./staticLinkVerification.mjs";

const TEMPORARY_DIRECTORIES = [];

function createOutputDirectory() {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "bluemiv-static-links-"));
  TEMPORARY_DIRECTORIES.push(directory);
  return directory;
}

function writeFile(outputDirectory, relativePath, source = "") {
  const filePath = path.join(outputDirectory, relativePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, source);
}

afterEach(() => {
  for (const directory of TEMPORARY_DIRECTORIES.splice(0)) {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

describe("staticLinkVerification", () => {
  it("route, 상대 경로, 정적 asset을 실제 export 파일과 대조한다", () => {
    const outputDirectory = createOutputDirectory();
    writeFile(
      outputDirectory,
      "index.html",
      '<a href="/articles/">Articles</a><a href="https://example.com">External</a>',
    );
    writeFile(
      outputDirectory,
      "articles/index.html",
      '<a href="../">Home</a><a href="/logo.svg?version=1">Logo</a>',
    );
    writeFile(outputDirectory, "404.html", '<a href="/">Home</a>');
    writeFile(outputDirectory, "logo.svg", "<svg></svg>");

    expect(findBrokenStaticLinks(outputDirectory)).toEqual([]);
  });

  it("중복된 누락 링크를 한 번만 보고하고 framework·anchor 링크를 제외한다", () => {
    const outputDirectory = createOutputDirectory();
    writeFile(
      outputDirectory,
      "index.html",
      '<a href="/missing/">Missing</a><a href="/missing/">Again</a><a href="#main">Main</a><a href="/_next/app.js">Chunk</a>',
    );

    expect(findBrokenStaticLinks(outputDirectory)).toEqual([
      { sourceRoute: "/", targetPath: "/missing/" },
    ]);
  });

  it("잘못 인코딩된 내부 경로도 누락 링크로 보고한다", () => {
    const outputDirectory = createOutputDirectory();
    writeFile(outputDirectory, "index.html", '<a href="/%E0%A4%A">Invalid</a>');

    expect(findBrokenStaticLinks(outputDirectory)).toEqual([
      { sourceRoute: "/", targetPath: "/%E0%A4%A" },
    ]);
  });
});
