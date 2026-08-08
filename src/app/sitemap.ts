import type { MetadataRoute } from "next";

import { getAppProfiles } from "@/features/app/appProfiles";
import { getPublishedArticles } from "@/features/article/articleRepository";
import { getPublishedNotes } from "@/features/note/noteRepository";
import { createSitemap } from "@/features/seo/siteDiscovery";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return createSitemap(getPublishedArticles("ko"), getPublishedNotes("ko"), getAppProfiles());
}
