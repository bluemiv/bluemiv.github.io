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
};

export const dynamic = "error";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var theme=localStorage.getItem("theme");var dark=theme==="dark"||(!theme&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",dark);}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        {children}
        <ServiceWorkerCleanup />
      </body>
    </html>
  );
}
