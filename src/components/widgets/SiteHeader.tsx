"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { BrandMark } from "@/components/atoms/BrandMark";
import { Container } from "@/components/atoms/Container";
import { ARTICLE_READING_HEADER_SLOT_ID } from "@/features/article/articleReadingProgress";
import { LocaleSwitcher } from "@/features/i18n/LocaleSwitcher";
import { getLocalizedPath, type Locale } from "@/features/i18n/localeConfig";
import { SITE_COPY } from "@/features/i18n/translations";
import {
  createHeaderScrollState,
  isNavigationPathActive,
  resolveHeaderScrollState,
} from "@/features/navigation/siteNavigation";
import { NAVIGATION_TRANSITION_TYPES } from "@/features/navigation/navigationTransition";
import { ThemeToggle } from "@/features/theme/ThemeToggle";

type PropsWithSiteHeader = {
  locale: Locale;
};

const MOBILE_NAVIGATION_ID = "mobile-site-navigation";

export function SiteHeader({ locale }: PropsWithSiteHeader) {
  const copy = SITE_COPY[locale];
  const pathname = usePathname();
  const [isCompact, setIsCompact] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const scrollStateRef = useRef(createHeaderScrollState());
  const href = (path: string) => getLocalizedPath(locale, path);
  const homeHref = getLocalizedPath(locale);
  const navItems =
    locale === "ko"
      ? [
          {
            href: href("articles"),
            label: copy.nav.articles,
            matchHrefs: [href("articles"), href("categories"), href("topics")],
          },
          { href: href("notes"), label: copy.nav.notes, matchHrefs: [href("notes")] },
        ]
      : [];
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
    <header
      className="site-header sticky top-0 z-50 h-[72px]"
      data-compact={shouldUseCompactHeader}
    >
      <div
        className="site-header-surface border-border bg-canvas/80 pointer-events-none absolute inset-x-0 top-0 h-[72px] border-b backdrop-blur-xl"
        aria-hidden="true"
      />
      <Container className="site-header-content relative grid h-[72px] grid-cols-[minmax(0,1fr)_auto] items-center motion-reduce:transition-none md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        <Link
          href={homeHref}
          transitionTypes={NAVIGATION_TRANSITION_TYPES.back}
          className="group flex min-h-11 items-center gap-3 justify-self-start tracking-[-0.02em]"
          aria-label={copy.homeLabel}
        >
          <BrandMark className="text-accent size-5 shrink-0" />
          <span className="text-base font-bold">Bluemiv</span>
        </Link>

        {navItems.length ? (
          <nav aria-label={copy.navigationLabel} className="hidden md:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = item.matchHrefs.some((matchHref) =>
                  isNavigationPathActive(pathname, matchHref),
                );

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      transitionTypes={
                        pathname === homeHref
                          ? NAVIGATION_TRANSITION_TYPES.forward
                          : isActive
                            ? NAVIGATION_TRANSITION_TYPES.back
                            : NAVIGATION_TRANSITION_TYPES.swap
                      }
                      aria-current={isActive ? "page" : undefined}
                      className={`after:bg-accent relative inline-flex min-h-11 items-center px-3 font-mono text-xs font-semibold tracking-[0.1em] uppercase transition-colors after:absolute after:right-3 after:bottom-1.5 after:left-3 after:h-px after:origin-left after:transition-transform after:duration-200 motion-reduce:transition-none motion-reduce:after:transition-none ${
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
        ) : (
          <span className="hidden md:block" aria-hidden="true" />
        )}

        <div className="border-border flex items-center justify-self-end border-l pl-1 md:pl-3">
          <div id={ARTICLE_READING_HEADER_SLOT_ID} className="contents" />
          <LocaleSwitcher currentPath={pathname} locale={locale} />
          <ThemeToggle labels={copy.theme} />
          {navItems.length ? (
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
          ) : null}
        </div>
      </Container>

      {navItems.length ? (
        <div
          id={MOBILE_NAVIGATION_ID}
          aria-hidden={!isMobileMenuOpen}
          className={`border-border bg-canvas/92 absolute inset-x-0 top-full border-b backdrop-blur-2xl transition-[opacity,transform,visibility] duration-200 ease-out motion-reduce:transition-none md:hidden ${
            isMobileMenuOpen
              ? "visible translate-y-0 opacity-100"
              : "pointer-events-none invisible -translate-y-2 opacity-0"
          }`}
        >
          <Container className="py-3">
            <nav aria-label={copy.navigationLabel}>
              <ul>
                {navItems.map((item, index) => {
                  const isActive = item.matchHrefs.some((matchHref) =>
                    isNavigationPathActive(pathname, matchHref),
                  );

                  return (
                    <li key={item.href} className="border-border border-b last:border-b-0">
                      <Link
                        href={item.href}
                        transitionTypes={
                          pathname === homeHref
                            ? NAVIGATION_TRANSITION_TYPES.forward
                            : isActive
                              ? NAVIGATION_TRANSITION_TYPES.back
                              : NAVIGATION_TRANSITION_TYPES.swap
                        }
                        aria-current={isActive ? "page" : undefined}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`grid min-h-14 grid-cols-[36px_1fr_20px] items-center gap-3 transition-colors ${
                          isActive ? "text-foreground" : "text-muted hover:text-foreground"
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`font-mono text-xs ${isActive ? "text-accent" : "text-subtle"}`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm font-semibold">{item.label}</span>
                        <span
                          aria-hidden="true"
                          className={isActive ? "text-accent" : "text-subtle"}
                        >
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
      ) : null}
    </header>
  );
}
