import Link from "next/link";

import { Container } from "@/components/atoms/Container";
import { SITE_CONFIG } from "@/config/siteConfig";
import { getEarliestArticlePublicationYear } from "@/features/article/articleCollection";
import { getPublishedArticles } from "@/features/article/articleRepository";
import { getLocalizedPath, type Locale } from "@/features/i18n/localeConfig";
import { NAVIGATION_TRANSITION_TYPES } from "@/features/navigation/navigationTransition";

type PropsWithSiteFooter = {
  locale: Locale;
};

export function SiteFooter({ locale }: PropsWithSiteFooter) {
  const yearFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    timeZone: SITE_CONFIG.timeZone,
  });
  const currentYear = Number(yearFormatter.format(new Date()));
  const firstArticleYear =
    getEarliestArticlePublicationYear(getPublishedArticles("ko"), SITE_CONFIG.timeZone) ??
    currentYear;
  const copyrightYears =
    firstArticleYear < currentYear ? `${firstArticleYear}–${currentYear}` : String(currentYear);
  const href = (path: string) => getLocalizedPath(locale, path);

  return (
    <footer className="border-border text-muted mt-auto border-t py-10 text-sm">
      <Container className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div className="max-w-xl">
          <p className="text-foreground font-bold">{SITE_CONFIG.displayTitle}</p>
          <div className="border-border text-muted mt-4 flex flex-col gap-1 border-t pt-4 font-mono text-xs leading-5 sm:flex-row sm:gap-5">
            <p>© {copyrightYears} Bluemiv. All rights reserved.</p>
            <p>Designed &amp; built by Bluemiv.</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 text-sm md:justify-end">
          {locale === "ko" ? (
            <>
              <Link
                className="hover:text-foreground inline-flex min-h-11 items-center"
                href={href("articles")}
                transitionTypes={NAVIGATION_TRANSITION_TYPES.swap}
              >
                Articles
              </Link>
              <Link
                className="hover:text-foreground inline-flex min-h-11 items-center"
                href={href("notes")}
                transitionTypes={NAVIGATION_TRANSITION_TYPES.swap}
              >
                Notes
              </Link>
            </>
          ) : null}
          <a
            className="hover:text-foreground inline-flex min-h-11 items-center"
            href="https://github.com/bluemiv"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
          <a
            className="hover:text-foreground inline-flex min-h-11 items-center"
            href="mailto:public.bluemiv@gmail.com"
          >
            Email ↗
          </a>
        </div>
      </Container>
    </footer>
  );
}
