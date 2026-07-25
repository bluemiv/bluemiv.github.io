import type { ReactNode } from 'react';
import dayjs from 'dayjs';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { DEVELOPER } from '@/features/privacy';
import { ROUTE_PATH } from '@/shared/constants/route';
import { KPOP_TUBE_APP } from '../constants';

type KpopTubePrivacyPageProps = {
  language: 'ko' | 'en';
};

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

const PolicyLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <Link
    href={href}
    className="inline-flex items-center gap-[3px] font-semibold text-blue-700 underline underline-offset-4 dark:text-blue-300"
    {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
  >
    {children}
    {href.startsWith('http') && <ExternalLink size={12} strokeWidth={2.3} />}
  </Link>
);

export const KpopTubePrivacyPage = ({ language }: KpopTubePrivacyPageProps) => {
  const korean = language === 'ko';
  const effectiveDate = dayjs(KPOP_TUBE_APP.privacyStartDate).format('YYYY-MM-DD');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
      <main className="mx-auto w-full max-w-[960px] px-md py-xl md:py-2xl">
        <section className="flex flex-col gap-lg border-b border-slate-200 pb-xl dark:border-slate-800 md:flex-row md:items-start md:justify-between">
          <div className="flex max-w-[720px] flex-col gap-md">
            <div className="flex items-center gap-sm text-blue-700 dark:text-blue-300">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950">
                <ShieldCheck size={20} strokeWidth={2.3} />
              </span>
              <span className="text-sm font-semibold">{KPOP_TUBE_APP.name}</span>
            </div>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              {korean ? '개인정보 처리방침' : 'Privacy Policy'}
            </h1>
            <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
              {korean
                ? '아티스트별 Stan 앱을 포함한 KPOP Tube 앱 제품군이 처리하는 데이터와 이용자 권리를 설명합니다.'
                : 'This policy explains the data handled by the KPOP Tube family of artist-specific Stan apps and your rights.'}
            </p>
          </div>
          <div className="flex flex-col items-start gap-sm text-sm text-slate-600 dark:text-slate-300">
            <span>
              {korean ? '시행일' : 'Effective date'}: <strong>{effectiveDate}</strong>
            </span>
            <Link
              href={
                korean ? ROUTE_PATH.APPS_KPOP_TUBE_PRIVACY_EN : ROUTE_PATH.APPS_KPOP_TUBE_PRIVACY
              }
              className="font-semibold text-blue-700 underline underline-offset-4 dark:text-blue-300"
            >
              {korean ? 'English' : '한국어'}
            </Link>
          </div>
        </section>

        <div className="py-lg">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-md text-sm leading-7 text-blue-950 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-100">
            {korean
              ? '회원가입은 필요하지 않습니다. 앱은 임의의 기기 UUID로 익명 프로필을 만들며, 이름·전화번호·이메일을 가입 정보로 요구하지 않습니다.'
              : 'No sign-up is required. The app creates a pseudonymous profile using a random device UUID and does not require your name, phone number, or email address.'}
          </div>
        </div>

        <Section title={korean ? '1. 처리하는 데이터' : '1. Data we process'}>
          <List>
            <li>
              {korean
                ? '익명 프로필: 임의 기기 UUID, 선택한 공개 아이디, 닉네임, 아바타, 앱 그룹, 시스템 언어, 젬 잔액, 계정 상태, 생성·수정 시각'
                : 'Pseudonymous profile: random device UUID, optional public ID, nickname, avatar, app group, system language, gem balance, account status, and creation/update timestamps'}
            </li>
            <li>
              {korean
                ? '커뮤니티 활동: 글과 댓글 본문, 공개 사진·YouTube 영상 참조, 좋아요, 신고 사유, 익명 작성자 식별값, 작성·신고 시각'
                : 'Community activity: post and comment text, references to public photos or YouTube videos, likes, report reasons, a pseudonymous public author identifier, and posting/report timestamps'}
            </li>
            <li>
              {korean
                ? '광고 보상 기록: 중복 지급 방지를 위한 AdMob 거래 ID, 익명 사용자 ID, 지급량, 지급 시각'
                : 'Ad reward records: AdMob transaction ID, pseudonymous user ID, reward amount, and timestamp used to prevent duplicate rewards'}
            </li>
            <li>
              {korean
                ? '기기 내 정보: 사진·영상 즐겨찾기, 언어 설정, 사용자/API 캐시와 보안 세션. 이 정보는 계정 서버 데이터와 별도로 기기에 저장됩니다.'
                : 'On-device data: photo/video favorites, language settings, user/API caches, and a security session. This is stored on your device separately from server account data.'}
            </li>
            <li>
              {korean
                ? '서비스 운영 정보: Cloudflare가 보안, 전송, 속도 제한 및 장애 분석을 위해 IP 주소와 요청 메타데이터를 일시 처리할 수 있습니다.'
                : 'Service operations: Cloudflare may temporarily process IP addresses and request metadata for security, delivery, rate limiting, and diagnostics.'}
            </li>
          </List>
          <p>
            {korean
              ? '앱은 연락처, 정밀 위치, 기기 사진·동영상 원본, 결제 카드 정보를 자체 서버로 수집하지 않습니다.'
              : 'The app does not collect contacts, precise location, original device photos/videos, or payment card details on its own servers.'}
          </p>
        </Section>

        <Section title={korean ? '2. 처리 목적' : '2. Why we process data'}>
          <List>
            <li>
              {korean
                ? '영상·플레이리스트·갤러리·커뮤니티 제공 및 사용자 설정 유지'
                : 'Provide videos, playlists, galleries, community features, and user settings'}
            </li>
            <li>
              {korean
                ? '글·댓글·좋아요 처리, 젬 및 광고 보상 중복 방지'
                : 'Process posts, comments, likes, gems, and prevent duplicate ad rewards'}
            </li>
            <li>
              {korean
                ? '비정상 요청, 자동화, 위변조 앱 및 서비스 남용 방지'
                : 'Prevent automated abuse, tampered apps, fraudulent requests, and service disruption'}
            </li>
            <li>
              {korean ? '광고 제공과 성과 측정' : 'Provide advertising and measure ad performance'}
            </li>
          </List>
        </Section>

        <Section
          title={
            korean ? '3. 제3자 서비스와 국외 처리' : '3. Third parties and international processing'
          }
        >
          <List>
            <li>
              <strong>Cloudflare:</strong>{' '}
              {korean
                ? 'Workers, D1, R2, 캐시, 속도 제한 및 보안 서비스를 사용합니다. 데이터는 Cloudflare의 글로벌 인프라에서 처리될 수 있습니다.'
                : 'We use Workers, D1, R2, caching, rate limiting, and security services. Data may be processed on Cloudflare’s global infrastructure.'}{' '}
              <PolicyLink href="https://www.cloudflare.com/privacypolicy/">
                Cloudflare Privacy Policy
              </PolicyLink>
            </li>
            <li>
              <strong>Google AdMob:</strong>{' '}
              {korean
                ? '광고 제공 과정에서 IP 주소, 광고·앱 상호작용, 진단 정보, 광고 ID 또는 앱 세트 ID 같은 기기 식별자를 자동 처리할 수 있습니다.'
                : 'For advertising, the SDK may automatically process IP address, ad/app interactions, diagnostics, and device identifiers such as advertising ID or app set ID.'}{' '}
              <PolicyLink href="https://policies.google.com/privacy">
                Google Privacy Policy
              </PolicyLink>
            </li>
            <li>
              <strong>Google Play Integrity:</strong>{' '}
              {korean
                ? '앱 진위, 라이선스, 기기 무결성 및 최근 요청 활동을 확인해 남용을 방지합니다.'
                : 'We verify app recognition, licensing, device integrity, and recent request activity to reduce abuse.'}
            </li>
            <li>
              <strong>YouTube API Services:</strong>{' '}
              {korean
                ? '이 앱은 YouTube Data API와 임베디드 YouTube 플레이어를 사용합니다. 공개 영상·채널·플레이리스트 메타데이터를 표시하며, Google/YouTube가 IP 주소, 기기 정보, 쿠키 또는 서비스 이용 정보를 자체 정책에 따라 처리할 수 있습니다.'
                : 'This app uses the YouTube Data API and embedded YouTube player to display public video, channel, and playlist metadata. Google/YouTube may process IP address, device data, cookies, or service interactions under its own policies.'}{' '}
              <PolicyLink href="https://www.youtube.com/t/terms">YouTube Terms</PolicyLink>{' '}
              <PolicyLink href="https://policies.google.com/privacy">
                Google Privacy Policy
              </PolicyLink>
            </li>
          </List>
          <p>
            {korean
              ? '개발자는 개인정보를 판매하지 않습니다.'
              : 'The developer does not sell personal data.'}
          </p>
        </Section>

        <Section title={korean ? '4. 보유기간과 삭제' : '4. Retention and deletion'}>
          <List>
            <li>
              {korean
                ? '서버 프로필과 커뮤니티 데이터는 사용자가 계정을 삭제하거나 운영상 삭제할 때까지 보관합니다.'
                : 'Server profile and community data are retained until the user deletes the account or the data is removed for operational reasons.'}
            </li>
            <li>
              {korean
                ? '앱 내 계정 삭제 시 D1 프로필, 본인 글·댓글, 좋아요와 첨부 참조를 삭제합니다. 다른 사용자의 답글이 있는 원글은 작성자·본문·첨부를 제거한 익명 자리표시자로 남을 수 있습니다.'
                : 'In-app account deletion removes the D1 profile, your posts/comments, likes, and attachment references. A root post with replies from other users may remain as an anonymous placeholder with its author, body, and attachments removed.'}
            </li>
            <li>
              {korean
                ? '광고 보상 transaction ID는 계정 연결을 제거한 뒤 중복 지급과 서명 재사용을 막는 보안 기록으로만 유지합니다.'
                : 'Ad reward transaction IDs are de-linked from the account and retained only as a security ledger to prevent duplicate rewards and signed callback replay.'}
            </li>
            <li>
              {korean
                ? '삭제 전 생성된 공개 응답은 엣지 또는 기기 캐시에 최대 30일 남을 수 있으며, 제공업체 백업은 해당 업체의 제한된 백업 보존기간 후 제거됩니다.'
                : 'Previously generated public responses may remain in edge or device caches for up to 30 days. Provider backups are removed after the provider’s limited backup retention period.'}
            </li>
            <li>
              {korean
                ? '기기 내 즐겨찾기는 서버 계정과 연결되지 않으며 앱 데이터 삭제 또는 앱 제거 시 삭제됩니다.'
                : 'On-device favorites are not linked to the server account and are removed when app data is cleared or the app is uninstalled.'}
            </li>
          </List>
          <p>
            {korean ? '삭제 방법: ' : 'Deletion instructions: '}
            <PolicyLink href={ROUTE_PATH.APPS_KPOP_TUBE_ACCOUNT_DELETION}>
              {korean ? '계정 및 데이터 삭제 안내' : 'Account and data deletion guide'}
            </PolicyLink>
          </p>
        </Section>

        <Section title={korean ? '5. 이용자의 권리' : '5. Your rights'}>
          <p>
            {korean
              ? '앱에서 프로필을 수정하고 계정과 연결 데이터를 즉시 삭제할 수 있습니다. 앱에 접근할 수 없는 경우 삭제 안내 페이지의 이메일 절차로 열람·정정·삭제를 요청할 수 있습니다.'
              : 'You can edit your profile and immediately delete the account and linked data in the app. If you cannot access the app, use the email process on the deletion guide to request access, correction, or deletion.'}
          </p>
          <p>
            {korean
              ? '관련 지역에서 광고 동의가 필요한 경우 앱은 Google의 동의 메시지를 먼저 표시하며, 앱 정보의 광고 개인정보 설정에서 선택을 다시 확인하거나 변경할 수 있습니다. 동의하지 않으면 맞춤형 광고가 제한되거나 광고가 제공되지 않을 수 있습니다.'
              : 'Where ad consent is required, the app presents Google’s consent message before requesting ads. You can review or change eligible choices from Ad privacy options in App info. Declining may limit personalized ads or prevent ad delivery.'}
          </p>
        </Section>

        <Section title={korean ? '6. 보안' : '6. Security'}>
          <p>
            {korean
              ? 'HTTPS 전송, 접근 제한, 입력 검증, 요청 속도 제한, Play Integrity 검증, 최소한의 운영자 접근을 적용합니다. 어떤 방식도 절대적인 보안을 보장할 수는 없습니다.'
              : 'We use HTTPS, access controls, input validation, request rate limits, Play Integrity checks, and restricted operator access. No method can guarantee absolute security.'}
          </p>
        </Section>

        <Section title={korean ? '7. 아동의 개인정보' : '7. Children'}>
          <p>
            {korean
              ? '이 서비스는 관련 법령상 보호자 동의가 필요한 연령의 아동을 대상으로 설계되지 않았습니다. 보호자 동의 없이 아동 데이터가 제공되었다고 판단되면 아래 연락처로 삭제를 요청해 주세요.'
              : 'The service is not designed for children below the age at which parental consent is required by applicable law. Contact us to request deletion if you believe a child provided data without required consent.'}
          </p>
        </Section>

        <Section title={korean ? '8. 문의 및 방침 변경' : '8. Contact and policy changes'}>
          <p>
            {korean ? '개인정보 보호 담당자: ' : 'Privacy contact: '}
            {DEVELOPER.COMPANY_NAME} /{' '}
            <PolicyLink href={`mailto:${DEVELOPER.EMAIL}`}>{DEVELOPER.EMAIL}</PolicyLink>
          </p>
          <p>
            {korean
              ? '처리 방식이 변경되면 이 페이지의 시행일을 갱신하며, 중요한 변경은 앱 또는 이 페이지에서 알립니다.'
              : 'If processing changes, we will update the effective date on this page and provide notice in the app or on this page for material changes.'}
          </p>
        </Section>
      </main>
    </div>
  );
};
