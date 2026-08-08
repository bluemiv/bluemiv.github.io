import type { Metadata } from "next";

import { StaticRedirectPage } from "@/components/widgets/StaticRedirectPage";
import { getPolicyRedirect } from "@/features/policy/policyRedirects";
import { NO_INDEX_FOLLOW_ROBOTS } from "@/features/seo/siteDiscovery";

const DESTINATION = getPolicyRedirect("/privacy/")!;

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: DESTINATION },
  robots: NO_INDEX_FOLLOW_ROBOTS,
};

export default function PrivacyRedirectPage() {
  return <StaticRedirectPage destination={DESTINATION} message="Privacy Policy로 이동합니다." />;
}
