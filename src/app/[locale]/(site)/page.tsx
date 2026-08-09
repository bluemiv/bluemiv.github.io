import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { HomePage } from "@/components/widgets/HomePage";
import { SITE_CONFIG } from "@/config/siteConfig";
import {
  getLanguageAlternates,
  getLocalizedPath,
  isPrefixedLocale,
  PREFIXED_LOCALES,
} from "@/features/i18n/localeConfig";
import { HOME_COPY } from "@/features/i18n/translations";
import { createWebsiteSocialMetadata } from "@/features/seo/socialMetadata";

export function generateStaticParams() {
  return PREFIXED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;

  if (!isPrefixedLocale(locale)) notFound();

  const copy = HOME_COPY[locale];
  const canonical = getLocalizedPath(locale);
  const title = `${copy.metadata.title} | ${SITE_CONFIG.name}`;

  return {
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
}

export default async function LocalizedHomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;

  if (!isPrefixedLocale(locale)) notFound();

  return <HomePage locale={locale} />;
}
