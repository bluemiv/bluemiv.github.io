import { describe, expect, it } from "vitest";

import { getLegacyPolicyRedirectParams, getPolicyRedirect } from "./policyRedirects";

describe("policyRedirects", () => {
  it("기존 기본 경로를 기존 locale 문서로 연결한다", () => {
    expect(getPolicyRedirect("/privacy/")).toBe("/privacy/kpop/en/");
    expect(getPolicyRedirect("/privacy/blim/")).toBe("/privacy/blim/en/");
    expect(getPolicyRedirect("/privacy/unknown/")).toBeUndefined();
  });

  it("동적 legacy redirect params만 반환한다", () => {
    expect(getLegacyPolicyRedirectParams()).toHaveLength(5);
    expect(getLegacyPolicyRedirectParams()).toContainEqual({ appSlug: "pixel-blur" });
  });
});
