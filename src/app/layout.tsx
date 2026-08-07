import type { Metadata } from "next";

import { ServiceWorkerCleanup } from "@/features/service-worker/ServiceWorkerCleanup";
import { SITE_CONFIG } from "@/shared/config/site";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  authors: [{ name: SITE_CONFIG.author }],
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>
        {children}
        <ServiceWorkerCleanup />
      </body>
    </html>
  );
}
