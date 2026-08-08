import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts", "scripts/**/*.test.mjs"],
    clearMocks: true,
    restoreMocks: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json-summary", "html"],
      include: [
        "src/features/adsense/adSenseConfig.ts",
        "src/features/app/appProfiles.ts",
        "src/features/article/articleCollection.ts",
        "src/features/article/articleMetadata.ts",
        "src/features/article/articleDocument.ts",
        "src/features/article/articleImage.ts",
        "src/features/article/articleNavigation.ts",
        "src/features/article/articleReadingProgress.ts",
        "src/features/article/articleRepository.ts",
        "src/features/article/articleSeo.ts",
        "src/features/article/articleTopic.ts",
        "src/features/i18n/localeConfig.ts",
        "src/features/legacyRedirect/legacyRedirects.ts",
        "src/features/navigation/siteNavigation.ts",
        "src/features/note/noteMetadata.ts",
        "src/features/note/noteDocument.ts",
        "src/features/note/noteIdentifier.ts",
        "src/features/note/noteNavigation.ts",
        "src/features/note/noteRepository.ts",
        "src/features/note/noteSeo.ts",
        "src/features/policy/policyDocuments.ts",
        "src/features/policy/policyRedirects.ts",
        "src/features/profile/careerDuration.ts",
        "src/features/serviceWorker/serviceWorkerConfig.ts",
        "src/features/seo/siteDiscovery.ts",
        "src/features/seo/syndicationFeed.ts",
        "src/features/theme/themeConfig.ts",
        "scripts/migrationMetadata.mjs",
        "scripts/policyMigration.mjs",
        "scripts/staticLinkVerification.mjs",
        "scripts/staticSeoVerification.mjs",
      ],
      thresholds: {
        branches: 90,
        functions: 90,
        lines: 90,
        statements: 90,
      },
    },
  },
});
