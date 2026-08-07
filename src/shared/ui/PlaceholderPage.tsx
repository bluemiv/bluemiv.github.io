import { Container } from "@/shared/ui/Container";

type PlaceholderPageProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PlaceholderPage({ eyebrow, title, description }: PlaceholderPageProps) {
  return (
    <Container className="py-20 md:py-28">
      <section className="max-w-[760px] border-b border-border pb-16">
        <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-accent">{eyebrow}</p>
        <h1 className="text-4xl font-semibold tracking-[-0.04em] md:text-6xl">{title}</h1>
        <p className="mt-6 max-w-[640px] text-base leading-8 text-muted md:text-lg">
          {description}
        </p>
      </section>
    </Container>
  );
}
