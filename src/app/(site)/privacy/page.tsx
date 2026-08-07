import type { Metadata } from "next";

import { StaticRedirectPage } from "@/components/widgets/StaticRedirectPage";
import { getPolicyRedirect } from "@/features/policy/policyRedirects";

const DESTINATION = getPolicyRedirect("/privacy/")!;

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: DESTINATION },
  robots: { index: false, follow: true },
};

export default function PrivacyRedirectPage() {
  return <StaticRedirectPage destination={DESTINATION} message="Privacy Policy로 이동합니다." />;
}
