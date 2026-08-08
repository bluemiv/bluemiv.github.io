import type { Metadata } from "next";

import { SiteFooter } from "@/components/widgets/SiteFooter";
import { SiteHeader } from "@/components/widgets/SiteHeader";
import { SITE_CONFIG } from "@/config/siteConfig";
import { ServiceWorkerCleanup } from "@/features/serviceWorker/ServiceWorkerCleanup";
import { ATOM_FEED_PATH, RSS_FEED_PATH } from "@/features/seo/siteDiscovery";
import { ThemeInitializer } from "@/features/theme/ThemeInitializer";

import { ibmPlexMono } from "../fonts";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  authors: [{ name: SITE_CONFIG.author }],
};

export default function BlogLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={ibmPlexMono.variable} suppressHydrationWarning>
      <head>
        <ThemeInitializer />
        <link
          rel="alternate"
          type="application/atom+xml"
          title={`${SITE_CONFIG.displayTitle} Atom`}
          href={ATOM_FEED_PATH}
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${SITE_CONFIG.displayTitle} RSS`}
          href={RSS_FEED_PATH}
        />
      </head>
      <body>
        <div className="flex min-h-screen flex-col">
          <SiteHeader locale="ko" />
          <main className="flex-1">{children}</main>
          <SiteFooter locale="ko" />
        </div>
        <ServiceWorkerCleanup />
      </body>
    </html>
  );
}
