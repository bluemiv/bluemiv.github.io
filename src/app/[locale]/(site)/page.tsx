import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { HomePage } from "@/components/widgets/HomePage";
import {
  getLanguageAlternates,
  getLocalizedPath,
  isPrefixedLocale,
} from "@/features/i18n/localeConfig";
import { HOME_COPY } from "@/features/i18n/translations";
import { createWebsiteSocialMetadata } from "@/features/seo/socialMetadata";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;

  if (!isPrefixedLocale(locale)) notFound();

  const copy = HOME_COPY[locale];
  const canonical = getLocalizedPath(locale);

  return {
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
}

export default async function LocalizedHomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;

  if (!isPrefixedLocale(locale)) notFound();

  return <HomePage locale={locale} />;
}
