import Link from "next/link";

import { Container } from "@/components/atoms/Container";
import { getLocalizedPath, type Locale } from "@/features/i18n/localeConfig";
import { SITE_COPY } from "@/features/i18n/translations";

type SiteFooterProps = {
  locale: Locale;
};

export function SiteFooter({ locale }: SiteFooterProps) {
  const copy = SITE_COPY[locale];
  const currentYear = new Date().getFullYear();
  const href = (path: string) => getLocalizedPath(locale, path);

  return (
    <footer className="border-border text-muted mt-auto border-t py-10 text-sm">
      <Container className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div className="max-w-xl">
          <p className="text-foreground font-bold">Bluemiv Tech Blog</p>
          <p className="mt-2 text-xs leading-6">{copy.footer.description}</p>
          <p className="text-subtle mt-1 font-mono text-[10px] tracking-[0.12em] uppercase">
            Static since 2017
          </p>
          <div className="border-border text-subtle mt-6 flex flex-col gap-1 border-t pt-4 font-mono text-[10px] leading-5 sm:flex-row sm:gap-5">
            <p>© 2017–{currentYear} Bluemiv. All rights reserved.</p>
            <p>Designed &amp; built by Bluemiv.</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 text-xs md:justify-end">
          <Link
            className="hover:text-foreground inline-flex min-h-11 items-center"
            href={href("articles")}
          >
            Articles
          </Link>
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
