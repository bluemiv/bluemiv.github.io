import Link from "next/link";

import { Container } from "@/components/atoms/Container";
import type { AppProfile } from "@/features/app/appProfiles";

type PropsWithAppProfilePage = {
  profile: AppProfile;
};

export function AppProfilePage({ profile }: PropsWithAppProfilePage) {
  return (
    <Container className="py-16 md:py-24">
      <article lang={profile.locale} className="app-profile mx-auto max-w-[920px]">
        <header className="border-border border-b pb-12 md:pb-16">
          <p className="text-accent font-mono text-xs font-semibold tracking-[0.14em] uppercase">
            Android app
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl leading-tight font-bold tracking-[-0.04em] text-balance sm:text-5xl md:text-6xl">
            {profile.name}
          </h1>
          <p className="text-muted mt-6 max-w-2xl text-base leading-8 md:text-lg">
            {profile.description}
          </p>
          <a
            className="bg-accent text-on-accent hover:bg-accent-hover mt-8 inline-flex min-h-11 items-center px-5 text-sm font-semibold transition-colors"
            href={profile.googlePlayUrl}
            target="_blank"
            rel="noreferrer"
          >
            Google Play ↗
          </a>
        </header>

        <section className="py-12 md:py-16" aria-labelledby="app-features-heading">
          <div className="grid gap-8 md:grid-cols-[180px_1fr]">
            <h2
              id="app-features-heading"
              className="font-mono text-xs font-semibold tracking-[0.12em] uppercase"
            >
              Features
            </h2>
            <ol className="border-border border-t">
              {profile.features.map((feature, index) => (
                <li
                  key={feature}
                  className="border-border grid grid-cols-[40px_1fr] gap-3 border-b py-5"
                >
                  <span className="text-subtle font-mono text-xs">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-semibold">{feature}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-border grid gap-6 border-t pt-8 md:grid-cols-[180px_1fr]">
          <h2 className="font-mono text-xs font-semibold tracking-[0.12em] uppercase">Legal</h2>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {profile.legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  className="text-accent hover:text-accent-hover inline-flex min-h-11 items-center underline underline-offset-4"
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </Container>
  );
}
