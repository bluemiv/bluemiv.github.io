import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

import { BrandMark } from "@/components/atoms/BrandMark";
import { Container } from "@/components/atoms/Container";
import { SiteFooter } from "@/components/widgets/SiteFooter";
import { SiteHeader } from "@/components/widgets/SiteHeader";
import { SITE_CONFIG } from "@/config/siteConfig";
import { ServiceWorkerCleanup } from "@/features/serviceWorker/ServiceWorkerCleanup";
import { ThemeInitializer } from "@/features/theme/ThemeInitializer";

import { ibmPlexMono } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: `페이지를 찾을 수 없습니다 | ${SITE_CONFIG.name}`,
  description: "요청한 페이지가 없거나 주소가 변경되었습니다.",
};

export default function GlobalNotFound() {
  return (
    <html lang="ko" className={ibmPlexMono.variable} suppressHydrationWarning>
      <head>
        <ThemeInitializer />
      </head>
      <body>
        <div className="flex min-h-screen flex-col">
          <SiteHeader locale="ko" />
          <main className="flex flex-1 items-center py-16 md:py-24">
            <Container>
              <section className="border-border relative overflow-hidden border-y">
                <div
                  className="blueprint-grid pointer-events-none absolute inset-0 opacity-60"
                  aria-hidden="true"
                />

                <div className="relative grid min-h-[520px] items-stretch lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.72fr)]">
                  <div className="flex flex-col justify-center px-1 py-14 sm:px-8 sm:py-20 lg:px-12">
                    <p className="motion-section-marker text-accent font-mono text-xs tracking-[0.16em] uppercase">
                      Error / 404
                    </p>
                    <h1 className="mt-6 max-w-2xl text-4xl leading-[1.12] font-semibold tracking-[-0.045em] text-balance sm:text-5xl md:text-6xl">
                      이 좌표에는
                      <br />
                      <span className="font-display text-accent font-medium">기록</span>이 없습니다.
                    </h1>
                    <p className="text-muted mt-7 max-w-lg text-base leading-7 sm:text-lg sm:leading-8">
                      요청한 페이지가 없거나 주소가 변경되었습니다. 홈으로 돌아가거나 전체 기록에서
                      원하는 글을 찾아보세요.
                    </p>

                    <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                      <Link
                        href="/"
                        className="bg-accent text-on-accent hover:bg-accent-hover inline-flex min-h-11 items-center justify-center gap-2 px-5 text-sm font-bold transition-colors motion-reduce:transition-none"
                      >
                        <ArrowLeft aria-hidden="true" size={16} strokeWidth={1.8} />
                        홈으로 돌아가기
                      </Link>
                      <Link
                        href="/articles/"
                        className="border-border text-foreground hover:border-accent hover:text-accent inline-flex min-h-11 items-center justify-center gap-2 border px-5 text-sm font-bold transition-colors motion-reduce:transition-none"
                      >
                        Articles 보기
                        <ArrowRight aria-hidden="true" size={16} strokeWidth={1.8} />
                      </Link>
                    </div>
                  </div>

                  <div
                    className="border-border relative hidden overflow-hidden border-l lg:block"
                    aria-hidden="true"
                  >
                    <div className="absolute inset-8">
                      <span className="border-border absolute top-0 left-0 size-4 border-t border-l" />
                      <span className="border-border absolute top-0 right-0 size-4 border-t border-r" />
                      <span className="border-border absolute right-0 bottom-0 size-4 border-r border-b" />
                      <span className="border-border absolute bottom-0 left-0 size-4 border-b border-l" />
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-subtle font-mono text-9xl font-semibold tracking-[-0.08em] opacity-20">
                        404
                      </span>
                    </div>

                    <div className="absolute top-1/2 left-1/2 size-20 -translate-x-1/2 -translate-y-1/2">
                      <span className="bg-accent absolute top-1/2 left-0 h-px w-full -translate-y-1/2 opacity-70" />
                      <span className="bg-accent absolute top-0 left-1/2 h-full w-px -translate-x-1/2 opacity-70" />
                      <BrandMark className="text-accent absolute top-1/2 left-1/2 size-6 -translate-x-1/2 -translate-y-1/2" />
                    </div>

                    <div className="text-subtle absolute right-8 bottom-8 left-8 flex justify-between font-mono text-xs tracking-[0.12em] uppercase">
                      <span>Field / Empty</span>
                      <span>Index / 404</span>
                    </div>
                  </div>
                </div>
              </section>
            </Container>
          </main>
          <SiteFooter locale="ko" />
        </div>
        <ServiceWorkerCleanup />
      </body>
    </html>
  );
}
