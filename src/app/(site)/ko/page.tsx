import type { Metadata } from "next";

import { StaticRedirectPage } from "@/components/widgets/StaticRedirectPage";

const DESTINATION = "/";

export const metadata: Metadata = {
  title: "한국어 홈으로 이동",
  alternates: {
    canonical: DESTINATION,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function LegacyKoreanHomePage() {
  return <StaticRedirectPage destination={DESTINATION} message="한국어 기본 주소로 이동합니다." />;
}
