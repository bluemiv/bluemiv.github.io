import type { Metadata } from "next";

import { StaticRedirectPage } from "@/components/widgets/StaticRedirectPage";

const DESTINATION = "/";

export const metadata: Metadata = {
  title: "Apps",
  alternates: { canonical: DESTINATION },
  robots: { index: false, follow: true },
};

export default function AppsRedirectPage() {
  return <StaticRedirectPage destination={DESTINATION} message="홈으로 이동합니다." />;
}
