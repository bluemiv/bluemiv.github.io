import { describe, expect, it } from "vitest";

import { SITE_CONFIG } from "@/config/siteConfig";

import {
  createArticleSocialMetadata,
  createWebsiteSocialMetadata,
  DEFAULT_SOCIAL_IMAGE_PATH,
} from "./socialMetadata";

describe("socialMetadata", () => {
  it("website OG와 Twitter에 locale, canonical, 기본 이미지를 함께 만든다", () => {
    const metadata = createWebsiteSocialMetadata({
      title: "전체 글",
      description: "전체 글 설명",
      canonical: "/articles/",
      locale: "ko",
    });

    expect(metadata.openGraph).toMatchObject({
      type: "website",
      siteName: SITE_CONFIG.displayTitle,
      locale: "ko_KR",
      url: "/articles/",
      images: [
        {
          url: DEFAULT_SOCIAL_IMAGE_PATH,
          alt: SITE_CONFIG.displayTitle,
          width: 1200,
          height: 630,
        },
      ],
    });
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      images: [{ url: DEFAULT_SOCIAL_IMAGE_PATH }],
    });
  });

  it("article은 개별 cover와 발행 정보를 우선한다", () => {
    const metadata = createArticleSocialMetadata({
      title: "Kotlin이란?",
      description: "Kotlin 설명",
      canonical: "/articles/what-is-kotlin/",
      locale: "ko",
      image: {
        url: "/r/i/kotlin/87/thumbnail.webp",
        alt: "Kotlin이란?",
      },
      publishedAt: "2025-01-01T00:00:00+09:00",
      modifiedAt: "2025-01-02T00:00:00+09:00",
      author: "Bluemiv",
      tags: ["kotlin", "java"],
    });

    expect(metadata.openGraph).toMatchObject({
      type: "article",
      publishedTime: "2025-01-01T00:00:00+09:00",
      modifiedTime: "2025-01-02T00:00:00+09:00",
      authors: ["Bluemiv"],
      tags: ["kotlin", "java"],
      images: [{ url: "/r/i/kotlin/87/thumbnail.webp", alt: "Kotlin이란?" }],
    });
  });
});
