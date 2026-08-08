import type { MetadataRoute } from "next";

import { createRobots } from "@/features/seo/siteDiscovery";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return createRobots();
}
