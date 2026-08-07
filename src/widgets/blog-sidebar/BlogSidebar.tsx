import { AdSlotPlaceholder } from "@/shared/ui/AdSlotPlaceholder";

const CATEGORIES = [
  { name: "All articles", count: 87, active: true },
  { name: "Spring", count: 24, active: false },
  { name: "Java", count: 19, active: false },
  { name: "JavaScript", count: 15, active: false },
  { name: "React", count: 12, active: false },
  { name: "Next.js", count: 8, active: false },
  { name: "Algorithm", count: 6, active: false },
] as const;

const RECOMMENDED_ARTICLES = [
  { number: "01", title: "Spring 애플리케이션의 경계를 나누는 기준" },
  { number: "02", title: "React 상태를 어디까지 끌어올려야 할까" },
  { number: "03", title: "정적 블로그를 다시 설계하며 정한 것들" },
] as const;

export function MobileCategoryIndex() {
  return (
    <section
      className="border-b border-border pb-6 xl:hidden"
      aria-labelledby="mobile-category-title"
    >
      <h2
        id="mobile-category-title"
        className="mb-4 font-mono text-[10px] uppercase tracking-[0.16em] text-subtle"
      >
        Browse by topic
      </h2>
      <ul className="flex gap-6 overflow-x-auto pb-2 text-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {CATEGORIES.map((category) => (
          <li
            key={category.name}
            className={`flex shrink-0 items-center gap-2 whitespace-nowrap ${
              category.active ? "font-semibold text-accent" : "text-muted"
            }`}
          >
            <span>{category.name}</span>
            <span className="font-mono text-[10px] text-subtle">
              {category.count}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function BlogSidebar() {
  return (
    <aside className="hidden w-[300px] xl:block" aria-label="글 탐색과 광고">
      <section aria-labelledby="category-title">
        <div className="flex items-end justify-between border-b border-border pb-4">
          <h2
            id="category-title"
            className="text-xs font-bold uppercase tracking-[0.08em]"
          >
            Browse by topic
          </h2>
          <span className="font-mono text-[9px] text-subtle">07 TOPICS</span>
        </div>
        <ol>
          {CATEGORIES.map((category, index) => (
            <li
              key={category.name}
              className={`grid grid-cols-[28px_1fr_auto] items-center gap-3 border-b border-border py-4 text-sm ${
                category.active
                  ? "border-l border-l-accent pl-3 text-accent"
                  : "text-muted"
              }`}
            >
              <span className="font-mono text-[10px] text-subtle">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={category.active ? "font-semibold" : undefined}>
                {category.name}
              </span>
              <span className="font-mono text-[10px] text-subtle">
                {category.count}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-12">
        <AdSlotPlaceholder format="sidebar" />
      </div>

      <section className="mt-14" aria-labelledby="recommended-title">
        <div className="border-b border-border pb-4">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-accent">
            Next reading
          </p>
          <h2
            id="recommended-title"
            className="mt-2 text-xs font-bold uppercase tracking-[0.08em]"
          >
            추천 글
          </h2>
        </div>
        <ol>
          {RECOMMENDED_ARTICLES.map((article) => (
            <li
              key={article.number}
              className="grid grid-cols-[28px_1fr] gap-3 border-b border-border py-4"
            >
              <span className="font-mono text-[10px] text-accent">
                {article.number}
              </span>
              <span className="text-sm leading-6 text-muted">
                {article.title}
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-4 font-mono text-[9px] leading-5 text-subtle">
          콘텐츠 이관 후 링크 연결
        </p>
      </section>
    </aside>
  );
}
