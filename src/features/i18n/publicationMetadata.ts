import { SITE_CONFIG } from "@/config/siteConfig";

import type { Locale } from "./localeConfig";

const DATE_LOCALE_BY_LOCALE: Record<Locale, string> = {
  ko: "ko-KR",
  en: "en-US",
  ja: "ja-JP",
};

function createPublicationDateFormatter(locale: Locale): Intl.DateTimeFormat {
  return new Intl.DateTimeFormat(DATE_LOCALE_BY_LOCALE[locale], {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: SITE_CONFIG.timeZone,
  });
}

const DATE_FORMATTER_BY_LOCALE: Record<Locale, Intl.DateTimeFormat> = {
  ko: createPublicationDateFormatter("ko"),
  en: createPublicationDateFormatter("en"),
  ja: createPublicationDateFormatter("ja"),
};

export function formatPublicationDate(dateTime: string, locale: Locale): string {
  return DATE_FORMATTER_BY_LOCALE[locale].format(new Date(dateTime));
}

export function formatApproximateReadingTime(minutes: number, locale: Locale): string {
  const roundedMinutes = Math.max(1, Math.round(minutes));

  if (locale === "en") return `About ${roundedMinutes} min`;
  if (locale === "ja") return `約${roundedMinutes}分`;
  return `약 ${roundedMinutes}분`;
}
