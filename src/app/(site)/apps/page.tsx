import type { Metadata } from "next";

import { ComingSoonPage } from "@/components/widgets/ComingSoonPage";

export const metadata: Metadata = {
  title: "앱",
  description: "Bluemiv가 만들고 운영하는 앱과 정책 페이지를 소개합니다.",
  alternates: {
    canonical: "/apps/",
  },
};

export default function AppsPage() {
  return (
    <ComingSoonPage
      eyebrow="Apps"
      title="만들고 운영하는 앱"
      description="앱 랜딩과 정책 페이지는 기존 URL을 보존하며 순차적으로 이관합니다."
    />
  );
}
