import type { ReactNode } from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { DEVELOPER } from '@/features/privacy';
import { ROUTE_PATH } from '@/shared/constants/route';
import { KPOP_TUBE_APP } from '../constants';

type Props = { language: 'ko' | 'en' };

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="border-t border-slate-200 py-lg dark:border-slate-800">
    <h2 className="text-xl font-bold tracking-normal text-slate-950 dark:text-white">{title}</h2>
    <div className="mt-md space-y-md text-sm leading-7 text-slate-600 dark:text-slate-300">
      {children}
    </div>
  </section>
);

const List = ({ children }: { children: ReactNode }) => (
  <ul className="ml-md list-outside list-disc space-y-sm pl-md">{children}</ul>
);

const External = ({ href, children }: { href: string; children: ReactNode }) => (
  <Link
    href={href}
    target="_blank"
    rel="noreferrer"
    className="inline-flex items-center gap-[3px] font-semibold text-blue-700 underline underline-offset-4 dark:text-blue-300"
  >
    {children}
    <ExternalLink size={12} strokeWidth={2.3} />
  </Link>
);

export const KpopTubeTermsPage = ({ language }: Props) => {
  const ko = language === 'ko';
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
      <main className="mx-auto w-full max-w-[960px] px-md py-xl md:py-2xl">
        <header className="flex flex-col gap-lg border-b border-slate-200 pb-xl dark:border-slate-800 md:flex-row md:justify-between">
          <div className="flex max-w-[720px] flex-col gap-md">
            <div className="flex items-center gap-sm text-blue-700 dark:text-blue-300">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950">
                <ShieldCheck size={20} strokeWidth={2.3} />
              </span>
              <span className="text-sm font-semibold">{KPOP_TUBE_APP.name}</span>
            </div>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              {ko ? '커뮤니티 이용약관' : 'Community Terms'}
            </h1>
            <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
              {ko
                ? '안전한 공개 커뮤니티를 위한 게시 규칙과 운영 조치를 설명합니다.'
                : 'These terms explain posting rules and moderation for a safe public community.'}
            </p>
          </div>
          <Link
            href={ko ? ROUTE_PATH.APPS_KPOP_TUBE_TERMS_EN : ROUTE_PATH.APPS_KPOP_TUBE_TERMS}
            className="font-semibold text-blue-700 underline underline-offset-4 dark:text-blue-300"
          >
            {ko ? 'English' : '한국어'}
          </Link>
        </header>

        <Section title={ko ? '1. 동의' : '1. Acceptance'}>
          <p>
            {ko
              ? '글이나 댓글을 작성하면 본 약관과 개인정보 처리방침에 동의한 것입니다.'
              : 'Before creating a post or reply, you must accept these terms and the Privacy Policy.'}
          </p>
          <p>
            {ko ? 'YouTube 기능을 사용하면 ' : 'Use of YouTube features is also governed by the '}
            <External href="https://www.youtube.com/t/terms">YouTube Terms of Service</External>
            {ko ? '의 적용도 받습니다.' : '.'}
          </p>
        </Section>

        <Section title={ko ? '2. 금지 콘텐츠와 행동' : '2. Prohibited content and conduct'}>
          <List>
            <li>
              {ko
                ? '성적·착취적 콘텐츠, 아동 안전을 해치는 콘텐츠'
                : 'Sexual, exploitative, or child-endangering content'}
            </li>
            <li>
              {ko
                ? '혐오, 위협, 괴롭힘, 따돌림, 특정인 공격'
                : 'Hate, threats, harassment, bullying, or targeted abuse'}
            </li>
            <li>
              {ko
                ? '폭력 조장, 불법행위, 개인정보 노출, 권리 침해'
                : 'Promotion of violence or illegal acts, privacy violations, or rights infringement'}
            </li>
            <li>
              {ko
                ? '스팸, 사칭, 기만, 반복 도배, 서비스 조작'
                : 'Spam, impersonation, deception, flooding, or service manipulation'}
            </li>
          </List>
        </Section>

        <Section title={ko ? '3. 신고·차단·운영 조치' : '3. Reporting, blocking, and enforcement'}>
          <List>
            <li>
              {ko
                ? '각 글 메뉴에서 콘텐츠 또는 사용자를 신고하고 사용자를 차단할 수 있습니다.'
                : 'Use the menu on each post to report content or a user and to block that user.'}
            </li>
            <li>
              {ko
                ? '차단한 사용자의 글과 댓글은 해당 기기에서 숨겨집니다.'
                : 'Posts and replies from blocked users are hidden on that device.'}
            </li>
            <li>
              {ko
                ? '신고는 운영자가 검토하며 콘텐츠 숨김·삭제 또는 계정 정지 조치를 할 수 있습니다.'
                : 'Reports are reviewed and may result in hiding or removal of content or account suspension.'}
            </li>
            <li>
              {ko
                ? '명백한 불법 콘텐츠나 아동 안전 문제는 관련 기관에 신고할 수 있습니다.'
                : 'Illegal or child-safety content may be reported to relevant authorities.'}
            </li>
          </List>
        </Section>

        <Section title={ko ? '4. 문의' : '4. Contact'}>
          <p>
            {ko ? '신고 처리 또는 약관 문의: ' : 'Questions about reports or these terms: '}
            <External href={`mailto:${DEVELOPER.EMAIL}`}>{DEVELOPER.EMAIL}</External>
          </p>
          <p>
            <Link
              href={ko ? ROUTE_PATH.APPS_KPOP_TUBE_PRIVACY : ROUTE_PATH.APPS_KPOP_TUBE_PRIVACY_EN}
              className="font-semibold text-blue-700 underline underline-offset-4 dark:text-blue-300"
            >
              {ko ? '개인정보 처리방침' : 'Privacy Policy'}
            </Link>
          </p>
        </Section>
      </main>
    </div>
  );
};
