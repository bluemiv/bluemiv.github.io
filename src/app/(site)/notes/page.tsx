import type { Metadata } from "next";

import { NotesIndexPage } from "@/components/widgets/NotesIndexPage";
import { getLocalizedPath } from "@/features/i18n/localeConfig";
import { getPublishedNotes } from "@/features/note/noteRepository";
import { createWebsiteSocialMetadata } from "@/features/seo/socialMetadata";

const NOTE_LOCALE = "ko";
const TITLE = "짧은 기록";
const DESCRIPTION = "짧은 생각과 작은 문제 해결 기록을 가볍게 탐색하는 공간입니다.";
const CANONICAL = getLocalizedPath(NOTE_LOCALE, "notes");

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: CANONICAL,
    languages: {
      ko: CANONICAL,
      "x-default": CANONICAL,
    },
  },
  ...createWebsiteSocialMetadata({
    title: TITLE,
    description: DESCRIPTION,
    canonical: CANONICAL,
    locale: NOTE_LOCALE,
  }),
};

export default function NotesPage() {
  return <NotesIndexPage locale={NOTE_LOCALE} notes={getPublishedNotes(NOTE_LOCALE)} />;
}
