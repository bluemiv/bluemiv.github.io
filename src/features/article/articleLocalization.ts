import { getLocalizedPath, type Locale } from "@/features/i18n/localeConfig";

const ARTICLE_TRANSLATION_LOCALES = {
  "build-github-pages-blog-with-nextjs": ["ko", "en", "ja"],
} as const satisfies Record<string, readonly Locale[]>;

export function getRegisteredArticleLocales(slug: string): readonly Locale[] {
  return ARTICLE_TRANSLATION_LOCALES[slug as keyof typeof ARTICLE_TRANSLATION_LOCALES] ?? ["ko"];
}

export function getArticleLanguageAlternates(
  slug: string,
  locales: readonly Locale[],
): Record<string, string> {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, getLocalizedPath(locale, `articles/${slug}`)]),
  );
  const defaultLocale = locales.includes("ko") ? "ko" : locales[0];

  return defaultLocale
    ? { ...languages, "x-default": getLocalizedPath(defaultLocale, `articles/${slug}`) }
    : languages;
}

export function getArticleLocaleSwitcherPath(
  currentPath: string,
  targetLocale: Locale,
): string | null {
  const match = currentPath.match(/^\/(?:en\/|ja\/)?articles\/([^/]+)\/?$/);

  if (!match) return null;

  const slug = match[1];
  return getRegisteredArticleLocales(slug).includes(targetLocale)
    ? getLocalizedPath(targetLocale, `articles/${slug}`)
    : getLocalizedPath(targetLocale);
}
