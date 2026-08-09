import type { MetadataRoute } from "next";

import { getPublishedArticles } from "@/features/article/articleRepository";
import { getPublishedNotes } from "@/features/note/noteRepository";
import { SUPPORTED_LOCALES } from "@/features/i18n/localeConfig";
import { createSitemap } from "@/features/seo/siteDiscovery";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return createSitemap(
    SUPPORTED_LOCALES.flatMap(getPublishedArticles),
    SUPPORTED_LOCALES.flatMap(getPublishedNotes),
  );
}
