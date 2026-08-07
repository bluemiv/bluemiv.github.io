import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SITE_CONFIG } from "@/config/siteConfig";
import {
  isPrefixedLocale,
  PREFIXED_LOCALES,
} from "@/features/i18n/localeConfig";
import { HOME_COPY } from "@/features/i18n/translations";
import { ServiceWorkerCleanup } from "@/features/serviceWorker/ServiceWorkerCleanup";
import { ThemeInitializer } from "@/features/theme/ThemeInitializer";

import { ibmPlexMono } from "../fonts";
import "../globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return PREFIXED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;

  if (!isPrefixedLocale(locale)) notFound();

  return {
    metadataBase: new URL(SITE_CONFIG.url),
    title: {
      default: HOME_COPY[locale].metadata.title,
      template: `%s | ${SITE_CONFIG.name}`,
    },
    description: HOME_COPY[locale].metadata.description,
    authors: [{ name: SITE_CONFIG.author }],
  };
}

export default async function LocaleRootLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  if (!isPrefixedLocale(locale)) notFound();

  return (
    <html
      lang={locale}
      className={ibmPlexMono.variable}
      suppressHydrationWarning
    >
      <head>
        <ThemeInitializer />
      </head>
      <body>
        {children}
        <ServiceWorkerCleanup />
      </body>
    </html>
  );
}
