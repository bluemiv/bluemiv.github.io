import Link from "next/link";

import { LocaleSwitcher } from "@/features/i18n/LocaleSwitcher";
import { getLocalizedPath, type Locale } from "@/features/i18n/localeConfig";
import { SITE_COPY } from "@/features/i18n/translations";
import { ThemeToggle } from "@/features/theme/ThemeToggle";
import { Container } from "@/components/atoms/Container";

type SiteHeaderProps = {
  locale: Locale;
};

export function SiteHeader({ locale }: SiteHeaderProps) {
  const copy = SITE_COPY[locale];
  const href = (path: string) => getLocalizedPath(locale, path);
  const homeHref = getLocalizedPath(locale);
  const navItems = [
    { href: href("articles"), label: copy.nav.articles, mobile: true },
    { href: href("notes"), label: copy.nav.notes, mobile: true },
    { href: href("apps"), label: copy.nav.apps, mobile: false },
    { href: href("about"), label: copy.nav.about, mobile: false },
  ] as const;

  return (
    <header className="border-border bg-canvas/95 sticky top-0 z-50 border-b backdrop-blur-md">
      <Container className="flex min-h-[68px] items-center justify-between gap-2">
        <Link
          href={homeHref}
          className="group flex min-h-11 items-center gap-3 text-sm font-bold tracking-[-0.02em]"
        >
          <span className="border-accent relative block size-4 border">
            <span className="bg-accent absolute bottom-[2px] left-[2px] size-1.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </span>
          <span>Bluemiv</span>
          <span className="text-subtle hidden font-mono text-[10px] font-normal tracking-[0.08em] md:inline">
            / FIELD NOTES
          </span>
        </Link>
        <div className="flex items-center gap-1 sm:gap-4 md:gap-6">
          <nav aria-label={copy.navigationLabel}>
            <ul className="text-muted flex items-center text-xs font-semibold sm:gap-1 md:gap-2">
              {navItems.map((item) => (
                <li key={item.href} className={item.mobile ? undefined : "hidden sm:block"}>
                  <Link
                    className="hover:text-foreground inline-flex min-h-11 items-center px-2 transition-colors"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <LocaleSwitcher locale={locale} />
          <ThemeToggle labels={copy.theme} />
        </div>
      </Container>
    </header>
  );
}
