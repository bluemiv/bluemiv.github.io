const ARTICLE_TOPIC_LABELS: Readonly<Record<string, string>> = {
  algorithm: "Algorithm",
  firebase: "Firebase",
  frontend: "Frontend",
  go: "Go",
  java: "Java",
  javascript: "JavaScript",
  kotlin: "Kotlin",
  nextjs: "Next.js",
  react: "React",
  spring: "Spring",
};

export function getArticleTopicLabel(topic: string): string {
  return ARTICLE_TOPIC_LABELS[topic] ?? topic.replaceAll("-", " ");
}
