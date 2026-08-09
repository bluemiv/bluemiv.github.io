import { ChevronDown } from "lucide-react";
import Link from "next/link";

import { getArticleLocaleSwitcherPath } from "@/features/article/articleLocalization";

import { LANGUAGE_NAMES, SITE_COPY } from "./translations";
import { getLocaleSwitcherPath, SUPPORTED_LOCALES, type Locale } from "./localeConfig";

type PropsWithLocaleSwitcher = {
  currentPath: string;
  locale: Locale;
};

export function LocaleSwitcher({ currentPath, locale }: PropsWithLocaleSwitcher) {
  return (
    <details className="group relative">
      <summary
        className="text-muted hover:text-foreground flex min-h-11 min-w-11 cursor-pointer list-none items-center justify-center gap-1 px-1.5 font-mono text-xs font-semibold tracking-[0.08em] transition-colors"
        aria-label={SITE_COPY[locale].languageLabel}
      >
        <span>{locale.toUpperCase()}</span>
        <ChevronDown
          aria-hidden="true"
          className="text-subtle transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
          size={12}
        />
      </summary>
      <div className="border-border bg-surface absolute top-[calc(100%+8px)] right-0 z-50 min-w-40 border p-1">
        {SUPPORTED_LOCALES.map((item) => (
          <Link
            key={item}
            href={
              getArticleLocaleSwitcherPath(currentPath, item) ??
              getLocaleSwitcherPath(locale, item, currentPath)
            }
            hrefLang={item}
            lang={item}
            aria-current={item === locale ? "page" : undefined}
            className="hover:bg-surface-muted grid min-h-11 grid-cols-[28px_1fr] items-center gap-2 px-3 text-sm transition-colors"
          >
            <span
              className={
                item === locale
                  ? "text-accent font-mono font-semibold uppercase"
                  : "text-subtle font-mono uppercase"
              }
            >
              {item}
            </span>
            <span>{LANGUAGE_NAMES[item].native}</span>
          </Link>
        ))}
      </div>
    </details>
  );
}
