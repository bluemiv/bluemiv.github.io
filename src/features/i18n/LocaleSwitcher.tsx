import Link from "next/link";

import { LANGUAGE_NAMES, SITE_COPY } from "./translations";
import { getLocalizedPath, SUPPORTED_LOCALES, type Locale } from "./localeConfig";

type LocaleSwitcherProps = {
  locale: Locale;
  path?: string;
};

export function LocaleSwitcher({ locale, path = "" }: LocaleSwitcherProps) {
  return (
    <details className="group relative">
      <summary
        className="text-muted hover:text-foreground flex min-h-11 cursor-pointer list-none items-center gap-1 px-2 font-mono text-[10px] font-semibold tracking-[0.08em] transition-colors"
        aria-label={SITE_COPY[locale].languageLabel}
      >
        <span>{locale.toUpperCase()}</span>
        <span aria-hidden="true" className="text-subtle transition-transform group-open:rotate-180">
          ↓
        </span>
      </summary>
      <div className="border-border bg-surface absolute top-[calc(100%+8px)] right-0 z-50 min-w-40 border p-1">
        {SUPPORTED_LOCALES.map((item) => (
          <Link
            key={item}
            href={getLocalizedPath(item, path)}
            hrefLang={item}
            lang={item}
            aria-current={item === locale ? "page" : undefined}
            className="hover:bg-surface-muted grid min-h-11 grid-cols-[28px_1fr] items-center gap-2 px-3 text-xs transition-colors"
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
