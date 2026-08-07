import { AdSlotPlaceholder } from "@/shared/ui/AdSlotPlaceholder";
import { BlogGrid } from "@/shared/ui/BlogGrid";
import { Container } from "@/shared/ui/Container";
import {
  BlogSidebar,
  MobileCategoryIndex,
} from "@/widgets/blog-sidebar/BlogSidebar";

const ARTICLES = [
  {
    number: "01",
    category: "Kotlin",
    title: "Kotlin이란?",
    description:
      "Java 생태계를 활용하면서 더 간결하고 안전하게 코드를 작성하는 언어를 살펴봅니다.",
    date: "2025.12.28",
    readTime: "8 MIN",
  },
  {
    number: "02",
    category: "Java",
    title: "POJO(Plain Old Java Object)란?",
    description:
      "프레임워크에 종속되지 않는 객체의 의미와 Spring 생태계에서의 활용을 정리합니다.",
    date: "2025.12.26",
    readTime: "6 MIN",
  },
  {
    number: "03",
    category: "Spring",
    title: "@RequestParam과 @PathVariable 사용법",
    description:
      "Query string과 경로 변수를 구분하고 API에 맞는 방식을 선택하는 기준을 알아봅니다.",
    date: "2025.09.04",
    readTime: "7 MIN",
  },
  {
    number: "04",
    category: "Spring",
    title: "HTTP 메서드와 매핑 어노테이션",
    description:
      "REST API의 HTTP 메서드와 Spring 매핑 어노테이션을 연결해 이해합니다.",
    date: "2025.09.01",
    readTime: "9 MIN",
  },
  {
    number: "05",
    category: "React",
    title: "컴포넌트의 책임과 상태 배치",
    description:
      "상태의 소유권을 기준으로 컴포넌트 경계를 나누는 과정을 기록합니다.",
    date: "2025.08.18",
    readTime: "10 MIN",
  },
  {
    number: "06",
    category: "Next.js",
    title: "정적 내보내기로 블로그 구성하기",
    description:
      "App Router에서 정적 경로와 콘텐츠를 빌드 시점에 생성하는 구조를 살펴봅니다.",
    date: "2025.08.02",
    readTime: "12 MIN",
  },
] as const;

export default function ArticlesPage() {
  return (
    <Container className="py-16 md:py-24">
      <header className="max-w-[760px] border-b border-border pb-12 md:pb-16">
        <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-accent">
          Articles / Archive
        </p>
        <div className="flex items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-semibold tracking-[-0.045em] md:text-6xl">
              기술 글
            </h1>
            <p className="mt-6 max-w-[620px] text-base leading-8 text-muted md:text-lg">
              개발 과정에서 만난 문제와 선택의 이유를 기술별로 분류해
              기록합니다.
            </p>
          </div>
          <span className="hidden pb-2 font-mono text-[10px] text-subtle sm:block">
            087 ENTRIES
          </span>
        </div>
      </header>

      <div className="mt-10 xl:mt-16">
        <BlogGrid sidebar={<BlogSidebar />}>
          <MobileCategoryIndex />

          <section
            className="mt-10 xl:mt-0"
            aria-labelledby="article-list-title"
          >
            <div className="grid gap-3 border-b border-border pb-4 sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-accent">
                  Latest first
                </p>
                <h2
                  id="article-list-title"
                  className="mt-2 text-sm font-bold uppercase tracking-[0.08em]"
                >
                  All articles
                </h2>
              </div>
              <p className="text-xs text-muted">
                콘텐츠 이관 전 레이아웃 미리보기
              </p>
            </div>

            <ol>
              {ARTICLES.map((article, index) => (
                <li key={article.number}>
                  <article className="grid grid-cols-[44px_minmax(0,1fr)] gap-3 border-b border-border py-7 md:grid-cols-[44px_96px_minmax(0,1fr)_88px] md:items-start">
                    <span className="font-mono text-[10px] text-subtle">
                      {article.number}
                    </span>
                    <span className="font-mono text-[10px] uppercase text-accent">
                      {article.category}
                    </span>
                    <div className="col-span-2 md:col-span-1">
                      <h3 className="text-lg font-semibold tracking-[-0.025em] md:text-xl">
                        {article.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-muted">
                        {article.description}
                      </p>
                    </div>
                    <div className="col-span-2 flex gap-3 font-mono text-[10px] text-subtle md:col-span-1 md:block md:text-right">
                      <time className="block">{article.date}</time>
                      <span className="mt-1 block">{article.readTime}</span>
                    </div>
                  </article>

                  {index === 2 ? (
                    <div className="xl:hidden">
                      <AdSlotPlaceholder format="banner" />
                    </div>
                  ) : null}
                </li>
              ))}
            </ol>

            <footer className="flex items-center justify-between border-b border-border py-6 font-mono text-[10px] text-subtle">
              <span>PAGE 01 / 15</span>
              <span>페이지 이동은 콘텐츠 이관 후 연결</span>
            </footer>
          </section>
        </BlogGrid>
      </div>
    </Container>
  );
}
