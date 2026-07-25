import { Mail, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { DEVELOPER } from '@/features/privacy';
import { ROUTE_PATH } from '@/shared/constants/route';
import { KPOP_TUBE_APP } from '../constants';

export const KpopTubeAccountDeletionPage = () => (
  <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
    <main className="mx-auto w-full max-w-[860px] px-md py-xl md:py-2xl">
      <header className="border-b border-slate-200 pb-xl dark:border-slate-800">
        <div className="flex items-center gap-sm text-red-700 dark:text-red-300">
          <Trash2 size={22} />
          <span className="font-semibold">{KPOP_TUBE_APP.name}</span>
        </div>
        <h1 className="mt-md text-4xl font-bold leading-tight md:text-5xl">
          Account and data deletion
        </h1>
        <p className="mt-md text-base leading-8 text-slate-600 dark:text-slate-300">
          계정 및 데이터 삭제 안내
        </p>
      </header>

      <section className="py-lg">
        <h2 className="text-xl font-bold">Delete in the app / 앱에서 삭제</h2>
        <ol className="ml-lg mt-md list-decimal space-y-sm pl-md text-sm leading-7 text-slate-600 dark:text-slate-300">
          <li>Open Profile / 프로필 탭을 엽니다.</li>
          <li>Tap Edit profile / 프로필 편집을 누릅니다.</li>
          <li>Tap Delete account and confirm / 계정 삭제를 누르고 확인합니다.</li>
        </ol>
        <p className="mt-md text-sm leading-7 text-slate-600 dark:text-slate-300">
          Deletion is immediate and cannot be undone. 삭제는 즉시 처리되며 복구할 수 없습니다.
        </p>
      </section>

      <section className="border-t border-slate-200 py-lg dark:border-slate-800">
        <h2 className="text-xl font-bold">Request by email / 이메일 요청</h2>
        <p className="mt-md text-sm leading-7 text-slate-600 dark:text-slate-300">
          If the app is unavailable, email the deletion request ID shown under Profile → App info.
          앱을 사용할 수 없다면 프로필 → 앱 정보에 표시되는 삭제 요청 ID를 이메일로 보내 주세요.
        </p>
        <div className="mt-md rounded-lg border border-slate-200 bg-white p-md text-sm leading-7 dark:border-slate-800 dark:bg-slate-900">
          <p className="flex items-center gap-xs font-semibold">
            <Mail size={16} />
            <Link
              href={`mailto:${DEVELOPER.EMAIL}?subject=${encodeURIComponent('[KPOP Tube] Account deletion request')}`}
              className="text-blue-700 underline underline-offset-4 dark:text-blue-300"
            >
              {DEVELOPER.EMAIL}
            </Link>
          </p>
          <p className="mt-sm">Subject: [KPOP Tube] Account deletion request</p>
          <p>Include: app name and deletion request ID / 앱 이름과 삭제 요청 ID</p>
        </div>
        <p className="mt-md text-sm leading-7 text-slate-600 dark:text-slate-300">
          Verified requests are processed within 7 days. 확인 가능한 요청은 7일 이내 처리합니다.
        </p>
      </section>

      <section className="border-t border-slate-200 py-lg dark:border-slate-800">
        <h2 className="text-xl font-bold">Data deleted / 삭제되는 데이터</h2>
        <ul className="ml-md mt-md list-disc space-y-sm pl-md text-sm leading-7 text-slate-600 dark:text-slate-300">
          <li>Pseudonymous profile and public profile fields / 익명 프로필 및 공개 프로필 정보</li>
          <li>Posts, comments, likes, and attachment references / 글, 댓글, 좋아요, 첨부 참조</li>
          <li>Gem balance and ad reward records / 젬 잔액 및 광고 보상 기록</li>
        </ul>
        <p className="mt-md text-sm leading-7 text-slate-600 dark:text-slate-300">
          On-device favorites are separate from the server account. Clear app data or uninstall the
          app to remove them. 기기 내 즐겨찾기는 서버 계정과 별도이며 앱 데이터 삭제 또는 앱 제거로
          삭제됩니다.
        </p>
      </section>

      <footer className="border-t border-slate-200 pt-lg text-sm dark:border-slate-800">
        <Link
          href={ROUTE_PATH.APPS_KPOP_TUBE_PRIVACY_EN}
          className="font-semibold text-blue-700 underline underline-offset-4 dark:text-blue-300"
        >
          Privacy Policy
        </Link>
      </footer>
    </main>
  </div>
);
