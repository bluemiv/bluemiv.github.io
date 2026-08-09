import { Container } from "@/components/atoms/Container";
import type { HomeCopy } from "@/features/i18n/translations";

type PropsWithHomeHero = {
  articleCount: number;
  articleCtaHref?: string;
  careerMonthOrdinal: number;
  copy: HomeCopy["hero"];
  hasArticles: boolean;
  noteCount: number;
  topicCount: number;
};

export function HomeHero({
  articleCount,
  articleCtaHref,
  careerMonthOrdinal,
  copy,
  hasArticles,
  noteCount,
  topicCount,
}: PropsWithHomeHero) {
  return (
    <section className="border-border relative overflow-hidden border-b">
      <div className="blueprint-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <Container className="relative grid min-h-[460px] gap-8 py-10 md:min-h-[500px] md:py-12 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-end">
        <div className="max-w-[820px]">
          <p className="text-accent mb-6 flex items-center gap-3 font-mono text-xs font-semibold tracking-[0.16em] uppercase">
            <span className="bg-accent h-px w-10" />
            {copy.eyebrow}
          </p>
          <h1 className="text-5xl leading-[1.07] font-semibold tracking-[-0.055em] text-balance sm:text-6xl md:text-7xl">
            {copy.lineOne}
            <br />
            {copy.lineTwo}
            <br />
            {copy.lineThreePrefix}
            <span className="font-display text-accent font-normal">{copy.accent}</span>
            {copy.lineThreeSuffix}
          </h1>
          <p className="text-muted mt-6 max-w-[650px] text-base leading-8 md:text-lg md:leading-9">
            {copy.description(careerMonthOrdinal)}
          </p>
          {hasArticles && articleCtaHref ? (
            <a
              className="text-accent hover:text-accent-hover mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold transition-colors duration-150 motion-reduce:transition-none"
              href={articleCtaHref}
            >
              {copy.cta}
              <span aria-hidden="true">↓</span>
            </a>
          ) : null}
        </div>

        <aside className="border-border text-muted border-t pt-5 font-mono text-xs leading-6 lg:mb-2 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-5">
          <dl className="grid grid-cols-4 gap-x-2 lg:grid-cols-[88px_1fr] lg:gap-x-0">
            <div className="lg:contents">
              <dt>{copy.articleCountLabel.toUpperCase()}</dt>
              <dd className="text-foreground tabular-nums">
                {String(articleCount).padStart(2, "0")}
              </dd>
            </div>
            <div className="lg:contents">
              <dt>{copy.topicCountLabel.toUpperCase()}</dt>
              <dd className="text-foreground tabular-nums">
                {String(topicCount).padStart(2, "0")}
              </dd>
            </div>
            <div className="lg:contents">
              <dt>{copy.noteCountLabel.toUpperCase()}</dt>
              <dd className="text-foreground tabular-nums">{String(noteCount).padStart(2, "0")}</dd>
            </div>
            <div className="lg:contents">
              <dt>{copy.statusLabel.toUpperCase()}</dt>
              <dd className="text-accent">● {copy.status}</dd>
            </div>
          </dl>
        </aside>
      </Container>
    </section>
  );
}
