import { getPublishedArticles } from "@/features/article/articleRepository";
import { getPublishedNotes } from "@/features/note/noteRepository";
import { createRssFeed, getSyndicationEntries } from "@/features/seo/syndicationFeed";

export const dynamic = "force-static";

export function GET() {
  const entries = getSyndicationEntries(getPublishedArticles("ko"), getPublishedNotes("ko"));

  return new Response(createRssFeed(entries), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
