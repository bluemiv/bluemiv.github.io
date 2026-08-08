import type { Metadata } from "next";

import { SITE_CONFIG } from "@/config/siteConfig";
import type { Locale } from "@/features/i18n/localeConfig";

export const DEFAULT_SOCIAL_IMAGE_PATH = "/og-default.webp";

const OPEN_GRAPH_LOCALE: Record<Locale, string> = {
  ko: "ko_KR",
  en: "en_US",
  ja: "ja_JP",
};

type SocialImage = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
};

type WebsiteSocialMetadataOptions = {
  title: string;
  description: string;
  canonical: string;
  locale: Locale;
  image?: SocialImage;
};

type ArticleSocialMetadataOptions = WebsiteSocialMetadataOptions & {
  publishedAt: string;
  modifiedAt: string;
  author: string;
  tags: readonly string[];
};

function resolveSocialImage(image?: SocialImage): SocialImage {
  return (
    image ?? {
      url: DEFAULT_SOCIAL_IMAGE_PATH,
      alt: SITE_CONFIG.displayTitle,
      width: 1200,
      height: 630,
    }
  );
}

export function createWebsiteSocialMetadata({
  title,
  description,
  canonical,
  locale,
  image,
}: WebsiteSocialMetadataOptions): Pick<Metadata, "openGraph" | "twitter"> {
  const socialImage = resolveSocialImage(image);

  return {
    openGraph: {
      type: "website",
      siteName: SITE_CONFIG.displayTitle,
      locale: OPEN_GRAPH_LOCALE[locale],
      url: canonical,
      title,
      description,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}

export function createArticleSocialMetadata({
  title,
  description,
  canonical,
  locale,
  image,
  publishedAt,
  modifiedAt,
  author,
  tags,
}: ArticleSocialMetadataOptions): Pick<Metadata, "openGraph" | "twitter"> {
  const socialImage = resolveSocialImage(image);

  return {
    openGraph: {
      type: "article",
      siteName: SITE_CONFIG.displayTitle,
      locale: OPEN_GRAPH_LOCALE[locale],
      url: canonical,
      title,
      description,
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      authors: [author],
      tags: [...tags],
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}
