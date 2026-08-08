import { describe, expect, it } from "vitest";

import { SITE_CONFIG } from "@/config/siteConfig";

import { getWebsiteStructuredData, serializeWebsiteStructuredData } from "./websiteStructuredData";

describe("websiteStructuredData", () => {
  it("루트 canonical과 공개 이름을 사용한 WebSite 데이터를 생성한다", () => {
    expect(getWebsiteStructuredData()).toEqual({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://bluemiv.github.io/#website",
      url: "https://bluemiv.github.io/",
      name: SITE_CONFIG.displayTitle,
      alternateName: SITE_CONFIG.name,
      description: SITE_CONFIG.description,
    });
  });

  it("구조화 데이터의 HTML 종료 문자를 escape한다", () => {
    expect(serializeWebsiteStructuredData({ name: "</script>" })).toBe(
      '{"name":"\\u003c/script>"}',
    );
  });
});
