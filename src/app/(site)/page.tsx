import type { Metadata } from "next";

import { HomePage } from "@/components/widgets/HomePage";
import { SITE_CONFIG } from "@/config/siteConfig";
import { getLanguageAlternates, getLocalizedPath } from "@/features/i18n/localeConfig";
import { HOME_COPY } from "@/features/i18n/translations";
import { createWebsiteSocialMetadata } from "@/features/seo/socialMetadata";
import {
  getWebsiteStructuredData,
  serializeWebsiteStructuredData,
} from "@/features/seo/websiteStructuredData";

const locale = "ko";
const copy = HOME_COPY[locale];
const canonical = getLocalizedPath(locale);
const title = `${copy.metadata.title} | ${SITE_CONFIG.name}`;

export const metadata: Metadata = {
  title: { absolute: title },
  description: copy.metadata.description,
  alternates: {
    canonical,
    languages: getLanguageAlternates(),
  },
  ...createWebsiteSocialMetadata({
    title,
    description: copy.metadata.description,
    canonical,
    locale,
  }),
};

export default function KoreanHomePage() {
  const structuredData = getWebsiteStructuredData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeWebsiteStructuredData(structuredData) }}
      />
      <HomePage locale={locale} />
    </>
  );
}
