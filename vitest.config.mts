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
        "src/features/article/articleMetadata.ts",
        "src/features/article/articleRepository.ts",
        "src/features/i18n/localeConfig.ts",
        "src/features/legacyRedirect/legacyRedirects.ts",
        "src/features/note/noteMetadata.ts",
        "src/features/note/noteRepository.ts",
        "src/features/serviceWorker/serviceWorkerConfig.ts",
        "src/features/theme/themeConfig.ts",
        "scripts/migrationMetadata.mjs",
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
