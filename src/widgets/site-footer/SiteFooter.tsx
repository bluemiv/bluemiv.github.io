import { Container } from "@/shared/ui/Container";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line py-8 text-sm text-ink-muted">
      <Container className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p>© Bluemiv</p>
        <p>Built with Next.js · Static export</p>
      </Container>
    </footer>
  );
}
