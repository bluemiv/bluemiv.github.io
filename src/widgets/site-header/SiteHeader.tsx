import Link from "next/link";

import { Container } from "@/shared/ui/Container";

const NAV_ITEMS = [
  { href: "/articles", label: "Articles" },
  { href: "/notes", label: "Notes" },
  { href: "/apps", label: "Apps" },
  { href: "/about", label: "About" },
] as const;

export function SiteHeader() {
  return (
    <header className="border-b border-line">
      <Container className="flex min-h-16 items-center justify-between gap-6">
        <Link href="/" className="text-sm font-bold tracking-[-0.02em]">
          Bluemiv
        </Link>
        <nav aria-label="주요 메뉴">
          <ul className="flex items-center gap-4 text-sm text-ink-muted md:gap-7">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link className="transition-colors hover:text-ink" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
