import { getPublishedArticles } from "@/features/article/articleRepository";
import { getPublishedNotes } from "@/features/note/noteRepository";
import { createAtomFeed, getSyndicationEntries } from "@/features/seo/syndicationFeed";

export const dynamic = "force-static";

export function GET() {
  const entries = getSyndicationEntries(getPublishedArticles("ko"), getPublishedNotes("ko"));

  return new Response(createAtomFeed(entries), {
    headers: { "Content-Type": "application/atom+xml; charset=utf-8" },
  });
}
