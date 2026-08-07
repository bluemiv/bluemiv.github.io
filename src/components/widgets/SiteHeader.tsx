"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { BrandMark } from "@/components/atoms/BrandMark";
import { Container } from "@/components/atoms/Container";
import { LocaleSwitcher } from "@/features/i18n/LocaleSwitcher";
import { getLocalizedPath, type Locale } from "@/features/i18n/localeConfig";
import { SITE_COPY } from "@/features/i18n/translations";
import {
  createHeaderScrollState,
  isNavigationPathActive,
  resolveHeaderScrollState,
} from "@/features/navigation/siteNavigation";
import { ThemeToggle } from "@/features/theme/ThemeToggle";

type SiteHeaderProps = {
  locale: Locale;
};

const MOBILE_NAVIGATION_ID = "mobile-site-navigation";

export function SiteHeader({ locale }: SiteHeaderProps) {
  const copy = SITE_COPY[locale];
  const pathname = usePathname();
  const [isCompact, setIsCompact] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const scrollStateRef = useRef(createHeaderScrollState());
  const href = (path: string) => getLocalizedPath(locale, path);
  const homeHref = getLocalizedPath(locale);
  const navItems = [
    { href: href("articles"), label: copy.nav.articles },
    { href: href("notes"), label: copy.nav.notes },
    { href: href("apps"), label: copy.nav.apps },
    { href: href("about"), label: copy.nav.about },
  ] as const;
  const shouldUseCompactHeader = isCompact && !isMobileMenuOpen;

  useEffect(() => {
    let animationFrameId = 0;

    function updateHeader() {
      const nextState = resolveHeaderScrollState(scrollStateRef.current, window.scrollY);
      scrollStateRef.current = nextState;
      setIsCompact((current) => (current === nextState.isCompact ? current : nextState.isCompact));
      animationFrameId = 0;
    }

    function handleScroll() {
      if (animationFrameId) return;
      animationFrameId = window.requestAnimationFrame(updateHeader);
    }

    updateHeader();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setIsMobileMenuOpen(false);
      menuButtonRef.current?.focus();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  return (
    <header className="border-border bg-canvas/80 sticky top-0 z-50 border-b backdrop-blur-xl">
      <Container
        className={`relative grid grid-cols-[minmax(0,1fr)_auto] items-center transition-[min-height] duration-200 ease-out motion-reduce:transition-none md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] ${
          shouldUseCompactHeader ? "min-h-[60px]" : "min-h-[72px]"
        }`}
      >
        <Link
          href={homeHref}
          className="group flex min-h-11 items-center gap-3 justify-self-start tracking-[-0.02em]"
          aria-label={copy.homeLabel}
        >
          <BrandMark className="text-accent size-5 shrink-0" />
          <span className="flex items-baseline gap-2.5">
            <span className="text-[15px] font-bold">Bluemiv</span>
            <span className="text-subtle hidden font-mono text-[9px] font-medium tracking-[0.14em] uppercase lg:inline">
              / Field Notes
            </span>
          </span>
        </Link>

        <nav aria-label={copy.navigationLabel} className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = isNavigationPathActive(pathname, item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`after:bg-accent relative inline-flex min-h-11 items-center px-3 font-mono text-[10px] font-semibold tracking-[0.1em] uppercase transition-colors after:absolute after:right-3 after:bottom-1.5 after:left-3 after:h-px after:origin-left after:transition-transform after:duration-200 motion-reduce:transition-none motion-reduce:after:transition-none ${
                      isActive
                        ? "text-foreground after:scale-x-100"
                        : "text-muted hover:text-foreground after:scale-x-0"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-border flex items-center justify-self-end border-l pl-1 md:pl-3">
          <LocaleSwitcher locale={locale} />
          <ThemeToggle labels={copy.theme} />
          <button
            ref={menuButtonRef}
            type="button"
            className="text-muted hover:text-foreground inline-flex size-11 items-center justify-center transition-colors md:hidden"
            aria-controls={MOBILE_NAVIGATION_ID}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? copy.mobileMenu.close : copy.mobileMenu.open}
            onClick={() => setIsMobileMenuOpen((current) => !current)}
          >
            {isMobileMenuOpen ? (
              <X aria-hidden="true" size={18} />
            ) : (
              <Menu aria-hidden="true" size={18} />
            )}
          </button>
        </div>
      </Container>

      <div
        id={MOBILE_NAVIGATION_ID}
        aria-hidden={!isMobileMenuOpen}
        className={`border-border bg-canvas absolute inset-x-0 top-full border-b transition-[opacity,transform,visibility] duration-200 ease-out motion-reduce:transition-none md:hidden ${
          isMobileMenuOpen
            ? "visible translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-2 opacity-0"
        }`}
      >
        <Container className="py-3">
          <nav aria-label={copy.navigationLabel}>
            <ul>
              {navItems.map((item, index) => {
                const isActive = isNavigationPathActive(pathname, item.href);

                return (
                  <li key={item.href} className="border-border border-b last:border-b-0">
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`grid min-h-14 grid-cols-[36px_1fr_20px] items-center gap-3 transition-colors ${
                        isActive ? "text-foreground" : "text-muted hover:text-foreground"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`font-mono text-[9px] ${isActive ? "text-accent" : "text-subtle"}`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm font-semibold">{item.label}</span>
                      <span aria-hidden="true" className={isActive ? "text-accent" : "text-subtle"}>
                        →
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </Container>
      </div>
    </header>
  );
}
