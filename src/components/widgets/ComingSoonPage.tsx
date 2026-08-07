import { Container } from "@/components/atoms/Container";

type ComingSoonPageProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function ComingSoonPage({
  eyebrow,
  title,
  description,
}: ComingSoonPageProps) {
  return (
    <Container className="py-20 md:py-28">
      <section className="border-border max-w-[760px] border-b pb-16">
        <p className="text-accent mb-5 text-xs font-bold tracking-[0.18em] uppercase">
          {eyebrow}
        </p>
        <h1 className="text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
          {title}
        </h1>
        <p className="text-muted mt-6 max-w-[640px] text-base leading-8 md:text-lg">
          {description}
        </p>
      </section>
    </Container>
  );
}
