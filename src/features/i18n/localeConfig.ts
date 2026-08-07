export const SUPPORTED_LOCALES = ["ko", "en", "ja"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "ko";
export const PREFIXED_LOCALES = [
  "en",
  "ja",
] as const satisfies readonly Locale[];

export type PrefixedLocale = (typeof PREFIXED_LOCALES)[number];

export function isSupportedLocale(value: string): value is Locale {
  return SUPPORTED_LOCALES.some((locale) => locale === value);
}

export function isPrefixedLocale(value: string): value is PrefixedLocale {
  return PREFIXED_LOCALES.some((locale) => locale === value);
}

export function getLocalizedPath(locale: Locale, path = ""): string {
  const normalizedPath = path.replace(/^\/+|\/+$/g, "");
  const localePrefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;

  return normalizedPath
    ? `${localePrefix}/${normalizedPath}/`
    : `${localePrefix}/`;
}

export function getLanguageAlternates(path = "") {
  return {
    ko: getLocalizedPath("ko", path),
    en: getLocalizedPath("en", path),
    ja: getLocalizedPath("ja", path),
    "x-default": getLocalizedPath(DEFAULT_LOCALE, path),
  };
}
