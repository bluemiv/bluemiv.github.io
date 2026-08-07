import type { Metadata } from "next";

import { ComingSoonPage } from "@/components/widgets/ComingSoonPage";

export const metadata: Metadata = {
  title: "소개",
  description: "Bluemiv와 기술 블로그의 운영 방향을 소개합니다.",
  alternates: {
    canonical: "/about/",
  },
};

export default function AboutPage() {
  return (
    <ComingSoonPage
      eyebrow="About"
      title="만든 사람과 블로그"
      description="프로필과 블로그 운영 방향을 한곳에서 소개합니다."
    />
  );
}
