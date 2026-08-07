import { Container } from "@/components/atoms/Container";
import type { ArticleMetadata } from "@/features/article/articleMetadata";

type ArticleDetailPageProps = {
  article: ArticleMetadata;
};

const DATE_FORMATTER = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "Asia/Seoul",
});

export function ArticleDetailPage({ article }: ArticleDetailPageProps) {
  return (
    <Container className="py-16 md:py-24">
      <article className="max-w-[760px]">
        <header className="border-border border-b pb-12 md:pb-16">
          <p className="text-accent font-mono text-[10px] font-semibold tracking-[0.16em] uppercase">
            {article.topic}
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.045em] text-balance md:text-6xl">
            {article.title}
          </h1>
          <p className="text-muted mt-6 text-lg leading-9">{article.description}</p>
          <dl className="text-muted mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs">
            <div className="flex gap-2">
              <dt>작성</dt>
              <dd>{article.author}</dd>
            </div>
            <div className="flex gap-2">
              <dt>발행</dt>
              <dd>
                <time dateTime={article.publishedAt}>
                  {DATE_FORMATTER.format(new Date(article.publishedAt))}
                </time>
              </dd>
            </div>
            <div className="flex gap-2">
              <dt>수정</dt>
              <dd>
                <time dateTime={article.modifiedAt}>
                  {DATE_FORMATTER.format(new Date(article.modifiedAt))}
                </time>
              </dd>
            </div>
          </dl>
        </header>
      </article>
    </Container>
  );
}
