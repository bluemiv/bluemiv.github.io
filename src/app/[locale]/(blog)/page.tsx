import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { HomePage } from "@/components/widgets/HomePage";
import {
  getLanguageAlternates,
  getLocalizedPath,
  isPrefixedLocale,
} from "@/features/i18n/localeConfig";
import { HOME_COPY } from "@/features/i18n/translations";

const OPEN_GRAPH_LOCALE = {
  en: "en_US",
  ja: "ja_JP",
} as const;

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;

  if (!isPrefixedLocale(locale)) notFound();

  const copy = HOME_COPY[locale];

  return {
    title: copy.metadata.title,
    description: copy.metadata.description,
    alternates: {
      canonical: getLocalizedPath(locale),
      languages: getLanguageAlternates(),
    },
    openGraph: {
      type: "website",
      locale: OPEN_GRAPH_LOCALE[locale],
      title: copy.metadata.title,
      description: copy.metadata.description,
    },
  };
}

export default async function LocalizedHomePage({
  params,
}: PageProps<"/[locale]">) {
  const { locale } = await params;

  if (!isPrefixedLocale(locale)) notFound();

  return <HomePage locale={locale} />;
}
