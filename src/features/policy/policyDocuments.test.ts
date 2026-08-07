import { describe, expect, it } from "vitest";

import {
  createPolicyLanguageAlternates,
  getBaseAppPolicyParams,
  getBaseLegacyPolicyParams,
  getLocalizedAppPolicyParams,
  getLocalizedLegacyPolicyParams,
  getPolicyDocument,
  getPolicyDocuments,
  getPolicyLanguageAlternates,
  parsePolicyDocuments,
} from "./policyDocuments";

describe("policyDocuments", () => {
  it("기존 법적 문서 31개를 고유 경로로 제공한다", () => {
    const documents = getPolicyDocuments();

    expect(documents).toHaveLength(31);
    expect(new Set(documents.map(({ path }) => path)).size).toBe(31);
  });

  it("trailing slash 유무와 관계없이 문서를 찾는다", () => {
    expect(getPolicyDocument("apps/kpop-tube/privacy")?.locale).toBe("ko");
    expect(getPolicyDocument("/apps/kpop-tube/privacy/en/")?.locale).toBe("en");
    expect(getPolicyDocument("/missing/")).toBeUndefined();
    expect(getPolicyDocument("/")).toBeUndefined();
  });

  it("같은 문서의 locale 대체 경로를 만든다", () => {
    const korean = getPolicyDocument("/apps/potion-sort-quest/privacy/");
    expect(korean).toBeDefined();

    expect(getPolicyLanguageAlternates(korean!)).toEqual({
      ko: "/apps/potion-sort-quest/privacy/",
      en: "/apps/potion-sort-quest/privacy/en/",
      ja: "/apps/potion-sort-quest/privacy/jp/",
      "x-default": "/apps/potion-sort-quest/privacy/",
    });
  });

  it("한국어가 없는 문서는 첫 경로를 x-default로 사용한다", () => {
    const document = {
      ...getPolicyDocuments()[0],
      path: "/privacy/example/en/",
      locale: "en" as const,
    };

    expect(createPolicyLanguageAlternates([document], document)).toEqual({
      en: "/privacy/example/en/",
      "x-default": "/privacy/example/en/",
    });
    expect(createPolicyLanguageAlternates([], document)).toEqual({});
  });

  it("route 종류별 static params를 분리한다", () => {
    expect(getBaseAppPolicyParams()).toHaveLength(6);
    expect(getLocalizedAppPolicyParams()).toHaveLength(4);
    expect(getBaseLegacyPolicyParams()).toEqual([{ appSlug: "luna" }]);
    expect(getLocalizedLegacyPolicyParams()).toHaveLength(19);
  });

  it("중복 경로와 안전하지 않은 이관 본문을 거부한다", () => {
    const valid = getPolicyDocuments()[0];

    expect(() => parsePolicyDocuments([valid, valid])).toThrow("Duplicate policy path");
    expect(() => parsePolicyDocuments([{ ...valid, html: "<script>alert(1)</script>" }])).toThrow(
      "Policy HTML contains unsafe markup",
    );
    expect(() =>
      parsePolicyDocuments([{ ...valid, html: "Jane Doe (no formal title/position)" }]),
    ).toThrow("Policy HTML contains private legacy contact data");
  });
});
