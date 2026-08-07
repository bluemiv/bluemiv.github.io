import Link from "next/link";

import { ThemeToggle } from "@/features/theme/ThemeToggle";
import { Container } from "@/shared/ui/Container";

const NAV_ITEMS = [
  { href: "/articles", label: "Articles" },
  { href: "/notes", label: "Notes" },
  { href: "/apps", label: "Apps" },
  { href: "/about", label: "About" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-canvas/95 backdrop-blur-md">
      <Container className="flex min-h-[68px] items-center justify-between gap-5">
        <Link href="/" className="group flex items-center gap-3 text-sm font-bold tracking-[-0.02em]">
          <span className="relative block size-4 border border-accent">
            <span className="absolute bottom-[2px] left-[2px] size-1.5 bg-accent transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </span>
          <span>Bluemiv</span>
          <span className="hidden font-mono text-[10px] font-normal tracking-[0.08em] text-subtle md:inline">
            / FIELD NOTES
          </span>
        </Link>
        <div className="flex items-center gap-4 md:gap-6">
          <nav className="hidden sm:block" aria-label="주요 메뉴">
            <ul className="flex items-center gap-4 text-xs font-semibold text-muted md:gap-6">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link className="transition-colors hover:text-foreground" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}
