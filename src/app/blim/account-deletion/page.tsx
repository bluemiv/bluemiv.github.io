import Link from 'next/link';
import { DEVELOPER } from '@/features/privacy';

export default function Page() {
  return (
    <main>
      <div className="mx-auto max-w-[1280px] w-full flex flex-col gap-md leading-8 p-md">
        <h1 className="font-semibold text-2xl mb-md">Blim 계정 삭제 안내</h1>

        <section>
          <h2 className="font-semibold text-xl mb-sm">1. 앱에서 직접 삭제하기</h2>
          <p>Blim 앱에 로그인한 상태에서 아래 경로로 회원 탈퇴를 진행할 수 있습니다.</p>
          <ol className="list-decimal ml-xl mt-sm">
            <li>앱 하단 탭에서 &quot;Profile&quot; 선택</li>
            <li>&quot;개인정보 및 보안&quot; 메뉴 선택</li>
            <li>&quot;회원 탈퇴&quot; 선택</li>
            <li>안내 내용을 확인하고 &quot;탈퇴하기&quot;를 눌러 완료</li>
          </ol>
        </section>

        <section>
          <h2 className="font-semibold text-xl mb-sm">2. 이메일로 삭제 요청하기</h2>
          <p>앱에 접근할 수 없거나 로그인할 수 없는 경우, 아래 이메일로 삭제를 요청해 주세요.</p>
          <div className="mt-sm p-md rounded bg-app-sub-bg dark:bg-app-dark-sub-bg">
            <p>
              <span className="font-semibold">이메일: </span>
              <Link
                className="text-app-primary dark:text-app-dark-primary underline"
                href={`mailto:${DEVELOPER.EMAIL}`}
              >
                {DEVELOPER.EMAIL}
              </Link>
            </p>
            <p className="mt-xs">
              <span className="font-semibold">제목: </span>[Blim] 계정 삭제 요청
            </p>
            <p className="mt-xs">
              <span className="font-semibold">본문 필수 정보: </span>가입 방식(Google/게스트),
              계정 식별 정보(이메일 또는 사용자 ID)
            </p>
          </div>
          <p className="mt-sm">요청 접수 후 영업일 기준 3일 이내 처리합니다.</p>
        </section>

        <section>
          <h2 className="font-semibold text-xl mb-sm">3. 삭제 대상 데이터</h2>
          <p>계정 삭제가 완료되면 아래 데이터가 삭제됩니다.</p>
          <ul className="list-disc ml-xl mt-sm">
            <li>계정 정보(로그인 식별값, 이메일, 프로필 표시 정보)</li>
            <li>채팅 메시지, 대화 요약 및 채팅 세션 정보</li>
            <li>캐릭터 진행 데이터(좋아요, 카드 해금 등)</li>
            <li>보석 잔액, 지갑/구매/구독 관련 서비스 데이터</li>
            <li>문의/건의 및 신고 내역</li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold text-xl mb-sm">4. 보관 및 파기</h2>
          <ul className="list-disc ml-xl">
            <li>탈퇴 요청 시 계정은 즉시 비활성화되며, 최대 30일간 복구 가능 상태로 보관될 수 있습니다.</li>
            <li>30일 이내 재로그인 시 계정이 복구될 수 있습니다.</li>
            <li>30일 경과 후에는 계정 및 서비스 데이터가 삭제됩니다.</li>
            <li>결제 기록 등 일부 데이터는 관련 법령에 따라 별도 보관 후 파기될 수 있습니다.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold text-xl mb-sm">5. 문의</h2>
          <p>
            계정 삭제 관련 문의는{' '}
            <Link
              className="text-app-primary dark:text-app-dark-primary underline"
              href={`mailto:${DEVELOPER.EMAIL}`}
            >
              {DEVELOPER.EMAIL}
            </Link>
            로 보내 주세요.
          </p>
        </section>
      </div>
    </main>
  );
}
