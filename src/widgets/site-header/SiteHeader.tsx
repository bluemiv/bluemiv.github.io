import Link from "next/link";

import { ThemeToggle } from "@/features/theme/ThemeToggle";
import { Container } from "@/shared/ui/Container";

const NAV_ITEMS = [
  { href: "/articles", label: "Articles", mobile: true },
  { href: "/notes", label: "Notes", mobile: true },
  { href: "/apps", label: "Apps", mobile: false },
  { href: "/about", label: "About", mobile: false },
] as const;

export function SiteHeader() {
  return (
    <header className="border-border bg-canvas/95 sticky top-0 z-50 border-b backdrop-blur-md">
      <Container className="flex min-h-[68px] items-center justify-between gap-2">
        <Link
          href="/"
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
          <nav aria-label="주요 메뉴">
            <ul className="text-muted flex items-center text-xs font-semibold sm:gap-1 md:gap-2">
              {NAV_ITEMS.map((item) => (
                <li
                  key={item.href}
                  className={item.mobile ? undefined : "hidden sm:block"}
                >
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
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}
