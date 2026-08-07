import type { Metadata } from "next";

import { HomePage } from "@/components/widgets/HomePage";
import { getLanguageAlternates, getLocalizedPath } from "@/features/i18n/localeConfig";
import { HOME_COPY } from "@/features/i18n/translations";

const locale = "ko";
const copy = HOME_COPY[locale];

export const metadata: Metadata = {
  title: copy.metadata.title,
  description: copy.metadata.description,
  alternates: {
    canonical: getLocalizedPath(locale),
    languages: getLanguageAlternates(),
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    title: copy.metadata.title,
    description: copy.metadata.description,
  },
};

export default function KoreanHomePage() {
  return <HomePage locale={locale} />;
}
