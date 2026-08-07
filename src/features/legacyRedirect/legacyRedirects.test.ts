import { describe, expect, it } from "vitest";

import { createLegacyRedirects, findLegacyRedirect } from "./legacyRedirects";

const getArticlePath = (slug: string) => `/articles/${slug}/`;
const getNotePath = (slug: string) => `/notes/${slug}/`;

describe("legacyRedirects", () => {
  it("article과 note의 예전 경로를 canonical 경로로 변환한다", () => {
    const redirects = createLegacyRedirects(
      [{ slug: "example-article", legacyPaths: ["/blog/react/3/"] }],
      [{ slug: "example-note", legacyPaths: ["/blog/short/1/"] }],
      getArticlePath,
      getNotePath,
    );

    expect(redirects).toEqual([
      {
        legacySection: "react",
        legacyId: "3",
        destination: "/articles/example-article/",
      },
      {
        legacySection: "short",
        legacyId: "1",
        destination: "/notes/example-note/",
      },
    ]);
    expect(findLegacyRedirect(redirects, "react", "3")).toEqual(redirects[0]);
    expect(findLegacyRedirect(redirects, "react", "404")).toBeUndefined();
  });

  it("지원하지 않는 예전 경로를 거부한다", () => {
    expect(() =>
      createLegacyRedirects(
        [{ slug: "example", legacyPaths: ["/old/react/3/"] }],
        [],
        getArticlePath,
        getNotePath,
      ),
    ).toThrow("Unsupported legacy path");
  });

  it("중복 예전 경로를 거부한다", () => {
    expect(() =>
      createLegacyRedirects(
        [
          { slug: "first", legacyPaths: ["/blog/react/3/"] },
          { slug: "second", legacyPaths: ["/blog/react/3/"] },
        ],
        [],
        getArticlePath,
        getNotePath,
      ),
    ).toThrow("Duplicate legacy redirect path");
  });
});
