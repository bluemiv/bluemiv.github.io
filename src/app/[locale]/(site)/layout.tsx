import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/widgets/SiteFooter";
import { SiteHeader } from "@/components/widgets/SiteHeader";
import { isPrefixedLocale } from "@/features/i18n/localeConfig";

export default async function LocalizedBlogLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  if (!isPrefixedLocale(locale)) notFound();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader locale={locale} />
      <main className="flex-1">{children}</main>
      <SiteFooter locale={locale} />
    </div>
  );
}
