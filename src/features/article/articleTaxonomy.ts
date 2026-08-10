export const ARTICLE_CATEGORY_SLUGS = ["backend", "frontend", "computer-science"] as const;

export const ARTICLE_TOPIC_SLUGS = [
  "spring",
  "java",
  "kotlin",
  "go",
  "firebase",
  "react",
  "nextjs",
  "javascript",
  "typescript",
  "browser",
  "html",
  "tooling",
  "styling",
  "algorithm",
  "artificial-intelligence",
] as const;

export type ArticleCategory = (typeof ARTICLE_CATEGORY_SLUGS)[number];
export type ArticleTopic = (typeof ARTICLE_TOPIC_SLUGS)[number];

export type ArticleTopicDefinition = {
  slug: ArticleTopic;
  label: string;
};

export type ArticleCategoryDefinition = {
  slug: ArticleCategory;
  label: string;
  description: string;
  topics: readonly ArticleTopicDefinition[];
};

export const ARTICLE_TAXONOMY: readonly ArticleCategoryDefinition[] = [
  {
    slug: "backend",
    label: "Backend",
    description: "서버, API, 데이터 처리 과정에서 마주한 문제와 기술 선택을 정리합니다.",
    topics: [
      { slug: "spring", label: "Spring" },
      { slug: "java", label: "Java" },
      { slug: "kotlin", label: "Kotlin" },
      { slug: "go", label: "Go" },
      { slug: "firebase", label: "Firebase" },
    ],
  },
  {
    slug: "frontend",
    label: "Frontend",
    description: "웹 인터페이스, 브라우저, 개발 도구를 다루며 얻은 경험을 정리합니다.",
    topics: [
      { slug: "react", label: "React" },
      { slug: "nextjs", label: "Next.js" },
      { slug: "javascript", label: "JavaScript" },
      { slug: "typescript", label: "TypeScript" },
      { slug: "browser", label: "Browser" },
      { slug: "html", label: "HTML" },
      { slug: "tooling", label: "Tooling" },
      { slug: "styling", label: "Styling" },
    ],
  },
  {
    slug: "computer-science",
    label: "Computer Science",
    description: "문제 해결에 필요한 알고리즘과 컴퓨터 과학의 기본기를 정리합니다.",
    topics: [
      { slug: "algorithm", label: "Algorithm" },
      { slug: "artificial-intelligence", label: "Artificial Intelligence" },
    ],
  },
];

const ARTICLE_CATEGORY_BY_SLUG = new Map(
  ARTICLE_TAXONOMY.map((category) => [category.slug, category]),
);
const ARTICLE_TOPIC_BY_SLUG = new Map(
  ARTICLE_TAXONOMY.flatMap((category) =>
    category.topics.map((topic) => [topic.slug, { ...topic, category: category.slug }] as const),
  ),
);

export function isArticleCategory(value: string): value is ArticleCategory {
  return ARTICLE_CATEGORY_BY_SLUG.has(value as ArticleCategory);
}

export function isArticleTopic(value: string): value is ArticleTopic {
  return ARTICLE_TOPIC_BY_SLUG.has(value as ArticleTopic);
}

export function getArticleCategoryDefinition(category: ArticleCategory): ArticleCategoryDefinition {
  const definition = ARTICLE_CATEGORY_BY_SLUG.get(category);
  if (!definition) throw new Error(`Unknown article category: ${category}`);
  return definition;
}

export function getArticleTopicDefinition(topic: ArticleTopic) {
  const definition = ARTICLE_TOPIC_BY_SLUG.get(topic);
  if (!definition) throw new Error(`Unknown article topic: ${topic}`);
  return definition;
}

export function getArticleCategoryLabel(category: ArticleCategory): string {
  return getArticleCategoryDefinition(category).label;
}

export function getArticleTopicLabel(topic: ArticleTopic): string {
  return getArticleTopicDefinition(topic).label;
}

export function isArticleTopicInCategory(topic: ArticleTopic, category: ArticleCategory): boolean {
  return getArticleTopicDefinition(topic).category === category;
}
