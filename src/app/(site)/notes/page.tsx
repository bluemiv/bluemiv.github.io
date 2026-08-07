import type { Metadata } from "next";

import { NotesIndexPage } from "@/components/widgets/NotesIndexPage";
import { getPublishedNotes } from "@/features/note/noteRepository";

const NOTE_LOCALE = "ko";

export const metadata: Metadata = {
  title: "짧은 기록",
  description: "짧은 생각과 작은 문제 해결 기록을 가볍게 탐색하는 공간입니다.",
  alternates: {
    canonical: "/notes/",
  },
};

export default function NotesPage() {
  return <NotesIndexPage locale={NOTE_LOCALE} notes={getPublishedNotes(NOTE_LOCALE)} />;
}
