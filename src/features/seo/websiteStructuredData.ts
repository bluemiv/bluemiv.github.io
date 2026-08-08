import { SITE_CONFIG } from "@/config/siteConfig";

export function getWebsiteStructuredData() {
  const websiteUrl = new URL("/", `${SITE_CONFIG.url}/`).toString();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${websiteUrl}#website`,
    url: websiteUrl,
    name: SITE_CONFIG.displayTitle,
    alternateName: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
  };
}

export function serializeWebsiteStructuredData(structuredData: unknown): string {
  return JSON.stringify(structuredData).replace(/</g, "\\u003c");
}
