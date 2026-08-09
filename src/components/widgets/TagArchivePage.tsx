import { Container } from "@/components/atoms/Container";
import { SectionHeader } from "@/components/atoms/SectionHeader";
import { ArchivePageHeader } from "@/components/widgets/ArchivePageHeader";
import { ArticleList } from "@/components/widgets/ArticleList";
import { NoteList } from "@/components/widgets/NoteList";
import { PageTransition } from "@/components/widgets/PageTransition";
import type { ArticleMetadata } from "@/features/article/articleMetadata";
import type { Locale } from "@/features/i18n/localeConfig";
import type { NoteMetadata } from "@/features/note/noteMetadata";
import { getTagLabel, type TagKey } from "@/features/tag/tagRegistry";

type PropsWithTagArchivePage = {
  articles: readonly ArticleMetadata[];
  locale: Locale;
  notes: readonly NoteMetadata[];
  tag: TagKey;
};

function EntryCount({ count }: { count: number }) {
  return (
    <span className="text-muted font-mono text-xs uppercase tabular-nums">
      {String(count).padStart(2, "0")} Entries
    </span>
  );
}

export function TagArchivePage({ articles, locale, notes, tag }: PropsWithTagArchivePage) {
  const entryCount = articles.length + notes.length;

  return (
    <PageTransition>
      <Container className="py-16 md:py-24">
        <ArchivePageHeader
          className="max-w-[920px]"
          entryCount={`${String(entryCount).padStart(3, "0")} ENTRIES`}
          eyebrow="Tag / Archive"
          title={`#${getTagLabel(tag)}`}
        />

        <div className="mt-12 max-w-[920px] space-y-20 md:mt-16">
          {articles.length > 0 ? (
            <section aria-labelledby="tag-article-list-title">
              <SectionHeader
                eyebrow="Latest first"
                heading="Articles"
                headingId="tag-article-list-title"
                trailing={<EntryCount count={articles.length} />}
              />
              <ArticleList
                articles={articles}
                emptyMessage="이 태그의 글이 없습니다."
                locale={locale}
              />
            </section>
          ) : null}

          {notes.length > 0 ? (
            <section aria-labelledby="tag-note-list-title">
              <SectionHeader
                eyebrow="Latest first"
                heading="Notes"
                headingId="tag-note-list-title"
                trailing={<EntryCount count={notes.length} />}
              />
              <NoteList
                emptyMessage="이 태그의 짧은 기록이 없습니다."
                locale={locale}
                notes={notes}
              />
            </section>
          ) : null}
        </div>
      </Container>
    </PageTransition>
  );
}
