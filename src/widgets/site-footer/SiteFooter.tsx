import Link from "next/link";

import { Container } from "@/shared/ui/Container";

export function SiteFooter() {
  return (
    <footer className="border-border text-muted mt-auto border-t py-10 text-sm">
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-foreground font-bold">Bluemiv Tech Blog</p>
          <p className="mt-2 font-mono text-[10px] tracking-[0.12em] uppercase">
            Seoul · Static since 2017
          </p>
        </div>
        <div className="flex items-center gap-5 text-xs">
          <Link
            className="hover:text-foreground inline-flex min-h-11 items-center"
            href="/articles"
          >
            Articles
          </Link>
          <Link
            className="hover:text-foreground inline-flex min-h-11 items-center"
            href="/apps"
          >
            Apps
          </Link>
          <a
            className="hover:text-foreground inline-flex min-h-11 items-center"
            href="https://github.com/bluemiv"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
        </div>
      </Container>
    </footer>
  );
}
