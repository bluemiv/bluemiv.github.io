import Link from "next/link";

import { Container } from "@/shared/ui/Container";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border py-10 text-sm text-muted">
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-bold text-foreground">Bluemiv Tech Blog</p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em]">Seoul · Static since 2017</p>
        </div>
        <div className="flex items-center gap-5 text-xs">
          <Link className="hover:text-foreground" href="/articles">Articles</Link>
          <Link className="hover:text-foreground" href="/apps">Apps</Link>
          <a className="hover:text-foreground" href="https://github.com/bluemiv" target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
        </div>
      </Container>
    </footer>
  );
}
