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
      className="border-border border-b pb-6 xl:hidden"
      aria-labelledby="mobile-category-title"
    >
      <h2
        id="mobile-category-title"
        className="text-subtle mb-4 font-mono text-[10px] tracking-[0.16em] uppercase"
      >
        Browse by topic
      </h2>
      <ul className="flex [scrollbar-width:none] gap-6 overflow-x-auto pb-2 text-sm [&::-webkit-scrollbar]:hidden">
        {CATEGORIES.map((category) => (
          <li
            key={category.name}
            className={`flex shrink-0 items-center gap-2 whitespace-nowrap ${
              category.active ? "text-accent font-semibold" : "text-muted"
            }`}
          >
            <span>{category.name}</span>
            <span className="text-subtle font-mono text-[10px]">
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
        <div className="border-border flex items-end justify-between border-b pb-4">
          <h2
            id="category-title"
            className="text-xs font-bold tracking-[0.08em] uppercase"
          >
            Browse by topic
          </h2>
          <span className="text-subtle font-mono text-[9px]">07 TOPICS</span>
        </div>
        <ol>
          {CATEGORIES.map((category, index) => (
            <li
              key={category.name}
              className={`border-border grid grid-cols-[28px_1fr_auto] items-center gap-3 border-b py-4 text-sm ${
                category.active
                  ? "border-l-accent text-accent border-l pl-3"
                  : "text-muted"
              }`}
            >
              <span className="text-subtle font-mono text-[10px]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={category.active ? "font-semibold" : undefined}>
                {category.name}
              </span>
              <span className="text-subtle font-mono text-[10px]">
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
        <div className="border-border border-b pb-4">
          <p className="text-accent font-mono text-[9px] tracking-[0.16em] uppercase">
            Next reading
          </p>
          <h2
            id="recommended-title"
            className="mt-2 text-xs font-bold tracking-[0.08em] uppercase"
          >
            추천 글
          </h2>
        </div>
        <ol>
          {RECOMMENDED_ARTICLES.map((article) => (
            <li
              key={article.number}
              className="border-border grid grid-cols-[28px_1fr] gap-3 border-b py-4"
            >
              <span className="text-accent font-mono text-[10px]">
                {article.number}
              </span>
              <span className="text-muted text-sm leading-6">
                {article.title}
              </span>
            </li>
          ))}
        </ol>
        <p className="text-subtle mt-4 font-mono text-[9px] leading-5">
          콘텐츠 이관 후 링크 연결
        </p>
      </section>
    </aside>
  );
}
