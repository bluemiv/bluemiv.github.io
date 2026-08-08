import type { Metadata } from "next";

import { HomePage } from "@/components/widgets/HomePage";
import { getLanguageAlternates, getLocalizedPath } from "@/features/i18n/localeConfig";
import { HOME_COPY } from "@/features/i18n/translations";
import { createWebsiteSocialMetadata } from "@/features/seo/socialMetadata";

const locale = "ko";
const copy = HOME_COPY[locale];
const canonical = getLocalizedPath(locale);

export const metadata: Metadata = {
  title: copy.metadata.title,
  description: copy.metadata.description,
  alternates: {
    canonical,
    languages: getLanguageAlternates(),
  },
  ...createWebsiteSocialMetadata({
    title: copy.metadata.title,
    description: copy.metadata.description,
    canonical,
    locale,
  }),
};

export default function KoreanHomePage() {
  return <HomePage locale={locale} />;
}
