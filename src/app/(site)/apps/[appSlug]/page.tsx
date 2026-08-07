import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AppProfilePage } from "@/components/widgets/AppProfilePage";
import { getAppProfile, getAppProfiles } from "@/features/app/appProfiles";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAppProfiles().map(({ slug }) => ({ appSlug: slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/apps/[appSlug]">): Promise<Metadata> {
  const { appSlug } = await params;
  const profile = getAppProfile(appSlug);
  if (!profile) notFound();

  const canonical = `/apps/${profile.slug}/`;
  return {
    title: profile.name,
    description: profile.description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title: profile.name,
      description: profile.description,
    },
    twitter: {
      card: "summary",
      title: profile.name,
      description: profile.description,
    },
  };
}

export default async function AppPage({ params }: PageProps<"/apps/[appSlug]">) {
  const { appSlug } = await params;
  const profile = getAppProfile(appSlug);
  if (!profile) notFound();

  return <AppProfilePage profile={profile} />;
}
