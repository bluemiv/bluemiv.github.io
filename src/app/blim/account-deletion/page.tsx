import Link from 'next/link';
import { DEVELOPER } from '@/features/privacy';

export default function Page() {
  return (
    <main>
      <div className="mx-auto max-w-[1280px] w-full flex flex-col gap-md leading-8 p-md">
        <h1 className="font-semibold text-2xl mb-md">Blim 계정 삭제 안내</h1>

        <section>
          <h2 className="font-semibold text-xl mb-sm">1. 앱 내에서 삭제하기</h2>
          <p>Blim 앱에 로그인한 상태에서 아래 경로를 따라 직접 계정을 삭제할 수 있습니다.</p>
          <ol className="list-decimal ml-xl mt-sm">
            <li>앱 실행 후 로비 화면에서 좌측 상단 설정(톱니바퀴) 버튼 탭</li>
            <li>&quot;회원 탈퇴&quot; 항목 탭</li>
            <li>안내 내용 확인 후 &quot;탈퇴하기&quot; 버튼 탭</li>
          </ol>
        </section>

        <section>
          <h2 className="font-semibold text-xl mb-sm">2. 이메일로 삭제 요청하기</h2>
          <p>앱에 접근할 수 없는 경우, 아래 이메일로 계정 삭제를 요청할 수 있습니다.</p>
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
              <span className="font-semibold">본문: </span>가입 시 사용한 소셜 로그인 계정(Google
              또는 Apple 이메일)을 기재해 주세요.
            </p>
          </div>
          <p className="mt-sm">요청 접수 후 영업일 기준 3일 이내에 처리됩니다.</p>
        </section>

        <section>
          <h2 className="font-semibold text-xl mb-sm">3. 삭제되는 데이터</h2>
          <p>계정 삭제 시 아래 데이터가 모두 삭제됩니다.</p>
          <ul className="list-disc ml-xl mt-sm">
            <li>계정 정보 (소셜 로그인 식별값, 닉네임, 생년, 성별)</li>
            <li>캐릭터와의 대화 내역 및 대화 요약(기억) 데이터</li>
            <li>호감도, 레벨 등 관계 데이터</li>
            <li>갤러리 해금 데이터</li>
            <li>베리(Berry) 잔액 및 구매 내역</li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold text-xl mb-sm">4. 데이터 보관 기간</h2>
          <ul className="list-disc ml-xl">
            <li>
              계정 삭제 요청 후 <strong>30일간 마스킹 처리하여 보관</strong>한 뒤 완전히 파기됩니다.
            </li>
            <li>30일 이내에 재로그인하면 계정이 복구될 수 있습니다.</li>
            <li>결제 기록은 전자상거래법에 따라 5년간 별도 보관 후 파기됩니다.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold text-xl mb-sm">5. 문의</h2>
          <p>
            기타 문의사항은{' '}
            <Link
              className="text-app-primary dark:text-app-dark-primary underline"
              href={`mailto:${DEVELOPER.EMAIL}`}
            >
              {DEVELOPER.EMAIL}
            </Link>
            으로 연락해 주세요.
          </p>
        </section>
      </div>
    </main>
  );
}
